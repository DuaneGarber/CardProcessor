var test = require('tape');
var checkCard = require('./checkCard');
var Account = require('./account');
var Storage = require('./storage');

test('Card Validation', function(t){
  t.notOk(checkCard(3), '3 is not a valid credit card');
  t.notOk(checkCard(1234567890123456), '1234567890123456 is NOT a valid credit card');
  t.notOk(checkCard(0000000000000), '0000000000000 is NOT a valid credit card');
  t.notOk(checkCard('woooo'), 'woooo is NOT a valid credit card');
  t.ok(checkCard('5454 5454 5454 5454'), '5454 5454 5454 5454 is a valid credit card');
  t.ok(checkCard(5454545454545454), '5454545454545454 IS a valid credit card');
  t.ok(checkCard(4111111111111111), '4111111111111111 IS a valid credit card');


  t.ok(checkCard(378282246310005), '378282246310005 IS a valid credit card');
  t.ok(checkCard(371449635398431), '371449635398431 IS a valid credit card');
  t.ok(checkCard(6011000990139424), '6011000990139424 IS a valid credit card');
  t.ok(checkCard(3566002020360505), '3566002020360505 IS a valid credit card');
  t.ok(checkCard(4012888888881881), '4012888888881881 IS a valid credit card');

  t.end();
});

test('Account Validation', function(t){
  var testAccount = new Account('duane', '4111111111111111', '$1000');

  t.equal(testAccount.getName(), 'duane', 'Name Retrieved');
  t.equal(testAccount.getNumber(), '4111111111111111', 'Card Number Retrieved');
  t.equal(testAccount.getLimit(), '$1000', 'Limit Retrieved');
  t.notOk(testAccount.balance, 'Balance is NOT accessible');

  t.equal(testAccount.toString(), 'duane: $0', 'Test Account To String works');
  t.equal(testAccount.actions.getBalance(), 0, 'Balance Retrieved');

  testAccount.charge('$100');
  t.equal(testAccount.actions.getBalance(), 100, 'Charge (String with $) was successful');

  testAccount.charge('100');
  t.equal(testAccount.actions.getBalance(), 200, 'Charge (String) was successful');

  testAccount.charge(100);
  t.equal(testAccount.actions.getBalance(), 300, 'Charge card (Number) was successful');

  testAccount.credit('$50');
  t.equal(testAccount.actions.getBalance(), 250, 'Credit (String with $) successful');

  testAccount.credit('50');
  t.equal(testAccount.actions.getBalance(), 200, 'Credit (String) successful');

  testAccount.credit(50);
  t.equal(testAccount.actions.getBalance(), 150, 'Credit (Number) successful');

  testAccount.charge(1000);
  t.equal(testAccount.actions.getBalance(), 150, 'Charge card was not charged correctly because amount was over limit');

  testAccount.credit(200);
  t.equal(testAccount.actions.getBalance(), -50, 'Crediting to a negative balance was successful');


  var badAccount = new Account('fail', '1234567890123456', '$1000');
  t.equal(badAccount.toString(), 'fail: error', 'Failed account to string works');
  t.equal(badAccount.getLimit(), 'error', 'Limit is set to error');

  badAccount.charge('fail', 100);
  t.equal(badAccount.actions.getBalance(), 0, 'Balance on failed account is unchanged');

  t.end();


});

test('Account Storage', function(t){
  var testStorage = new Storage();
  var secondStorage = new Storage();

  t.equal(testStorage, secondStorage, 'Only one instance of storage exists');
  var firstAccount = new Account('duane', '4111111111111111', '$1000');
  testStorage.addAccount(firstAccount);

  t.equal(testStorage.getAccount('duane'), firstAccount, 'Account Retrieved');
  t.notOk(testStorage.getAccount('fail'), 'Account not Retrieved');
  t.notOk(testStorage.accountExists('fail'), 'Account does not exist');
  t.ok(testStorage.accountExists('duane'), 'Account Exists');
  
  var secondAccount = new Account('andrew', '5454545454545454', '$1000');
  testStorage.addAccount(secondAccount);

  t.equal(testStorage.toString(), 'andrew: $0\nduane: $0\n', 'Display Works');

  var thirdAccount = new Account('zack', '5105105105105100', '$1000');
  testStorage.addAccount(thirdAccount);

  t.equal(testStorage.toString(), 'andrew: $0\nduane: $0\nzack: $0\n', 'Display Works');

  t.end();

});