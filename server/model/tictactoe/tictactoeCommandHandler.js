module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    board: [['', '', ''], ['', '', ''], ['', '', '']]
  };

  var eventHandlers = {
    'MoveMade': function (event) {
      gameState.board[event.x][event.y] = event.player;
    }
  };

  var checkWin = function (player) {
    for (var i = 0; i < 3; i++) {
      if (gameState.board[i][0] === player &&
        gameState.board[i][1] === player &&
        gameState.board[i][2] === player) {
        return true;
      }
    }

    for (var j = 0; i < 3; j++) {
      if (gameState.board[0][j] === player &&
        gameState.board[1][j] === player &&
        gameState.board[2][j] === player) {
        return true;
      }
    }

    if (gameState.board[0][0] === player &&
      gameState.board[1][1] === player &&
      gameState.board[2][2] === player) {
      return true;
    }

    if (gameState.board[0][2] === player &&
      gameState.board[1][1] === player &&
      gameState.board[2][0] === player) {
      return true;
    }

    return false;
  };

  var checkDraw = function () {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; i < 3; i++) {
        if (gameState.board[i][j] === '') {
          return false;
        }
      }
    }
    return true;
  }

  var handlers = {
    'CreateGame': function (command) {
      return [{
        id: command.id,
        event: 'GameCreated',
        gameID: command.gameID,
        userName: command.userName,
        timeStamp: command.timeStamp
      }];
    },
    'JoinGame': function (command) {
      if (events.length < 1) {
        return [{
          id: command.id,
          event: 'GameDoesNotExist',
          userName: command.userName,
          timeStamp: command.timeStamp
        }];
      }

      return [{
        id: command.id,
        event: 'GameJoined',
        gameID: command.gameID,
        userName: command.userName,
        timeStamp: command.timeStamp
      }]
    },
    'MakeMove': function (command) {
      if (gameState.board[command.x][command.y] !== '') {
        return [{
          id: command.id,
          event: 'IllegalMove',
          userName: command.userName,
          timeStamp: command.timeStamp
        }];
      }
      gameState.board[command.x][command.y] = command.player;
      var move = [{
        id: command.id,
        event: 'MoveMade',
        userName: command.userName,
        x: command.x,
        y: command.y,
        player: command.player,
        timeStamp: command.timeStamp
      }];

      if (checkWin(command.player)) {
        move.push({
          id: command.id,
          event: 'PlayerWon',
          userName: command.userName,
          timeStamp: command.timeStamp
        });
      }

      if (checkDraw()) {
        move.push({
          id: command.id,
          event: 'Draw',
          userName: command.userName,
          timeStamp: command.timeStamp
        });
      }

      return move;
    }
  }

  for (var event of events) {
    var eventHandler = eventHandlers[event.event];
    if (eventHandler) {
      eventHandler(event);
	  }
  }

  return {
    executeCommand: function (command) {
      return handlers[command.command](command);
    }
  };
};
