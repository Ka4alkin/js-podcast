import './style.css'
import {createModal, isValid} from "./functions";
import {Questions} from "./questions";
import {authWithEmailAndPassword, getAuthForm} from "./auth";


const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')
const list = document.getElementById('list')
const modalBtn = document.getElementById('modal-btn')


form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    // input.value.length <= 10 ? submitBtn.disabled = true : submitBtn.disabled = false
    submitBtn.disabled = !isValid(input.value)
})

input.addEventListener('input', () => {
    console.log(isValid(input.value))
})

modalBtn.addEventListener('click', openModal)

window.addEventListener('load', Questions.renderList)

function submitFormHandler(e) {
    e.preventDefault()

    if (isValid(input.value)) {
        const question = {
            name: 'question',
            text: input.value.trim(),
            date: new Date().toJSON()
        }

        submitBtn.disabled = true


        //async request to server to save question
        Questions.create(question)
            .then(() => {
                input.value = ''
                input.className = ''
                submitBtn.disabled = false
            })
    }
}


function openModal() {
    console.log('21')
    createModal('Авторизация', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(e) {
    e.preventDefault()

    const btn = e.target.querySelector('button')
    const email = e.target.querySelector('#email').value
    const password = e.target.querySelector('#password').value

    console.log(email)
    console.log(password)

    btn.disabled = true

    authWithEmailAndPassword(email, password)
        .then(Questions.fetch)
        .then(renderModalAfterAuth)
        .then(()=>btn.disabled = false)
}

function renderModalAfterAuth(content){
   if (typeof content === 'string'){
        createModal('Ошибка', content)
   } else {
       createModal('Список вопросов', Questions.listToHTML(content))
   }
}