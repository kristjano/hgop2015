var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function() {
  var given, when, then;

  it('should create game', function() {
    given = [];
    when = {
      id: 1,
      command: 'CreateGame',
      userName: 'Kristjan',
      timeStamp: '2015.12.03T13:17:10'
    };
    then = [{
      id: 1,
      event: 'GameCreated',
      gameID: 1,
      userName: 'Kristjan',
      timeStamp: '2015.12.03T13:17:10'
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
