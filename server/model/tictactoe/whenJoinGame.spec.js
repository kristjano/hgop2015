var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('join game command', function () {
  var given, when, then;

  it('should allow user to join game that is available', function () {
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

  it('should not allow user to join a non-existing game', function () {
    given = [];
    when = {
      id: 9,
      command: 'JoinGame',
      gameID: 5,
      userName: 'Gunni',
      timeStamp: '2015.12.03T15:02:01'
    };
    then = [{
      id: 9,
      event: 'GameDoesNotExist',
      userName: 'Gunni',
      timeStamp: '2015.12.03T15:02:01'
    }];

    var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

    JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
  });
});
