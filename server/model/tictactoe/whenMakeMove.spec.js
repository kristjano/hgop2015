var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function () {
  var given, when, then;

  beforeEach(function () {
    given = [{
      id: 25,
      event: 'GameCreated',
      gameID: 15,
      userName: 'Dora',
      timeStamp: '2015.12.03T15:25:50'
    }, {
      id: 28,
      command: 'JoinGame',
      gameID: 15,
      userName: 'Finnur',
      timeStamp: '2015.12.03T15:27:21'
    }];
  });

  describe('on new game', function () {
    it('should make a move', function () {
      when = {
        id: 30,
        command: 'MakeMove',
        userName: 'Finnur',
        x: 2,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:28:04'
      };
      then = [{
        id: 30,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 2,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:28:04'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
});
