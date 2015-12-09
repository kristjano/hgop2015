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
        x: 2,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.03T15:30:01'
      };
      then = [{
        id: 59,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
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

  describe('winning move', function () {
    it('should be three across', function () {
      given.push({
        id: 90,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.04T09:28:01'
      }, {
        id: 95,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 1,
        player: 'O',
        timeStamp: '2015.12.04T09:31:11'
      });
      when = {
        id: 101,
        command: 'MakeMove',
        userName: 'Finnur',
        x: 0,
        y: 2,
        player: 'O',
        timeStamp: '2015.12.04T15:32:04'
      };
      then = [{
        id: 101,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 2,
        player: 'O',
        timeStamp: '2015.12.04T15:32:04'
      }, {
        id: 101,
        event: 'PlayerWon',
        userName: 'Finnur',
        timeStamp: '2015.12.04T15:32:04'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should be three down', function () {
      given.push({
        id: 140,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.08T10:50:01'
      }, {
        id: 145,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
        y: 2,
        player: 'X',
        timeStamp: '2015.12.08T10:51:21'
      });
      when = {
        id: 147,
        command: 'MakeMove',
        userName: 'Dora',
        x: 2,
        y: 1,
        player: 'X',
        timeStamp: '2015.12.08T15:52:04'
      };
      then = [{
        id: 147,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
        y: 1,
        player: 'X',
        timeStamp: '2015.12.08T15:52:04'
      }, {
        id: 147,
        event: 'PlayerWon',
        userName: 'Dora',
        timeStamp: '2015.12.08T15:52:04'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should be three diagonal to the right', function () {
      given.push({
        id: 201,
        event: 'MoveMade',
        userName: 'Dora',
        x: 0,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.09T11:37:01'
      }, {
        id: 205,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
        y: 2,
        player: 'X',
        timeStamp: '2015.12.09T11:38:21'
      });
      when = {
        id: 208,
        command: 'MakeMove',
        userName: 'Dora',
        x: 1,
        y: 1,
        player: 'X',
        timeStamp: '2015.12.09T11:39:04'
      };
      then = [{
        id: 208,
        event: 'MoveMade',
        userName: 'Dora',
        x: 1,
        y: 1,
        player: 'X',
        timeStamp: '2015.12.09T11:39:04'
      }, {
        id: 208,
        event: 'PlayerWon',
        userName: 'Dora',
        timeStamp: '2015.12.09T11:39:04'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });

    it('should be three diagonal to the left', function () {
      given.push({
        id: 300,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 2,
        player: 'O',
        timeStamp: '2015.12.09T12:01:50'
      }, {
        id: 303,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 1,
        y: 1,
        player: 'O',
        timeStamp: '2015.12.09T12:03:10'
      });
      when = {
        id: 305,
        command: 'MakeMove',
        userName: 'Finnur',
        x: 2,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.09T12:04:21'
      };
      then = [{
        id: 305,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 2,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.09T12:04:21'
      }, {
        id: 305,
        event: 'PlayerWon',
        userName: 'Finnur',
        timeStamp: '2015.12.09T12:04:21'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });

  describe('game draw', function () {
    it('should be a draw when board is full and no one has won', function () {
      given.push({
        id: 300,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 0,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.09T12:25:50'
      }, {
        id: 305,
        event: 'MoveMade',
        userName: 'Dora',
        x: 0,
        y: 2,
        player: 'X',
        timeStamp: '2015.12.09T12:26:50'
      }, {
        id: 308,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 1,
        y: 1,
        player: 'O',
        timeStamp: '2015.12.09T12:28:50'
      }, {
        id: 310,
        event: 'MoveMade',
        userName: 'Dora',
        x: 2,
        y: 2,
        player: 'X',
        timeStamp: '2015.12.09T12:30:50'
      }, {
        id: 312,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 2,
        y: 0,
        player: 'O',
        timeStamp: '2015.12.09T12:31:50'
      }, {
        id: 313,
        event: 'MoveMade',
        userName: 'Dora',
        x: 1,
        y: 0,
        player: 'X',
        timeStamp: '2015.12.09T12:32:50'
      }, {
        id: 314,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 1,
        y: 2,
        player: 'O',
        timeStamp: '2015.12.09T12:33:50'
      }, {
        id: 316,
        event: 'MoveMade',
        userName: 'Dora',
        x: 0,
        y: 1,
        player: 'X',
        timeStamp: '2015.12.09T12:35:50'
      });
      when = {
        id: 318,
        command: 'MakeMove',
        userName: 'Finnur',
        x: 2,
        y: 1,
        player: 'O',
        timeStamp: '2015.12.09T12:37:21'
      };

      then = [{
        id: 318,
        event: 'MoveMade',
        userName: 'Finnur',
        x: 2,
        y: 1,
        player: 'O',
        timeStamp: '2015.12.09T12:37:21'
      }, {
        id: 318,
        event: 'Draw',
        userName: 'Finnur',
        timeStamp: '2015.12.09T12:37:21'
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    });
  });
});
