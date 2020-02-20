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

var timeGmStart = 0
var timeGmFinish = 0
var timeGameDuration = 0
var timeGameMinute = 0
var timeGameSecond = 0
var highestScoreDisplay = 0
var highestGameScore = 0
var highestGameSecond = 0


main()

function main() {
    buildKeyboard()
    buildScafold()
    getDisplayHighestScore()
    pressStart.addEventListener("click", onPressStart)
}

/* 
*   Load game key board upon starting the game 
*/
function buildKeyboard() {
    keyboardArr.forEach(function(element,index,kbArr) {
        const arrKBLen = element.length
        letterArray = element
        for (let i = 0; i < arrKBLen; i++) {
            const appendKeyNode = document.querySelector(`.keyRows${index+1}`)
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

/*
*   Pressing the start button activate the gameboard
*/
function onPressStart() {
    const onStartHangingArea = document.querySelectorAll('.scafoldPiece')
    console.log(onStartHangingArea)

    var gameSound = document.querySelector('#hangmanSound')

    gameSound.play()

    generateRandomWord()

    const activateKeysArray = document.querySelectorAll('.gameKeys')

    activateKeysArray.forEach(elem => {
        elem.addEventListener('click', playTheGameFunction)
        elem.style.color = 'rgb(0,0,0)'
        elem.style.border = '2px solid rgb(0, 0, 0)' 
    })

    activatePlayAgain()

/*
*   Setting up the style of various elements when the gameboard is activated
*/ 
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

    document.querySelector('#gameDisplay').innerHTML = `Please guess the name of a city in the state of Iowa. You have ${numberOfGuess} guesses.`

    this.removeEventListener("click", onPressStart)

/*
*   Getting the game starting time to start tracking the user time to completing the game.
*/
    timeGmStart = Date.now()
 
}

/*
*   Function with main game logic
*/
function playTheGameFunction(event) {
    let elKey = `${this.textContent}`

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
        if (gameWon === false) {
            if ((indexCompare + 1) === currentWord.length) {
                if (numberOfGuess !== 0) {      
                    if (compareMatch === false) {
                        numberOfMissedGuess += 1
                        console.log('numberOfMissedGuess' + numberOfMissedGuess)
                        numberOfLives -= 1
                        console.log('numberOfLives' + numberOfLives)
                        updateScaffold()    
                    } else {
                        console.log('compareMatch t ' + compareMatch )
                        compareMatch = false
                    }                   
                        if (numberOfLives === 0) {
                            document.querySelector('#gameDisplay').innerHTML = `Game over! You are out of lives. The guess is ${currentWord}`
                            gameKeyboardReset() 
                        } else {
                            document.querySelector('#gameDisplay').innerHTML = `You have ${numberOfGuess} guesses and ${numberOfLives} lives remaining.`
                        }                                 
                } else {
                        document.querySelector('#gameDisplay').innerHTML = `Game over! You are out of guesses. The guess is ${currentWord}`                   
                    gameKeyboardReset() 
                }
            }
        }

    } )

    console.log(`Value of ${elKey}`)
    console.log(`The new compare array ${guessWordArr}`)
 
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
    calculateGameDuration()
    determineStoreHighestScore()
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

function calculateGameDuration() {
    timeGmFinish = Date.now()
    timeGameDuration = timeGmFinish - timeGmStart
    timeGameMinute = timeGameDuration / 60000
    console.log(timeGameMinute)
    timeGameSecond = Math.ceil((timeGameMinute - Math.trunc(timeGameMinute)) * 60)

    timeDisplayMinute = Math.trunc(timeGameMinute)
    console.log(Math.trunc(timeGameMinute))
    console.log('timeGmFinish', timeGmFinish)
    document.querySelector('.playerScore').innerHTML = `Player score: ${timeDisplayMinute} min. ${timeGameSecond} sec.`
}

function getDisplayHighestScore() {
    highestGameScore = parseFloat(localStorage.getItem('highestScore'))
    console.log('getDisplayHighestScore', highestGameScore)
    if (isNaN(highestGameScore)) {
        highestGameScore = 0
    }
    highestGameSecond = Math.ceil((highestGameScore - Math.trunc(highestGameScore)) * 60)
    highestScoreDisplay = Math.trunc(highestGameScore)
    document.querySelector('.gameScore').innerHTML = `Highest Score: ${highestScoreDisplay} min. ${highestGameSecond} sec.`  
}

function determineStoreHighestScore() {
    console.log('highestGameScore ', highestGameScore)
    console.log('timeGameMinute ', timeGameMinute)
    console.log('timeDisplayMinute', timeDisplayMinute)
    console.log('timeGameSecond' , timeGameSecond)
    if (highestGameScore > timeGameMinute) {
        localStorage.removeItem('highestScore')
        localStorage.setItem('highestScore', timeGameMinute)
        document.querySelector('.gameScore').innerHTML = `Player score: ${timeDisplayMinute} min. ${timeGameSecond} sec.` 
    }
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