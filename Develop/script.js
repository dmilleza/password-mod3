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

  var inputObject = {
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

// generate special characters at random from ASCII code
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

  // list of existing password options
  var passwordOptions = [
    newPasswordOption("uppercase letters", getRandomLetterUpper),
    newPasswordOption("lowercase letters", getRandomLetterLower),
    newPasswordOption("symbols", getRandomSymbol),
    newPasswordOption("numbers", getRandomNumber),
  ]

  // an empty array where the user's selected options will be stored
  var selectedPasswordOptions = []

  // iterate over all existing password options, prompting the user for each one
  for (var i = 0; i < passwordOptions.length; i++) {
    var option = passwordOptions[i]
    var userConfirmed = window.confirm("Would you like to include " + option.name + " in your password? (Okay = Yes, Cancel = No)")

    // push option to 'selectedPasswordOptions' array if the user confirms the option
    if (userConfirmed) selectedPasswordOptions.push(option)
  }

  // if the user selected no options, choose one at random
  if (selectedPasswordOptions.length === 0) {
    var randomOption = getRandomIndex(passwordOptions)
    window.alert("No specifications were given. Generating password with: " + randomOption.name)
    selectedPasswordOptions.push(randomOption)
  }

  // password generation
  var passwordBuffer = ""
  for (var i = 0; i < passwordLengthResult.value; i++) {
    passwordBuffer += getRandomIndex(selectedPasswordOptions).generate()
  }

  // return password
  return passwordBuffer
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword(8, 128);
  var passwordText = document.querySelector("#password");

  if (password) passwordText.value = password;
}

// get generate button from the HTML
var generateBtn = document.querySelector("#generate");

// add "click" event to the generate button
generateBtn.addEventListener("click", writePassword);