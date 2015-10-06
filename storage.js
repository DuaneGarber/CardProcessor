var Storage = function(){
  if ( Storage.instance ) {
    console.error('Storage already exists, Returning instance');
    return Storage.instance;
  }
  Storage.instance = this;
  this.accounts = {};
}

//Adds account to storage, checks for duplicate accounts
Storage.prototype.addAccount = function( thisAccount ) {
  if ( !this.accounts[thisAccount.getName()] ) {
    this.accounts[thisAccount.getName()] = thisAccount;
  } else {
    console.error('Account ' + thisAccount.getName() + ' already exists, please pick a different account name');
  }
};


//Returns Account Object connected to the passed in account name
Storage.prototype.getAccount = function( accountName ) {
  if ( this.accounts[accountName] ) {
    return this.accounts[accountName];
  } else {
    return false;
  }
};

//Returns boolean on whether an account exists
Storage.prototype.accountExists = function( accountName ) {
  //return the boolean of the falsey value
  return !!this.accounts[accountName];
};

//Sorts and returns each account in a string format delimited with a new line char
Storage.prototype.toString = function() {
  this.accounts = sortAccounts(this.accounts);
  var outputString = '';
  for (var key in this.accounts) {
    if (this.accounts.hasOwnProperty(key)) {
      outputString += (this.accounts[key].toString()) + '\n';
    }
  }

  return outputString;
};

//Simple Object key sorter
function sortAccounts( obj ) {
  var keys = [];
  var sorted_obj = {};

  for(var key in obj){
      if(obj.hasOwnProperty(key)){
          keys.push(key);
      }
  }

  // sort keys
  keys.sort();

  // create new array based on Sorted Keys
  keys.forEach(function(key){
      sorted_obj[key] = obj[key];
  });

  return sorted_obj;
};


module.exports = Storage;