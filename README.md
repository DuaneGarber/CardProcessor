# Usage Instructions
System Requirements:
Node 0.12.x (I've tested 0.10.x as well)
NPM (no version requirements)

# Setup:
Since I am including the node_modules folder, you may not have to NPM isntall. But if it is not working out of the box, please try the following steps:
1. delete the node_modules folder
2. npm install (to install testing module)

## To start program:
Execute `node app` to start command line interface

## To run unit tests:
Execute `node testSuite` to run unit tests

## Program Usage:
The user is greeted with a set of viable commands, in addition to the Required 3 actions (Add, Charge, Credit), I have added "Display", which does fulfill the display requirements. Along with two additional commands for user interaction of "Help" and "Exit".

# Design Process
Unknowns:
1. What is the LUHN 10?
  a. Credit card Validation algorithm
  b. Internet research revealed that the algorithm was fairly straight forward and I didn't want to trust a critical function of the program to just some code I found on the internet.  So I wrote my LUHN 10 (checkCard.js) from scratch
  c. This algorithm will be very easy to verify with unit testing.

Critical Data:
1. Name
  a. Used for account identification
  b. Cannot be set after initialization
2. Card Number
  a. In a normal environment I would treat this as super secure information, given the scope of the project, I merely made it private.
3. Limit
  a. Storing this as a number, appends the $ sign for display purposes
4. Account balance
  a. Treating this value as critical data, I do not want easy accessibility to this value.  In addition to it being private, I wrap it in an closure and only allow the 2 valid actions to have access to it.  Making these actions instance methods over prototyped protects the system from abuse from users changing the functionality after creation.

Objects:
1. Account
  a. Constructor initializes all values and checks card number
  b. Instance Methods
    1. getName() - Retrieves Account Name
    2. getNumber() - Retrieves Card Number
    3. getLimit() - Retrieves limit
    4. actions.credit( amount ) - Credit balance
    5. actions.charge( amount ) - Charge balance
    6. actions.getBalance() - Retrieves account balance
  c. Prototype Methods
    1. charge( amount ) - Convenience method for shorthanding actions.charge
    2. credit( amount ) - Convenience method for shorthanding actions.credit
    3. getBalance() - Convenience method for shorthanding actions.getBalance
    4. toString() - Enable string output in the proper format
      a. Design: This is attached to the prototype method to enable programs later on to update the display without having to edit this Object's code.
  d. Private Helper Functions:
    1. isNumber( n ) -- JS number type safety check

2. Storage -- Simple Object storage for account objects
  a. Constructor -- initializes account storage
    1. Using Singleton Pattern to ensure only 1 storage is ever created per instance
  b. Instance Methods
    1. None
  c. Prototype Methods
    1. addAccount( accountObj ) - Adds account to storage, checks for duplicate accounts
    2. getAccount( accountName ) - Returns Account Object connected to the passed in account name
    3. accountExists() - Returns boolean on whether an account exists
    4. toString() - Sorts and returns each account in a string format delimited with a new line char
  d. Private Helper Functions
    1. sortAccounts( account ) - Simple Object key sorter
  e. Design:
    1. Using an object (key/value pair) for storage because insertions are O(1), retreivals are O(1), search is O(1), and memory is N which matches Array.

Command Line Interface:
Simple cli, all actions are lowercased in order to limit user error.  Added additional console logging to act more like a normal user system.