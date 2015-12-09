module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    board: [['', '', ''], ['', '', ''], ['', '', '']]
  };

  var eventHandlers = {
    'MoveMade': function (event) {
      gameState.board[event.x][event.y] = event.player;
    }
  };

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
      return [{
        id: command.id,
        event: 'MoveMade',
        userName: command.userName,
        x: command.x,
        y: command.y,
        player: command.player,
        timeStamp: command.timeStamp
      }];
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
