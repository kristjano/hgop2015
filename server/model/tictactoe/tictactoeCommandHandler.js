module.exports = function tictactoeCommandHandler(events) {
  return {
    executeCommand: function (command) {
      return [{
        id: command.id,
        event: 'GameCreated',
        gameID: command.gameID,
        userName: command.userName,
        timeStamp: command.timeStamp
      }];
    }
  };
};
