/*  display "error" instead of the balance if the credit card number does not pass Luhn 10 */

//LUHN 10 Algoritm ( https://en.wikipedia.org/wiki/Luhn_algorithm )
module.exports = function ( cardNum ) {
  //Toss out bad chars
  if (/[^0-9-\s]+/.test(cardNum) ) {
    return false;
  }

  //Convert the Number to a String (if nec) remove spaces and dashes convert to array
  var digits = (cardNum + '').replace(/[\s-]/g, '').split('');

  //Throw out cards with more than 19 digits or exactly 1 digit
  if ( digits.length > 19 || digits.length === 1 ) {
    return false;
  }
  
  //Pop the checkdigit off the end
  var checkDigit = Number(digits.pop());

  if ( isNaN(checkDigit) ) {
    console.error("Check Digit was NOT A NUMBER");
    return false;
  }

  var sumDigits = 0;
  var isEven = true;
  var currentNum = null;

  for( var i = digits.length-1; i >= 0; i-- ) {
    currentNum = Number(digits[i]);

    if ( isNaN(currentNum) ) {
      console.error("Current Number was NOT A NUMBER -- " + digits[i]);
      return false;
    }

    if ( isEven ) {
      currentNum *=2;

      if ( currentNum > 9 ) {
        currentNum -= 9;
      }
    }


    sumDigits += currentNum;
    isEven = !isEven;
  }

  if ( sumDigits > 0 ) {
    sumDigits *= 9;
    if ( (sumDigits % 10) === checkDigit ) {
      return true;
    }
  }

  return false;
}