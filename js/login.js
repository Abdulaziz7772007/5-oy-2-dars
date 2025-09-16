const formEl = document.getElementById('form'),
	messageBoxEl = document.getElementById('messageBox')


function login(obj) {
	fetch('https://json-api.uz/api/project/fn43/auth/login', {
		method: 'POST',
		headers: {
			"Content-Type" : "application/json"
		},
		body: JSON.stringify(obj)
	}).then((res)=> {
		return res.json()
	}).then((res)=> {
		localStorage.setItem("token", res.access_token);
		location.href = '/index.html'
		
	}).catch(()=>{
		console.log("Xatolik");
		
	}).finally(()=> {})
}

function validation(obj) {
	if(obj.username.trim() === '') {
		return {
			target: "ucername",
			message: "Iltimos loginni yozing!"
		}
	}
	if(obj.password.trim() === '') {
		return {
			target: "password",
			message: "Iltimos parolni yozing!"
		}
	}
	return false
}

formEl.addEventListener('submit', (e) => {
	e.preventDefault()
	const formData = new FormData(formEl)
	const result = {}

	
	formData.forEach((value, key) => {
		result[key] = value
	})
	const check = validation(result)

	if(check) {
		formEl[check.target].focus()
		const p = document.createElement('p')
		p.innerText = check.message
		messageBoxEl.append(p)

		setTimeout(()=> {
			p.remove()
		}, 2000)
	} else {
		login(result)
	}

})