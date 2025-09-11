const cardTemplateEl = document.getElementById('templateCard')
const containerEl = document.getElementById('container')
const loadingEl = document.getElementById('loading')
const skelatonEl = document.getElementById('skeletons')


function init() {
	loadingEl.style.display = "block"
	fetch('https://json-api.uz/api/project/fn43/cars').then((res) => {
		return res.json()
	}).then((res) => {
		ui(res.data)
	}).finally(() => {
		loadingEl.style.display = "none"
		skelatonEl.remove()
	})
}


function ui(cars) {
	containerEl.innerHTML = ''
	cars.forEach(element => {
		const clone = cardTemplateEl.cloneNode(true).content
		const titleEl = clone.querySelector('h2')
		const descripyionEl = clone.querySelector('p')
		const cotegoryEl = clone.querySelector('mark')
		const deleteBtnEl = clone.querySelector('button')


		titleEl.innerText = element.name
		descripyionEl.innerText = element.description
		cotegoryEl.innerText = element.category
		deleteBtnEl.id = element.id
	
		
		
		containerEl.append(clone)

	});
}
init()

document.addEventListener("click", (e) => {
	if(e.target.classList.contains('delete-btn')) {
		deleteEl(e.target.id)
		
	}
})

function deleteEl(id) {
	fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
		method :"DELETE"
	}).then((res) => {
		init()
		
	}).then((res) => {
	}).finally(() => {
	})
}
