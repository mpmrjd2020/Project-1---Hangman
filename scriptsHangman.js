console.log('Welcome to your first project')

var randomWordArray = ['Dubuque', 'Maquoketa', 'Davenport', 'Des Moines', 'Bettendorf',
                    'Iowa City', 'Cedar Rapids', 'Waterloo', 'Van Horne', 'Grimes',
                    'Johnston', 'Ankeny', 'Ames', 'Urbandale', 'Sioux City', 
                    'Cedar Falls', 'Asburry', 'Ottumwa', 'Cedar Falls', 'Mason City']
var guessWordArr = [] 
var keyboardArr = [['a','b','c','d','e','f','g'],
               ['h','i','j','k','l','m','n'],
               ['o','p','q','r','s','t','u'],
               ['v','w','x','y','z']]
const keyboardTotalKeys = 26

const pressStart = document.querySelector('#startBtn')
const guessLetterIn = document.querySelector('.guessWordIn')


var currentWord = ""
var numberOfguess = 0
var numberOfGguessRemaining = 0

/* Load game key board upon starting the game
*
*/
buildKeyboard()

function buildKeyboard() {
    keyboardArr.forEach(function(element,index,kbArr) {
//        console.log(element)
        const arrKBLen = element.length
        letterArray = element;
//        console.log(arrKBLen)
        for (let i = 0; i < arrKBLen; i++) {
            const appendKeyNode = document.querySelector(`.keyRows${index+1}`)
//            console.log(`.keyRows${index+1}`)
//            console.log(appendKeyNode)
            var divNodeKB = document.createElement("DIV")
            divNodeKB.setAttribute("class", "gameKeys")
            divNodeKB.setAttribute("id", letterArray[i])
            divNodeKB.innerHTML = letterArray[i]
            appendKeyNode.append(divNodeKB)
        }
    })
    // const pressStart = document.querySelector('#startBtn')
    pressStart.addEventListener("click", onPressStart)
//    pressStart.removeEventListener("click", onPressStart)
}

function onPressStart() {

    generateRandomWord()
    // divNodeKB.addEventListener("click", onPressLetter)
    // Activate keyboard keys 
//    console.log('I am in the OnPressStart button')
//    console.log(this)
    const activateKeysArray = document.querySelectorAll('.gameKeys')
//    console.log(activateKeysArray)
    activateKeysArray.forEach(elem => {
        elem.addEventListener('click', activateKeysFunction)
        elem.style.color = 'rgb(0,0,0)'
        elem.style.border = '2px solid rgb(0, 0, 0)' 
    })
    //Activate reset button
    activatePlayAgain()
//   console.log(`Setting up style for input screen ${guessLetterIn}`)
    guessLetterIn.style.border = '2px solid rgb(0, 0, 0'
    guessLetterIn.style.background = 'rgb(255, 255, 255'
   
    pressStart.style.background = 'rgb(249, 250, 245)'
    pressStart.style.color = 'rgb(183, 163, 163)'
    pressStart.style.border = '2px solid rgb(183, 163, 163)' 

    this.removeEventListener("click", onPressStart)
}

function activateKeysFunction(event) {
    console.log(this)
    let elKey = `${event.target.id}`
    console.log(`This is ${elKey}`)
    console.log(currentWord)
    let currWord = currentWord.toLowerCase()
    let compareWordArr = currWord.split(''); 
    console.log(`This first value ${this.textContent}`)
    compareWordArr.forEach(function(letterCompare, indexCompare, compareArray){
        console.log(`This.value ${letterCompare}`)
        if (letterCompare === elKey) {
            guessWordArr.push(letterCompare)
            console.log(`#${letterCompare}${indexCompare}`)
            console.log(document.querySelector(`#${letterCompare}${indexCompare}`))
            document.querySelector(`#${letterCompare}${indexCompare}`).innerHTML = letterCompare
        } else {
            guessWordArr.push(' ')
        }
        console.log(`Value of ${elKey}`)
    })
    console.log(`The new compare array ${guessWordArr}`)
    
//    console.log("Press start working, activating key board")
    this.style.color = 'rgb(183, 163, 163)'
    this.style.border = '2px solid rgb(183, 163, 163)' 

    this.removeEventListener('click',activateKeysFunction)
    }

function activatePlayAgain(event) {
//    console.log('Iam in play again' + this)
    const pressPlayAgain = document.querySelector('#resetBtn')
    pressPlayAgain.style.color = 'rgb(0, 0, 0)' 
    pressPlayAgain.style.background = 'rgb(192, 192, 192'
    pressPlayAgain.style.border = '2px solid rgb(0, 0, 0)'  
    pressPlayAgain.addEventListener("click", () => {
//        console.log('Enabling reset button')
        window.location.reload(true)
        // buildKeyboard()
        // console.log('Disabling reset button')
        // this.removeEventListener('click',activatePlayAgain)
    })
}

function generateRandomWord() {
    const indexRdArr = Math.floor(Math.random() * randomWordArray.length)
    console.log(`The randowm array index is ${indexRdArr}`)
    currentWord = randomWordArray[indexRdArr]
    console.log('the ramdom word is ' + currentWord)
    let currentWordArr = currentWord.toLowerCase().split('');
    console.log(currentWordArr)
    const currentWordArrLen = currentWordArr.length
    currentWordArr.forEach(function(currElem, currIndex, currWarr){
        var currNodeLetter = document.createElement("DIV")
        currNodeLetter.setAttribute("class", "currWordLetter")
        currNodeLetter.setAttribute("id", `${currElem}${currIndex}`)
        if (currElem === ' ') {
            console.log(currElem)
            currNodeLetter.innerHTML = ' '
        } else {
            currNodeLetter.innerHTML = '_'
        }
        guessLetterIn.append(currNodeLetter)       
    })

} 

function compareInput() {

}
// function onPressLetter() {
//     compareLetterToGuessWord()
//     setUpFontRemoveListener()

// } 

// function onAppLoad() {

// }


//onGameStart()
//playtheGame()
//