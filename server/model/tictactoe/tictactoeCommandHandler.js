module.exports = function tictactoeCommandHandler(events) {
  return {
    executeCommand: function (command) {
      return [{
        id: 1,
        event: 'GameCreated',
        gameID: 1,
        userName: 'Kristjan',
        timeStamp: '2015.12.03T13:17:10'
      }];
    }
  }
}
