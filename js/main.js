const cardTemplateEl = document.getElementById('templateCard')
const containerEl = document.getElementById('container')
const loadingEl = document.getElementById('loading')
const skelatonEl = document.getElementById('skeletons')
const formEl = document.getElementById('form')
const editBtnEl = document.getElementById('editBtn')
const addBtnEl = document.getElementById('addBtn')
const prevEl = document.getElementById('prev')
const nextEl = document.getElementById('next')


const limit = 3
let skip  = 0

let editedId = null
function init() {
	loadingEl.style.display = 'block'
	fetch(`https://json-api.uz/api/project/fn43/cars?skip=${skip}&limit=${limit}`)
		.then(res => {
			return res.json()
		})
		.then(res => {
			ui(res.data)
		})
		.finally(() => {
			loadingEl.style.display = 'none'
			skelatonEl.remove()
		})
}

function addEl(newEl) {
	fetch('https://json-api.uz/api/project/fn43/cars', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newEl),
	})
		.then(res => {
			alert("Ma'lumot muvaffaqqiyatli qo'shildi✅")
			init()
		})
		.finally(() => {})
}
function editEl(editedEl) {
	fetch(`https://json-api.uz/api/project/fn43/cars/${editedEl.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(editedEl),
	})
		.then(res => {
			alert("Ma'lumot muvaffaqqiyatli yangilandi✅")
			init()
		})
		.finally(() => {
			addBtnEl.classList.remove('hidden')
			editBtnEl.classList.add('hidden')
		})
}

function deleteEl(id) {
	fetch(`https://json-api.uz/api/project/fn43/cars/${id}`, {
		method: 'DELETE',
	})
		.then(res => {
			init()
		})
		.then(res => {})
		.finally(() => {})
}

function getById(id) {
	fetch(`https://json-api.uz/api/project/fn43/cars/${id}`)
		.then(res => {
			return res.json()
		})
		.then(res => {
			fill(res)

		})
		.finally(() => {})
}

function fill(obj) {
	formEl.name.value = obj.name
	formEl.description.value = obj.description
	formEl.price.value = obj.price
	formEl.category.value = obj.category
}

init()

function ui(cars) {
	containerEl.innerHTML = ''
	cars.forEach(element => {
		const clone = cardTemplateEl.cloneNode(true).content
		const titleEl = clone.querySelector('h2')
		const descripyionEl = clone.querySelector('p')
		const priceEl = clone.getElementById('price')
		const cotegoryEl = clone.querySelector('mark')
		const deleteBtnEl = clone.querySelector('.delete-btn')
		const editBtnEl = clone.querySelector('.edit-btn')

		titleEl.innerText = element.name
		descripyionEl.innerText = element.description
		cotegoryEl.innerText = element.category
		deleteBtnEl.id = element.id
		editBtnEl.id = element.id
		priceEl.innerText = `price: ${element.price}$`

		containerEl.append(clone)
	})
}

document.addEventListener('click', e => {
	if (e.target.classList.contains('delete-btn')) {
		deleteEl(e.target.id)
	}
	if (e.target.classList.contains('edit-btn')) {
		getById(e.target.id)
		editedId = e.target.id
		addBtnEl.classList.add('hidden')
		editBtnEl.classList.remove('hidden')
	} 
})

formEl.addEventListener('submit', e => {
	e.preventDefault()
	const formData = new FormData(formEl)
	const result = {}
	formData.forEach((value, key) => {
		result[key] = value
	})
	if(e.submitter.id =='addB') {

		addEl(result)
	}
	if(e.submitter.id =='editBtn') {
		if(editedId) {
			result.id = editedId
			editEl(result)
			editedId= null
		}
	}
	formEl.reset()
})


prevEl.addEventListener("click", () => {
	if(skip> 0) {
		skip = skip -limit
	}
	init()
})
nextEl.addEventListener("click", () => {
	skip = skip +limit
	init()
})