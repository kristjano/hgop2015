'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;


describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command =     {
      id : "1234",
      gameID : "999",
      command: "CreateGame",
      userName: "Gulli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/999')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameID": "999",
                "event": "GameCreated",
                "userName": "Gulli",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });

  it('Should execute fluid API test', function (done) {
    given(user("YourUser").createsGame("TheFirstGame"))
    .expect("GameCreated").withName("TheFirstGame").isOk(done);
  });

  it('Should play game until a draw', function (done) {
     given(user("YourUser").createsGame("GameIdOne").named("TheFirstGame"))
     .and(user("OtherUser").joinsGame("GameIdOne"))
     .and(user("YourUser").makesMove(0,0))
     .and(user("OtherUser").makesMove(0,2))
     .and(user("YourUser").makesMove(1,1))
     .and(user("OtherUser").makesMove(2,2))
     .and(user("YourUser").makesMove(2,0))
     .and(user("OtherUser").makesMove(1,0))
     .and(user("YourUser").makesMove(1,2))
     .and(user("OtherUser").makesMove(0,1))
     .and(user("YourUser").makesMove(2,1))
     .expect("Draw").byUser("YourUser").isOk(done);
  });

  it('Should play game until a win', function (done) {
     given(user("YourUser").createsGame("GameIdTwo").named("TheSecondGame"))
     .and(user("OtherUser").joinsGame("GameIdTwo"))
     .and(user("YourUser").makesMove(0,0))
     .and(user("OtherUser").makesMove(0,2))
     .and(user("YourUser").makesMove(1,1))
     .and(user("OtherUser").makesMove(2,1))
     .and(user("YourUser").makesMove(2,2))
     .expect("PlayerWon").byUser("YourUser").isOk(done);
  });
});
