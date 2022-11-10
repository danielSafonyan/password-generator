const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];

const alphabetLower = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const digits = "0123456789";
const symbols = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

const sliderInput = document.querySelector("#pass-length");
const sliderInputDisp = document.querySelector("#pass-strength");
sliderInput.addEventListener('input', (event) => {
    sliderInputDisp.textContent = (event.target.value)
})

const passOneDisp = document.querySelector("#gen-pass-one");
const passTwoDisp = document.querySelector("#gen-pass-two");

const form = document.querySelector("form");
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const userInput = getUserInput(formData)
    const [passOne, passTwo] = generateTwoPasswords(userInput);
    passOneDisp.textContent = passOne;
    passTwoDisp.textContent = passTwo;
    document.querySelector(".copy-message").textContent =  "";
})

function getUserInput(formData) {
    return {
        useNums:  !!(formData.get("useNums")),
        useSymbs: !!(formData.get("useSymbs")),
        passLength: Number(formData.get("pass-length")),
    }
}

function generateTwoPasswords({useNums, useSymbs, passLength}) {
    let passOne = "";
    let passtwo = "";
    
    while (passOne.length < passLength) {
        if (useNums) {
            passOne += generateRandomChar(digits);
            passtwo += generateRandomChar(digits);
        }
        if (useSymbs) {
            passOne += generateRandomChar(symbols);
            passtwo += generateRandomChar(symbols);
        }
        passOne += generateRandomChar(alphabetLower);
        passtwo += generateRandomChar(alphabetLower);
    }
    console.log(passOne)
    console.log(passtwo)
    return [passOne, passtwo]
}

// function generateTwoPasswords(userInputObject) {
//     let passOne = "";
//     let passtwo = "";
    
//     while (passOne.length < userInputObject.passLength) {
//         if (useNums) {
//             passOne += generateRandomChar(digits);
//             passtwo += generateRandomChar(digits);
//         }
//         if (useSymbs) {
//             passOne += generateRandomChar(symbols);
//             passtwo += generateRandomChar(symbols);
//         }
//         passOne += generateRandomChar(alphabetLower);
//         passtwo += generateRandomChar(alphabetLower);
//     }
//     console.log(passOne)
//     console.log(passtwo)
//     return [passOne, passtwo]
// }

function generateRandomChar(string) {
    const randomIdx = Math.floor(Math.random() * string.length)
    return string[randomIdx];
}

const passwordsDisplayed = document.querySelectorAll(".password")
passwordsDisplayed.forEach(el => el.addEventListener('click', copyToClip))
function copyToClip(event) {

    const generatedPass = event.target.textContent;
    if (generatedPass === "") {
        document.querySelector(".copy-message").textContent =  "Generate a  Password."
    } else {
    navigator.clipboard.writeText(generatedPass)
    document.querySelector(".copy-message").textContent =  "Copied to Clipboard."
    }
    
}
