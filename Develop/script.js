// Assignment code here
// Get references to the #generate element


function randomInt(min, max) {
  if (!max) {
    max = min
    min = 0
  }
  var rand = Math.random()
  return Math.floor(min*(1 - rand) + rand*max)
}

function getRandomIndex(list) {
  return list[randomInt(list.length)]
}

// prompt the user for a specified value, and a given condition function
function promptUserForInputType(inputType, message, isValidCondition) {
  var userInput = window.prompt(message)
  var isValidType

  let inputObject = {
    // value:...
    // isValidType:...
    // isValidCondition:...
    canceled: userInput === null
  }

  // validate input for number type
  if (inputType === "number") {
    userInput = parseInt(userInput)
    isValidType = !isNaN(userInput)
  }

  // assign object fields
  inputObject.isValidType = isValidType
  inputObject.value = userInput
  inputObject.isValidCondition = isValidType && isValidCondition(userInput)

  return inputObject
}

// 1. Prompt user for the password criteria 
//  a. Password length 8 < 128
//  b. Lowercase, uppercase, numbers, special characters
// 2. Validate the input
// 3. Generate password based on criteria
// 4. Display password to the page

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

var generateBtn = document.querySelector("#generate");

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
