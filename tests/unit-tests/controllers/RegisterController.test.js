var requirePath = '../../../app/';

var chai = require('chai');
var spies = require('chai-spies');
var blueprint = require ('@onehilltech/blueprint');
var request = require('superagent');
var RegisterController = require(requirePath + 'controllers/RegisterController');

chai.use(spies);
var assert = chai.assert;
var should = chai.should();
var spy = chai.spy;

var controller, req, res, post, send, end, user;

describe('RegisterController', function() {
    beforeEach(function() {
        controller = new RegisterController();
        req = {
            body: {
                'firstName' : '',
                'middleName' : '',
                'lastName' : '',
                'emailAddress' :  '',
                'password' : '',
                'username' : ''
            }
        };
        res = {
            render: spy()
        };
        end = spy();
        send = spy(function() { return { end: end } });
        post = spy(function() { return { send: send } });
        request.post = post;

        // set up user
        user = Object.assign({}, req.body); // copy
        user.handle = user.username; // "rename" 'username' to 'handle'
        delete user.username;
    });

    describe('constructor', function() {
        it('inherits from BaseController', function() {
            var callSpy = spy.on(blueprint.BaseController, 'call');

            var cont = new RegisterController();

            callSpy.should.have.been.called.with.exactly(cont);
        });
    });

    describe('completeSignUp', function() {
        it('returns a function', function() {
            controller.completeSignUp().should.be.a('function');
        });

        it('should post the user to the api', function() {
            var func = controller.completeSignUp(); // get function

            func(req, res); // test function

            post.should.have.been.called.once();
            send.should.have.been.called.with.exactly({ user: user });
            end.should.have.been.called.with.exactly(controller._completeSignUpEnd);
        });
    });


});
