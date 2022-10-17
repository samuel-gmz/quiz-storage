import { data } from './data.js'

let divQuestions = document.getElementById('div-questions')
let form = document.getElementById('form')
let respuestasPrevias = document.getElementById('respuestas-previas')
let btnVerRespuestas = document.getElementById('btn_prev-answers')
let pantallaInicio = document.getElementById('form')
let btnEmpezar = document.getElementById('btn_empezar')
let endScreen = document.getElementById('end-screen')
let btnVolver = document.getElementById('btn-volver')
let btnVolver2 = document.getElementById('btn-volver2')
const btnSubmit = document.getElementById('btn-submit')
let sessionUsers = [] 
let localPrevQuiz = [] 
let currentUser = ''
let arrayQuestions = []
let arrayAnswers = []
let input = ''
let incompleteQuiz = []
let userObj = {
    "user": currentUser,
    "questions": arrayQuestions,
    "answers": arrayAnswers
}

if(localStorage.getItem("Questions")){
    let compQuizOnLoad = JSON.parse(localStorage.getItem("Questions"))
    compQuizOnLoad.forEach(elem => {
        let h3 = document.createElement('h3')
        h3.textContent = 'Respuestas de ' + elem.user
        respuestasPrevias.append(h3)
        let newTable = document.createElement('table')
        newTable.setAttribute('border', '1') 
        let tbody = document.createElement('tbody')
        newTable.append(tbody)
        let tr = document.createElement('tr')
        let tr2 = document.createElement('tr')
        elem.questions.forEach(question => {
            let td = document.createElement('td')
            td.textContent = question
            tr.append(td)
            tbody.append(tr)
        })
        elem.answers.forEach(answer => {
            let td = document.createElement('td')
            td.textContent = answer
            tr2.append(td)
            tbody.append(tr2)
        })
        respuestasPrevias.append(newTable)
    })
}

const onSubmit = e => {
    e.preventDefault()
    input = document.querySelector('#userInput').value
    if(input) { 
        if(localStorage.getItem("incomplete-quiz")){            
            let checkIncompleteQuiz = JSON.parse(localStorage.getItem("incomplete-quiz")) 
            checkIncompleteQuiz.forEach(userForEach => { 
            if(userForEach.user == input) { 
                let usrRetoma = userForEach 
                if(sessionStorage.getItem("sessionUser")) { 
                    sessionUsers = JSON.parse(sessionStorage.getItem("sessionUser")) 
                    sessionUsers.push(input) 
                    sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
                    let date = new Date()
                    let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                    currentUser = input + " - " + dateString
                    btnSubmit.style.display = 'none'
                    btnEmpezar.style.display = 'block'
                    encuesta.indexCurrentQuestion = usrRetoma.questions.length -1 
                } else { 
                    sessionUsers.push(input) 
                    sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
                    let date = new Date()
                    let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                    currentUser = input + " - " + dateString
                    btnSubmit.style.display = 'none'
                    btnEmpezar.style.display = 'block'
                    encuesta.indexCurrentQuestion = usrRetoma.questions.length -1
                }
            } else { 
                if(sessionStorage.getItem("sessionUser")) { 
                    sessionUsers = JSON.parse(sessionStorage.getItem("sessionUser")) 
                    let exists = 0 
                    sessionUsers.forEach(user => {
                        if(user == input) {
                            exists = 1
                        } 
                    })
                    if(exists == 1){ 
                        return 
                    } else { 
                        sessionUsers.push(input) 
                        sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
                        let date = new Date()
                        let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                        currentUser = input + " - " + dateString
                        btnSubmit.style.display = 'none'
                        btnEmpezar.style.display = 'block'
                    }
                } else { 
                    sessionUsers.push(input) 
                    sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
                    let date = new Date()
                    let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                    currentUser = input + " - " + dateString
                    btnSubmit.style.display = 'none'
                    btnEmpezar.style.display = 'block'
                }}
            })
        } else {
        if(sessionStorage.getItem("sessionUser")) {
            sessionUsers = JSON.parse(sessionStorage.getItem("sessionUser")) 
            let exists = 0 
            sessionUsers.forEach(user => {
                if(user == input) {
                    exists = 1
                }
            })
            if(exists == 1){ 
                alert("Este nombre de usuario ya está registrado, ingrese un nuevo nombre")
            } else { 
                sessionUsers.push(input) 
                sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
                let date = new Date()
                let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
                currentUser = input + " - " + dateString
                btnSubmit.style.display = 'none'
                btnEmpezar.style.display = 'block'
            }
        } else { 
            sessionUsers.push(input) 
            sessionStorage.setItem("sessionUser", JSON.stringify(sessionUsers)) 
            let date = new Date()
            let dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
            currentUser = input + " - " + dateString
            btnSubmit.style.display = 'none'
            btnEmpezar.style.display = 'block'
        }}
    }
}

