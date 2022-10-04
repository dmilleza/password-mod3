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

function newPasswordOption(name, generator) {
  return {
    name: name,
    generate: generator,
  }
}

function getRandomSymbol() {
  return String.fromCharCode(randomInt(33, 47))
}

// generate random number characters from ASCII code
function getRandomNumber() {
  return String.fromCharCode(randomInt(48, 57))
}

// generate random lower-case letters from ASCII code
function getRandomLetterLower() {
  return String.fromCharCode(randomInt(97, 122))
}

// generate random upper-case letter by invoking 'getRandomLetterLower()' and converting to upper
function getRandomLetterUpper() {
  return getRandomLetterLower().toUpperCase()
}

function generatePassword(minLength, maxLength) {

  // initialize password length var
  var passwordLengthResult

  // get input from the user until it is validated or until they exit
  while (true) {
    passwordLengthResult = promptUserForInputType(
      "number", 
      "Enter a password length (between " + minLength + " and " + maxLength + " characters)", 
      function(inputNumber) {
        return inputNumber >= minLength && inputNumber <= maxLength
      }
    )

    if (passwordLengthResult.canceled) return // user exited prompt

    // if input type is invalid (not a number)
    if (!passwordLengthResult.isValidType) {
      window.alert("Please enter a valid number")

    // if input type is valid but does not meet the condition (password length range)
    } else if (!passwordLengthResult.isValidCondition) {
      window.alert("Password length must be between " + minLength + " and " + maxLength + " characters")

    // else no other invalidations occur, break the prompt loop
    } else {
      break
    }
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
