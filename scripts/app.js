const container = document.querySelector('.container')
const hexButton = document.querySelector('#copy-hex')
const rgbButton = document.querySelector('#copy-rgb')
const hexCode = document.querySelector('#hex-code')
const rgbCode = document.querySelector('#rgb-code')
const randomizer = document.querySelector('#randomizer')
const boxes = []

randomizer.addEventListener('click', randomizeColors)
hexButton.addEventListener('click', copyHex)
rgbButton.addEventListener('click', copyRgb)

function randomizeColors() {
    boxes.forEach(box => {
        changeColor(box)
    })
}

function copyHex() {
    navigator.clipboard.writeText(hexCode.textContent)
}
function copyRgb() {
    navigator.clipboard.writeText(rgbCode.textContent)
}

for(let i=0; i<25; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    container.append(cell)
    cell.addEventListener('click', writeColor)
    boxes.push(cell)
}
const hexChars = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
function writeColor(e) {
    rgbCode.textContent = e.target.style.background
    hexCode.textContent = rgbToHex(rgbCode.textContent)
}
function rgbToHex(rgbString=''){
    rgbString = rgbString.match(/\(([^)]+)\)/)[1].split(',')
    console.log(rgbString)
    let hexString = ''
    function rgbNumToHex(num){
        let string = ''
        let aux = Math.floor(num/16)
        let remainder = num%16
        switch (aux) {
            case 10:
                string += 'A'
                break;
            case 11:
                string += 'B'
                break;
            case 12:
                string += 'C'
                break;
            case 13:
                string += 'D'
                break;
            case 14:
                string += 'E'
                break;
            case 15:
                string += 'F'
                break;
            default:
                string += aux
                break;
        }
        switch (remainder) {
            case 10:
                string += 'A'
                break;
            case 11:
                string += 'B'
                break;
            case 12:
                string += 'C'
                break;
            case 13:
                string += 'D'
                break;
            case 14:
                string += 'E'
                break;
            case 15:
                string += 'F'
                break;
            default:
                string += remainder
                break;
        }
        return string
    }
    rgbString.forEach(value => {
        hexString += rgbNumToHex(Number(value.trim()))
    })
    return '#' + hexString
}

function changeColor(box) {
    let hexString = ''
    for(let j=0; j<6; j++) {
        hexString += hexChars[Math.floor(16*Math.random())]
    }
    box.style.background = '#' + hexString
}

function hexToRgb(hexString) {
    let red;
    let green;
    let blue;
    red = hexCharToDec(hexString[0]) + 16*hexCharToDec(hexString[1])
    green = hexCharToDec(hexString[2]) + 16*hexCharToDec(hexString[3])
    blue = hexCharToDec(hexString[4]) + 16*hexCharToDec(hexString[5])
    return `rgb(${red}, ${green}, ${blue})`
}

function hexCharToDec(char) {
    switch (char) {
        case 'A':
            return 10
        case 'B':
            return 11
        case 'C':
            return 12
        case 'D':
            return 13
        case 'E':
            return 14
        case 'F':
            return 15
        default:
            return Number(char)
    }
}