window.addEventListener('load', () => {
    form.addEventListener('submit', onSubmit)
})

function Encuesta() {
    
    this.preguntas = []
    this.indexCurrentQuestion = 0

    this.addQuestion = function(question) {
        this.preguntas.push(question)
    }
    
    this.showCurrentQuestion = function() {
        if (this.indexCurrentQuestion < this.preguntas.length) { 
            this.preguntas[this.indexCurrentQuestion].getElement()
        } else {
            divQuestions.style.display = 'none' 
            endScreen.style.display = 'block'   
        }
    }
}

function Pregunta(title, answers) {
    
    this.title = title
    this.answers = Object.values(answers)

    this.getElement = function() {
        
        let h3QuestionTitle = document.createElement('h3')
        h3QuestionTitle.textContent = this.title
        divQuestions.append(h3QuestionTitle)

        let ulAnswers = document.createElement('ul')
        ulAnswers.classList.add('ulAnswers')

        arrayQuestions.push(this.title)

        this.answers.forEach(answerElem => {
            let liAnswer = document.createElement('li')
            liAnswer.classList.add('liAnswer')
            liAnswer.textContent = answerElem
            liAnswer.addEventListener('click', this.loadQuestion)
            ulAnswers.append(liAnswer)
        }) 
            
        divQuestions.append(ulAnswers)
    }

    this.loadQuestion = (event) => {
        let answerSelected = event.target
        arrayAnswers.push(answerSelected.textContent)
        if(answerSelected.textContent == question1.answers[1]) {
            encuesta.indexCurrentQuestion = 6
        }
        if (answerSelected.textContent == question5.answers[1]){
            encuesta.indexCurrentQuestion = 6
        }
        if (answerSelected.textContent == question8.answers[1]){
            encuesta.indexCurrentQuestion = 9
        }
        if (answerSelected.textContent == question11.answers[0]){
            encuesta.indexCurrentQuestion = 11
        }
        divQuestions.textContent = ''
        encuesta.indexCurrentQuestion++
        encuesta.showCurrentQuestion()
    }
}

let question1 = new Pregunta(data[0].title, data[0].answers)
let question2 = new Pregunta(data[1].title, data[1].answers)
let question3 = new Pregunta(data[2].title, data[2].answers)
let question4 = new Pregunta(data[3].title, data[3].answers)
let question5 = new Pregunta(data[4].title, data[4].answers)
let question6 = new Pregunta(data[5].title, data[5].answers)
let question7 = new Pregunta(data[6].title, data[6].answers)
let question8 = new Pregunta(data[7].title, data[7].answers)
let question9 = new Pregunta(data[8].title, data[8].answers)
let question10 = new Pregunta(data[9].title, data[9].answers)
let question11 = new Pregunta(data[10].title, data[10].answers)
let question12 = new Pregunta(data[11].title, data[11].answers)
let question13 = new Pregunta(data[12].title, data[12].answers)
let question14 = new Pregunta(data[13].title, data[13].answers)
let question15 = new Pregunta(data[14].title, data[14].answers)
let question16 = new Pregunta(data[15].title, data[15].answers)
let question17 = new Pregunta(data[16].title, data[16].answers)
let question18 = new Pregunta(data[17].title, data[17].answers)
let question19 = new Pregunta(data[18].title, data[18].answers)
let question20 = new Pregunta(data[19].title, data[19].answers)

