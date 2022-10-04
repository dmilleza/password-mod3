// Assignment code here
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

function randomInt(min, max) {
  if (!max) {
    max = min
    min = 0
  }
  var rand = Math.random()
  return Math.floor(min*(1 - rand) + rand*max)



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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
