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

let kRowsOne = document.querySelector('.keyRowsOne')
let kRowsTwo = document.querySelector('.keyRowsTwo')
let kRowsThree = document.querySelector('.keyRowsThree')
let kRowsFour = document.querySelector('.keyRowsFour')
console.log(kRowsOne)

var currentWorld = ""
var numberOfguess = 0
var numberOfGguessRemaining = 0

/* Load game key board upon starting the game
*
*/
buildKeyboard()

function buildKeyboard() {
    keyboardArr.forEach(function(element,index,kbArr) {
        console.log(element)
        const arrKBLen = element.length
        letterArray = element;
        console.log(arrKBLen)
        for (let i = 0; i < arrKBLen; i++) {
            const appendKeyNode = document.querySelector(`.keyRows${index+1}`)
            console.log(`.keyRows${index+1}`)
            console.log(appendKeyNode)
            var divNodeKB = document.createElement("DIV")
            divNodeKB.setAttribute("class", "gameKeys")
            divNodeKB.setAttribute("id", letterArray[i])
            divNodeKB.innerHTML = letterArray[i]
            appendKeyNode.append(divNodeKB)
        }
    })
    const pressStart = document.querySelector('#startBtn')
    pressStart.addEventListener("click", onPressStart)
//    pressStart.removeEventListener("click", onPressStart)
}

function onPressStart() {
    // divNodeKB.addEventListener("click", onPressLetter)
    // Activate keyboard keys 
    console.log('I am in the OnPressStart button')
    console.log(this)
    const activateKeysArray = document.querySelectorAll('.gameKeys')
    console.log(activateKeysArray)
    activateKeysArray.forEach(elem => {
        elem.addEventListener('click', activateKeysFunction)
        elem.style.color = 'rgb(0,0,0)'
        elem.style.border = '2px solid rgb(0, 0, 0)' 
    })
    //Activate reset button
    const pressPlayAgain = document.querySelector('#resetBtn')
    pressPlayAgain.addEventListener("click", () => {
        console.log('Enabling reset button')
    })    
    this.removeEventListener("click", onPressStart)
}

function activateKeysFunction(event) {
    console.log(this)
    let elKey = `#${event.target.id}`
    console.log(`This is ${elKey}`)
    console.log("Press start working, activating key board")
    this.style.color = 'rgb(183, 163, 163)'
    this.style.border = '2px solid rgb(183, 163, 163)' 
    this.removeEventListener('click',activateKeysFunction)
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