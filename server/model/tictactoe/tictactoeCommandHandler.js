module.exports = function tictactoeCommandHandler(events) {
  var handlers = {
    'CreateGame': function (command) {
      return [{
        id: command.id,
        event: 'GameCreated',
        gameID: command.gameID,
        userName: command.userName,
        timeStamp: command.timeStamp
      }]
    },
    'JoinGame': function (command) {
      if (events.length < 1) {
        return [{
          id: 9,
          event: 'GameDoesNotExist',
          userName: 'Gunni',
          timeStamp: '2015.12.03T15:02:01'
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
      if (events[events.length-1].x === command.x && events[events.length-1].y === command.y) {
        return [{
          id: command.id,
          event: 'IllegalMove',
          userName: command.userName,
          timeStamp: command.timeStamp
        }]
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
