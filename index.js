const inputSlider = document.querySelector('#myRange');
const lengthDisplay = document.querySelector('#pass-length');
const passDisplay = document.querySelector('#display');
const copyButton = document.querySelector('#copy-button');
const copySection = document.querySelector('#copy-section');
const upperCaseCheck = document.querySelector('#checkbox1');
const lowerCaseCheck = document.querySelector('#checkbox2');
const numbersCheck = document.querySelector('#checkbox3');
const symbolsCheck = document.querySelector('#checkbox4');
const generateButton = document.querySelector('#generate');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');
const symbols = `~!@#$%^*()_+{}:"|<>?/.,';[]=-`

let password = "";
let passwordLength = 10;
let checkboxCount = 0;

handleSlider();
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function generateRandomNumber() {
    return getRandomInteger(0,9);
}
function generateRandomLowercase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}
function generateRandomUppercase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}
function generateRandomSymbols() {
    return symbols.charAt(getRandomInteger(0,symbols.length));
}

function handleCheckBoxCount() {
    checkboxCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked) {
            checkboxCount++;
        }
    })
}

async function copyContent() {
    if(password.length !== 0) {
        let span = document.createElement('span');
        try {
            await navigator.clipboard.writeText(passDisplay.innerText);
            span.innerText = "copied";
            copySection.removeChild(copyButton);
            copySection.appendChild(span);
        }
        catch(e) {
            span.innerText = "Not Copied";
            copySection.removeChild(copyButton);
            copySection.appendChild(span);
        }
        setTimeout(()=>{
            copySection.removeChild(span);
            copySection.appendChild(copyButton);
        }, 2000);
    }
}
function shufflePassword (arr) {
    let str = "";
    for(let i=arr.length - 1;i>=0;i--) {
        let j = Math.floor(Math.random() * (i + 1));

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    arr.forEach((item)=>{
        str += item;
    })
    return str;
}
inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxCount);
})

generateButton.addEventListener('click',()=>{
    if(checkboxCount === 0) return;
   
    if(checkboxCount > passwordLength) {
        passwordLength = checkboxCount;
        handleSlider();
    }

    password = "";
    let functionArr = [];
    
    if(upperCaseCheck.checked) {
        functionArr.push(generateRandomUppercase);
    }
    if(lowerCaseCheck.checked) {
        functionArr.push(generateRandomLowercase);
    }
    if(numbersCheck.checked) {
        functionArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked) {
        functionArr.push(generateRandomSymbols);
    }

    for(let i = 0;i<functionArr.length;i++) {
        password += functionArr[i]();
    }

    for(let i=0;i<passwordLength - checkboxCount ;i++) {
        let randIndex = getRandomInteger(0, functionArr.length);
        password += functionArr[randIndex]();
    }
    password = shufflePassword(Array.from(password));
    passDisplay.innerText = password;
})