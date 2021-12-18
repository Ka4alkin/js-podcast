export function isValid(value) {
    return value.length >= 10
}


export function addToLocalStorage(question) {
    const allQuestions = getQuestionsFromLocalStorage(question.name)
    // console.log(allQuestions)
    allQuestions.push(question)
    localStorage.setItem(question.name, JSON.stringify(allQuestions))
}

export function getQuestionsFromLocalStorage(getItemName) {
    return JSON.parse(localStorage.getItem('question')) || []
}

export function createModal(title,content){
    const modal = document.createElement('div')
    modal.className = 'modal'

    modal.innerHTML  = `
        <h1>${title}</h1>
        <div>${content}</div>
    `


    mui.overlay('on',modal)
}

