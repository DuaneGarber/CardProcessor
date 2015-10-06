var checkCard = require('./checkCard');

//Create Account Object
var Account = function( thisName, thisNumber, thisLimit ){
  var name = thisName;
  var number = thisNumber;
  var limit = null;

  if ( !thisNumber || !thisLimit ) {
    console.error('Error: Card Number and Limit Are required fields Account NOT created');
    return false;
  }

  //Check Card number
  if ( !checkCard( number ) ) {
    limit = "error";
    console.error('Sorry, the card number ' + number + ' is invalid');
  } else {
    limit = parseInt(thisLimit.replace('$', ''), 10);
  }

  //Using an IIFE attach 3 functions to 'actions'
  this.actions = (function() {
    //Starting Balance is 0
    //Balance is private, it is only accessible through changeBy
    var balance = 0;

    //Only entry point of changing balance, is private to the actions functions
    function changeBy(amount) {
      if ( limit === 'error') {
        console.error('Account is in ERROR -- No Credits or Charges can be made to it');
      } else {
        balance = (balance + Number(amount));
      }
    }

    //Actions Definition
    //actions.credit( amount ) - Credit balance
    //actions.charge( amount ) - Charge balance
    //actions.getBalance() - Retrieves account balance
    return {
      credit : function( amount ){
        if ( !isNumber(amount) ) {
          amount = parseInt(amount.replace('$', ''), 10);
        }

        if ( !isNumber(amount) ) {
          console.error('Amount was in an improper format: ' + amount);
          return false;
        }
        changeBy( amount  * -1 );
        return true;
      },
      charge : function( amount ){
        if ( !isNumber(amount) ) {
          amount = parseInt(amount.replace('$', ''), 10);
        }

        if ( limit !== 'error' && (Number(amount) + balance) > limit) {
          console.error('Sorry, ' + name + ' a charge of ' + amount + ' would put you over the limit of $' + limit);
          return false;
        }

        if ( !isNumber(amount) ) {
          console.error('Amount was in an improper format: ' + amount);
          return false;
        }

        changeBy( amount );
        return true;
      },
      getBalance : function(){
        return balance;
      }
    }
  })();

  //Getters for the values
  this.getName = function() {
    return name;
  };

  this.getNumber = function() {
    return number;
  };

  this.getLimit = function() {
    if ( limit === 'error' ) {
      return 'error';
    } else {
      return '$' + limit;  
    }
  };

}

// Convenience method for shorthanding actions.charge
Account.prototype.charge = function( amount ) {
  return this.actions.charge(amount);
};

// Convenience method for shorthanding actions.credit
Account.prototype.credit = function( amount ) {
  return this.actions.credit(amount);
};

//Convenience method for shorthanding actions.getBalance
Account.prototype.getBalance = function( ) {
  return this.actions.getBalance();
}

//Override String output of this Object
Account.prototype.toString = function(){
  if ( this.getLimit() === 'error') {
    return this.getName() + ': error';
  } else {
    return this.getName() + ': $' + this.actions.getBalance();
  }
}

//Utility functions
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


module.exports = Account;