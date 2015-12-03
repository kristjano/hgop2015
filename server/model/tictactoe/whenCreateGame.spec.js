var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('create game command', function () {
  var given, when, then;

  it('should create game', function () {
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

  it('should create game with another user another time', function () {
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

describe('join game command', function () {
  var given, when, then;

  it('should join game', function () {
    given = [{
      id: 2,
      event: 'GameCreated',
      gameID: 3,
      userName: 'Doddi',
      timeStamp: '2015.12.03T13:57:33'
    }];
    when = {
      id: 5,
      command: 'JoinGame',
      gameID: 3,
      userName: 'Kristjan',
      timeStamp: '2015.12.03T14:00:01'
    };
    then = [{
      id: 5,
      event: 'GameJoined',
      gameID: 3,
      userName: 'Kristjan',
      timeStamp: '2015.12.03T14:00:01'
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
})
