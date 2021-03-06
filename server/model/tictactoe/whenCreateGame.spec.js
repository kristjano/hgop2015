var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function () {
  var given, when, then;

  it('should create new game', function () {
    given = [];
    when = {
      id: 1,
      command: 'CreateGame',
      gameID: 1,
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

  it('should create new game with another user and another time', function () {
    given = [];
    when = {
      id: 2,
      command: 'CreateGame',
      gameID: 3,
      userName: 'Doddi',
      timeStamp: '2015.12.03T13:57:33'
    };
    then = [{
      id: 2,
      event: 'GameCreated',
      gameID: 3,
      userName: 'Doddi',
      timeStamp: '2015.12.03T13:57:33'
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
