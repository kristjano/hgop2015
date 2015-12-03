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
      return [{
        id: command.id,
        event: 'GameJoined',
        gameID: command.gameID,
        userName: command.userName,
        timeStamp: command.timeStamp
      }]
    }
  }

  return {
    executeCommand: function (command) {
      return handlers[command.command](command);
    }
  };
};
