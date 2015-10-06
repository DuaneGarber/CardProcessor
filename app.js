//This is the engine for the inputs and outputs

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Account = require('./account');
var Storage = require('./storage');
var accounts = {};
var storage = new Storage();

console.log('Welcome to Duane Garber\'s Credit Card System!');
//Initialize Display
outputCommands();

rl.on('line', function( cmd ){
  var cmds = cmd.split(' ');
  if ( cmds.length ) {
    var action = cmds.shift().toString().toLowerCase();
    var accountName = cmds[0];

    if ( (action === 'add' || action === 'credit' || action === 'charge') && !accountName ) {
      console.error('Account Name is a Required field');
    } else {

      switch ( action ) {
        case 'add' : 
          var cardNumber = cmds[1];
          var limit = cmds[2];

          if ( !cardNumber || !limit ) {
            console.error('Error: Card Number and Limit Are required fields');
            break;
          }
          //Create a new instance of an account, add it the accounts object
          storage.addAccount(new Account(accountName, cardNumber, limit));
          break;
        case 'credit' : 
          //Make sure the account name exists
          if ( storage.accountExists([accountName]) ) {
            if ( cmds[1] ) {
              storage.getAccount(accountName).credit(cmds[1]);
            } else {
              console.error('Error: Amount to Credit is a required field');
            }
          } else {
            console.error('Account with the name of "' + accountName + '" was not found');
          }
          break;
        case 'charge' : 
          //Make sure the account name exists
          if ( storage.accountExists([accountName]) ) {
            if ( cmds[1] ) {
              storage.getAccount(accountName).charge(cmds[1]);
            } else {
              console.error('Error: Amount to Charge is a required field');
            }
          } else {
            console.error('Account with the name of "' + accountName + '" was not found');
          }
          break;
        case 'display' : 
          console.log('\n\n\n');
          console.log(storage.toString());
          break;
        case 'help' : 
          outputCommands();
          break;
        case 'exit' : 
          rl.write('Goodbye ');
          rl.close();
          break;
        default:
          console.log('ERROR: Please input valid command, Type Help for commands')
      }
    }
  }
});

function outputCommands(){
  console.log('Add <name> <card_number> $<limit> -- Add Account with specified card number and limit');
  console.log('Charge <name> $<amount> -- Charge <name>\'s Account ');
  console.log('Credit <name> $<amount> -- Credit <name>\'s Account');
  console.log('Display -- Show all Accounts');
  console.log('Exit -- Exits Program');
  console.log('Help -- Display Command List Again');
}