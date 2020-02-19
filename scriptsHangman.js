console.log('Welcome to your first project')

var randomWordArray = ['Dubuque', 'Maquoketa', 'Davenport', 'Des Moines', 'Bettendorf',
                    'Iowa City', 'Cedar Rapids', 'Waterloo', 'Van Horne', 'Grimes',
                    'Johnston', 'Ankeny', 'Ames', 'Urbandale', 'Sioux City', 
                    'Cedar Falls', 'Asburry', 'Ottumwa', 'Cedar Falls', 'Mason City',
                    'Adel', 'Adair', 'Clive', 'Ely', 'Nashua']

var keyboardArr = [['a','b','c','d','e','f','g'],
               ['h','i','j','k','l','m','n'],
               ['o','p','q','r','s','t','u'],
               ['v','w','x','y','z']]

var scaffoldCanvas = [[' ', '|', '_', '_', '_', '_', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       [' ', '|', ' ', ' ', ' ', ' ', ' '],
                       ['_', '|', '_', '_', '_', '_', '_']]

var guessWordArr = [] 
var compareWordArr = []
var keyboardDisbleArr = []

const keyboardTotalKeys = 26

const pressStart = document.querySelector('#startBtn')
const guessLetterIn = document.querySelector('.guessWordIn')
const onStartGameDisplay = document.querySelector('#gameDisplay')

console.log(onStartGameDisplay)

var currentWord = ""
var numberOfGuess = 0
var numberOfMissedGuess = 0
var numberOfGguessRemaining = 0
var numberOfLives = 8
var compareMatch = false
var gameWon = false

main()

function main() {
    buildKeyboard()
    buildScafold()
    pressStart.addEventListener("click", onPressStart)
}

/* 
*   Load game key board upon starting the game 
*/
function buildKeyboard() {
    keyboardArr.forEach(function(element,index,kbArr) {
//        console.log(element)
        const arrKBLen = element.length
        letterArray = element
//        console.log(arrKBLen)
        for (let i = 0; i < arrKBLen; i++) {
            const appendKeyNode = document.querySelector(`.keyRows${index+1}`)
//            console.log(`.keyRows${index+1}`)
//            console.log(appendKeyNode)
            var divNodeKB = document.createElement("DIV")
            divNodeKB.setAttribute("class", "gameKeys")
            divNodeKB.setAttribute("id", `keys${letterArray[i]}`)
            divNodeKB.innerHTML = letterArray[i]
            appendKeyNode.append(divNodeKB)
        }
    })
}

/*
*   Build initial gallows mat upon starting the game
*/
function buildScafold() {
    scaffoldCanvas.forEach(function(scElement, scIndex, scArr) {
        const arrSCLen = scElement.length
        scaffoldArray = scElement
        for (let j = 0; j < arrSCLen; j++) {
            const appendSCNode = document.querySelector(`.HangLayer${scIndex+1}`)
            var divNodeSC = document.createElement("DIV")
            divNodeSC.setAttribute("class", "scafoldPiece")
            divNodeSC.setAttribute("id", `scaffold${scIndex}${j}`)
            divNodeSC.innerHTML = scaffoldArray[j]
            appendSCNode.append(divNodeSC)            

        }
    })
}

function onPressStart() {
    const onStartHangingArea = document.querySelectorAll('.scafoldPiece')
    console.log(onStartHangingArea)

    var gameSound = document.querySelector('#hangmanSound')

    gameSound.play()

    generateRandomWord()
    // divNodeKB.addEventListener("click", onPressLetter)
    // Activate keyboard keys 
//    console.log('I am in the OnPressStart button')
//    console.log(this)
    const activateKeysArray = document.querySelectorAll('.gameKeys')
//    console.log(activateKeysArray)
    activateKeysArray.forEach(elem => {
        elem.addEventListener('click', playTheGameFunction)
        elem.style.color = 'rgb(0,0,0)'
        elem.style.border = '2px solid rgb(0, 0, 0)' 
    })
    //Activate reset button
    activatePlayAgain()
//   console.log(`Setting up style for input screen ${guessLetterIn}`)
    guessLetterIn.style.border = '2px solid rgb(0, 0, 0)'
    guessLetterIn.style.background = 'rgb(255, 255, 255)'
   
    pressStart.style.background = 'rgb(249, 250, 245)'
    pressStart.style.color = 'rgb(183, 163, 163)'
    pressStart.style.border = '2px solid rgb(183, 163, 163)' 
    

    onStartHangingArea.forEach(function(hangElem, hangIndex, hangArr) {
        hangElem.style.color = 'rgb(0, 0, 0)'
    })

    onStartGameDisplay.style.border = '2px solid rgb(0, 0, 0)'
    onStartGameDisplay.style.color = 'rgb(0, 0, 0)'

 //   alert('Please guess the name of a city in the state of iowa.');
    document.querySelector('#gameDisplay').innerHTML = `Please guess the name of a city in the state of Iowa. You have ${numberOfGuess} guesses.`

    this.removeEventListener("click", onPressStart)
}

function playTheGameFunction(event) {
    console.log(this)
//    let elKey = `${event.target.id}`
    let elKey = `${this.textContent}`
    console.log(`This is ${elKey}`)
    console.log(currentWord)
    // let currWord = currentWord.toLowerCase()
    let compareWordArr = currentWord.toLowerCase().split(''); 
    console.log('Array in play game', compareWordArr)
    console.log(`This first value ${this.textContent}`)
    compareWordArr.forEach(function(letterCompare, indexCompare, compareArray){
        console.log(`This.value ${letterCompare}`)
        if (indexCompare === 0) {
            numberOfGuess -= 1
        }
        if (letterCompare === elKey) {
            guessWordArr.push(letterCompare)
            console.log(`The guess array building ${guessWordArr}`)
            console.log(guessWordArr)
            console.log(`#${letterCompare}${indexCompare}`)
            console.log(document.querySelector(`#${letterCompare}${indexCompare}`))
            document.querySelector(`#${letterCompare}${indexCompare}`).innerHTML = letterCompare
            evaluateGameResult()
            compareMatch = true
            } 
        if ((indexCompare + 1) === currentWord.length) {
            console.log('indexCompare ' + indexCompare)
            if (numberOfGuess !== 0) {      
                if (compareMatch === false) {
                    console.log('compareMatch f ' + compareMatch )
                    numberOfMissedGuess += 1
                    console.log('numberOfMissedGuess' + numberOfMissedGuess)
                    numberOfLives -= 1
                    console.log('numberOfLives' + numberOfLives)
                    updateScaffold()
 
                } else {
                    console.log('compareMatch t ' + compareMatch )
                    compareMatch = false
                }
                if (gameWon === false) {
                    if (numberOfLives === 0) {
                        document.querySelector('#gameDisplay').innerHTML = `Game over! You are out of lives. The guess is ${currentWord}`
                        gameKeyboardReset() 
                    } else {
                        document.querySelector('#gameDisplay').innerHTML = `You have ${numberOfGuess} guesses and ${numberOfLives} lives remaining.`
                    }
                }               
            } else {
                if (compareMatch !== true) {
                    document.querySelector('#gameDisplay').innerHTML = `Game over! You are out of guesses. The guess is ${currentWord}`
                }
                gameKeyboardReset() 
            }
        }

        } )

        console.log(`Value of ${elKey}`)
    console.log(`The new compare array ${guessWordArr}`)
 //   evaluateGameResult()
    
//    console.log("Press start working, activating key board")
    this.style.color = 'rgb(183, 163, 163)'
    this.style.border = '2px solid rgb(183, 163, 163)' 

    this.removeEventListener('click',playTheGameFunction)
    }

function activatePlayAgain(event) {
//    console.log('Iam in play again' + this)
    const pressPlayAgain = document.querySelector('#resetBtn')
    pressPlayAgain.style.color = 'rgb(0, 0, 0)' 
    pressPlayAgain.style.background = 'rgb(206, 206, 156)'
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
    if (currentWordArrLen <= 5) {
        numberOfGuess = 8
    } else {
        numberOfGuess = currentWordArrLen + 3
    }
    console.log(`number of guess random ${numberOfGuess}`)
} 

function evaluateGameResult() {
    console.log(guessWordArr) 
    console.log(compareWordArr)
    var removeBlank = []
    let ctrial = currentWord.toLowerCase().split(''); 
    console.log('ctrial',ctrial)
    ctrial.forEach(function(remElement, remIndex, remArr){
        if (remElement !== ' ') {
            removeBlank.push(remArr[remIndex]) 
        }
    })
//    removeBlank = ctrial.filter( (ctrialEl) => { ctrialEl !== ' '})
    console.log('removeBlamk', removeBlank)
    console.log(guessWordArr.length)
    console.log(removeBlank.length)
    if (guessWordArr.length == removeBlank.length) {
        gameOverWin()
    }

}

function gameOverWin() {
    console.log('GameOverWin')
    document.querySelector('#gameDisplay').innerHTML = 'Congratulations! You have won the game.'
    gameWon = true
    gameKeyboardReset() 
}

function updateScaffold() {
    console.log('update scaffold', document.querySelector('#scaffold15'))
    if (numberOfMissedGuess === 1) {
        document.querySelector('#scaffold15').innerHTML = '|'
    } else if (numberOfMissedGuess === 2) {
        document.querySelector('#scaffold25').innerHTML = 'O'
    } else if (numberOfMissedGuess === 3) {
        document.querySelector('#scaffold35').innerHTML = '|'
    } else if (numberOfMissedGuess === 4) {
        document.querySelector('#scaffold34').innerHTML = '/'
    } else if (numberOfMissedGuess === 5) {
        document.querySelector('#scaffold36').innerHTML = '\\'
    } else if (numberOfMissedGuess === 6) {
        document.querySelector('#scaffold45').innerHTML = '|'
    } else if (numberOfMissedGuess === 7) {
        document.querySelector('#scaffold54').innerHTML = '/'
    } else if (numberOfMissedGuess === 8) {
        document.querySelector('#scaffold56').innerHTML = '\\'
    } 
}

function gameKeyboardReset() {
    keyboardDisbleArr = document.querySelectorAll('.gameKeys')
    console.log(this)
    console.log('guessWordArr', guessWordArr)
    console.log(' keyboardDisbleArr',  keyboardDisbleArr)
    keyboardDisbleArr.forEach(function checkMatch(cmatchEl, cmatchIndex, cmatchArr) {
        let matchArrElement = false
        for (let k = 0; k < guessWordArr.length; k++) {
            if (cmatchEl === guessWordArr[k]) {
                matchArrElement = true
            } 
        }
        console.log('matchValue', matchArrElement)
 //       console.log('matchEl', cmatchEl)
        if (matchArrElement === false) {
            cmatchEl.style.color = 'rgb(183, 163, 163)'
            cmatchEl.style.border = '2px solid rgb(183, 163, 163)' 
            cmatchEl.removeEventListener('click',playTheGameFunction)
        }
    });
 
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