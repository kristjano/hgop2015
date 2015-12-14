var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 1000 games in x seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 500;
  var x = 10;

  this.timeout(x * 1200);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
    given(user("TestUserOne").createsGame("" + gameId))
      .and(user("TestUserTwo").joinsGame("" + gameId))
      .and(user("TestUserOne").makesMove(2,1))
      .and(user("TestUserTwo").makesMove(1,1))
      .and(user("TestUserOne").makesMove(2,2))
      .and(user("TestUserTwo").makesMove(0,1))
      .and(user("TestUserOne").makesMove(2,0))
      .expect("PlayerWon").isOk(QED);
  }
});
