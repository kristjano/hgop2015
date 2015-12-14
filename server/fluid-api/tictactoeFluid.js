var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var _gameId;

function given(userApi) {
  function commandHandler(cmd) {
    if (cmd.command === 'CreateGame') {
      return {
        id: cmd.id,
        event: 'GameCreated',
        gameID: cmd.gameID,
        userName: cmd.userName,
        name: cmd.name,
        timeStamp: cmd.timeStamp
      }
    } else if (cmd.command === 'JoinGame') {
      return {
        id: cmd.id,
        event: 'GameJoined',
        gameID: cmd.gameID,
        userName: cmd.userName,
        timeStamp: cmd.timeStamp
      }
    } else if (cmd.command === 'MakeMove') {
      return {
        id: cmd.id,
        event: 'MoveMade',
        gameID: cmd.gameID,
        userName: cmd.userName,
        x: cmd.x,
        y: cmd.y,
        player: cmd.player,
        timeStamp: cmd.timeStamp
      }
    }
  }

  function firstToLower(word) {
    return word.charAt(0).toLowerCase() + word.slice(1);
  }

  var _commands = [];
  var _expectedEvents = [];
  var _currentEvent = 0;
  var expectApi = {
    isOk: function (done) {
      var req = request(acceptanceUrl);
      req
        .post('/api/' + firstToLower(_commands[0].command))
        .type('json')
        .send(_commands[0])
        .end(function (err, res) {
          if (err) return done(err);
          _commands.shift();
          if (_commands.length > 0) {
            // Call recursively until all commands have been sent.
            expectApi.isOk(done);
            return;
          }

          request(acceptanceUrl)
            .get('/api/gameHistory/' + userApi._command.gameID)
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
              if (err) return done(err);
              res.body.should.be.instanceof(Array);
              should(res.body).eql(
                _expectedEvents);
              done();
            });
        });
      return expectApi;
    },
    and: function (command) {
      var cmd = command._command;
      _commands.push(cmd);
      _expectedEvents.push(commandHandler(cmd));

      _currentEvent += 1;
      return expectApi;
    },
    expect: function (eventName) {
      if (eventName === 'Draw') {
        _expectedEvents.push({
                  id: _expectedEvents[_currentEvent].id,
                  event: eventName,
                  gameID: _gameId,
                  userName: _expectedEvents[_currentEvent].user,
                  timeStamp: _expectedEvents[_currentEvent].timeStamp
                });
        _currentEvent += 1;
      }
      _expectedEvents[_currentEvent].event = eventName;
      return expectApi;
    },
    withName: function (gameName) {
      _expectedEvents[_currentEvent].name = gameName;
      return expectApi;
    },
    byUser: function (userName) {
      _expectedEvents[_currentEvent].userName = userName;
      return expectApi;
    }
  };

  // Push the first command and its expected event to arrays.
  _commands.push(userApi._command);
  _expectedEvents.push(commandHandler(userApi._command));

  return expectApi;
}

function user(userName) {
  var userApi = {
    _command: undefined,
    createsGame: function (gameId) {
      _gameId = gameId;
      userApi._command = {
        id: '1234',
        gameID: gameId,
        command: 'CreateGame',
        userName: userName,
        name: gameId,
        timeStamp: '2014-12-02T11:29:29'
      };
      return userApi;
    },
    joinsGame: function (gameId) {
      userApi._command = {
        id: '1234',
        command: 'JoinGame',
        gameID: gameId,
        userName: userName,
        timeStamp: '2015-12-03T14:00:01'
      }
      return userApi;
    },
    withId: function (gameId) {
      _gameId = gameId;
      userApi._command.gameId = gameId;
      return userApi;
    },
    named: function (gameName) {
      userApi._command.name = gameName;
      return userApi;
    },
    makesMove: function (x, y) {
      userApi._command = {
        id: '1234',
        command: 'MakeMove',
        gameID: _gameId,
        userName: userName,
        x: x,
        y: y,
        player: userName,
        timeStamp: '2015-12-03T15:30:01'
      }
      return userApi;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
