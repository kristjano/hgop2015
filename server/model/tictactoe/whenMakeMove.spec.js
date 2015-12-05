var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('make move command', function () {
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
    it('first user should make a move', function () {
      when = {
        id: 30,
        command: 'MakeMove',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.03T15:28:04'
      };
      then = [{
        id: 30,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.03T15:28:04'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });

  describe('second player turn', function () {
    it('second user should make a move', function () {
      given.push({
        id: 30,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.03T15:28:04'
      });
      when = {
        id: 59,
        command: 'MakeMove',
        userName: 'Dora',
        x: 3,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:30:01'
      };
      then = [{
        id: 59,
        event: 'MoveMade',
        userName: 'Dora',
        x: 3,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:30:01'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should not be allowed to make same move as previous user', function () {
      given.push({
        id: 30,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.03T15:28:04'
      });
      when = {
        id: 59,
        command: 'MakeMove',
        userName: 'Dora',
        x: 0,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:30:01'
      };
      then = [{
        id: 59,
        event: 'IllegalMove',
        userName: 'Dora',
        timeStamp: '2015.12.03T15:30:01'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
});
