module.exports = function tictactoeCommandHandler(events) {
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
      for (event of events) {
        if (event.x === command.x && event.y === command.y) {
          return [{
            id: command.id,
            event: 'IllegalMove',
            userName: command.userName,
            timeStamp: command.timeStamp
          }];
        }
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

  return {
    executeCommand: function (command) {
      return handlers[command.command](command);
    }
  };
};
