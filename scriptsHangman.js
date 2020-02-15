console.log('Welcome to your first project')

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
function buildKeyboard() {
    keyboardArr.forEach(function(element,index,kbArr) {
        console.log(element)
        const arrKBLen = element.length
        console.log(arrKBLen)
        for (let i = 0; i < arrKBLen; i++) {
            const appendKeyNode = document.querySelector(`.keyRows${index+1}`)
            console.log(`.keyRows${index+1}`)
            console.log(appendKeyNode)
            var divNodeKB = document.createElement("DIV");
            divNodeKB.setAttribute("class", "gameKeys");
            appendKeyNode.append(divNodeKB)
        }
    })
}

function onGameStart() {
    divNodeKB.addEventListener('click', () => {
        console.log("mouse over working")
        divNodeKB.style.background = 'ligthgrey'
    })
}

buildKeyboard()
//onGameStart()
//playtheGame()