let questions = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10,
    question11, question12, question13, question14, question15, question16, question17, question18, question19, question20]
let encuesta = new Encuesta()
window.addEventListener('load', questions.forEach(question => {
    encuesta.addQuestion(question)
}))

function seeFirstQuestion() {
    pantallaInicio.style.display = 'none'
    btnEmpezar.style.display = 'none'
    btnVerRespuestas.style.display = 'none'
    divQuestions.style.display = 'block'
    encuesta.showCurrentQuestion()
}
btnEmpezar.addEventListener('click', seeFirstQuestion)

let verRespuestas = () => {
    btnVerRespuestas.style.display = 'none'
    pantallaInicio.style.display = 'none'
    respuestasPrevias.style.display = 'block'
}
btnVerRespuestas.addEventListener('click', verRespuestas)

let volverInicio = () => {
    btnSubmit.style.display = 'block'
    btnEmpezar.style.display = 'none'
    endScreen.style.display = 'none'
    pantallaInicio.style.display = 'block'
    btnVerRespuestas.style.display = 'block'
    encuesta.indexCurrentQuestion = 0

    if(localStorage.getItem("incomplete-quiz")) { 
        let incompQuizVolverIni = JSON.parse(localStorage.getItem("incomplete-quiz")) 
        incompQuizVolverIni.forEach(userVI => {
            if(input == userVI.user) {
            incompQuizVolverIni.splice(incompQuizVolverIni.indexOf(userVI), 1)
            localStorage.setItem("incomplete-quiz", JSON.stringify(incompQuizVolverIni))
        }
        })
    }
    
    let h3RespuestasDe = document.createElement('h3')
    h3RespuestasDe.textContent = 'Respuestas de ' + currentUser
    respuestasPrevias.append(h3RespuestasDe)

    let newTable = document.createElement('table')
    newTable.setAttribute('border', '1') 
    let tbody = document.createElement('tbody')
    newTable.append(tbody)
    let tr = document.createElement('tr')
    let tr2 = document.createElement('tr')
    
    userObj = {
        "user": currentUser,
        "questions": arrayQuestions,
        "answers": arrayAnswers
    }
    
    if(localStorage.getItem("Questions")) {
        localPrevQuiz = JSON.parse(localStorage.getItem("Questions"))
        localPrevQuiz.push(userObj)
    } else {
        localPrevQuiz.push(userObj)
    }
    localStorage.setItem("Questions", JSON.stringify(localPrevQuiz))

    arrayQuestions.forEach(question => {
        let td = document.createElement('td')
        td.textContent = question
        tr.append(td)
        tbody.append(tr)
    })

    arrayAnswers.forEach(answer => {
        let td = document.createElement('td')
        td.textContent = answer
        tr2.append(td)
        tbody.append(tr2)
    })
    respuestasPrevias.append(newTable)

    arrayQuestions = []
    arrayAnswers = [] 
}
btnVolver.addEventListener('click', volverInicio)

let volverInicio2 = () => {
    respuestasPrevias.style.display = 'none'
    pantallaInicio.style.display = 'block'
    btnVerRespuestas.style.display = 'block'
}
btnVolver2.addEventListener('click', volverInicio2)

const saveProgress = () => {
    userObj = { 
        "user": input,
        "questions": arrayQuestions,
        "answers": arrayAnswers
    }
    if(arrayQuestions.at(-1) != data[19].title) { 
        if(localStorage.getItem("incomplete-quiz")) { 
            incompleteQuiz = JSON.parse(localStorage.getItem("incomplete-quiz")) 
            incompleteQuiz.push(userObj) 
        } else {
            incompleteQuiz.push(userObj) 
        }
        localStorage.setItem("incomplete-quiz", JSON.stringify(incompleteQuiz))
    }
}
window.addEventListener('unload', saveProgress)