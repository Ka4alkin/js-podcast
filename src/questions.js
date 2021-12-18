import {addToLocalStorage, getQuestionsFromLocalStorage} from "./functions";


export class Questions {

    static getFetchUrl() {
        return 'https://js-podcast-app-7b0b6-default-rtdb.firebaseio.com/' + 'questions.json'
    }

    static create(question) {
        const url = Questions.getFetchUrl()
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            // .then(Questions.renderList)
            .then(Questions.renderList)

    }


    static renderList() {

        // const questionList = getQuestionsFromLocalStorage(question.name)
        const questionList = getQuestionsFromLocalStorage()

        console.log('ggg', questionList)

        const html = questionList.length
            ? questionList.map(toList).join('')
            : `<div class="mui--text-headline">Вопросов пока нет</div>`

        const list = document.getElementById('list')

        list.innerHTML = html

    }

    static fetch(token) {
        if (!token){
            return Promise.resolve('<p class="error">У вас нет токена<p/>')
        }
        const url = `https://js-podcast-app-7b0b6-default-rtdb.firebaseio.com/questions.json?auth=${token}`
        return fetch(url)
            .then(response => response.json())
            .then(response => {
                if ( response && response.error){
                    return `<p class="error">response.error<p/>`
                }
                return response ? Object.keys(response).map(key => ({
                    ...response[key],
                    id: key
                })) : []
            })
    }

    static listToHTML(questions){
        return questions.length
        ? `<ol>${questions.map(question => `<li>${question.text}</li>`).join('')}</ol>`
        :  `<p>Вопросов пока нет<p/>`
    }

}

function toList(question) {
    return `
            <div class="mui--text-headline"> 
                ${new Date(question.date).toLocaleDateString()}
                ${new Date(question.date).toLocaleTimeString()}
            </div> <br>
            <div>${question.text}</div>
        `
}

// Questions.fetch()
