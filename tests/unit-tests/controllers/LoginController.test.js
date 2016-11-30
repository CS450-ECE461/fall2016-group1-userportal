var requirePath = '../../../app/';

var chai = require('chai');
var spies = require('chai-spies');
var blueprint = require ('@onehilltech/blueprint');
var LoginController = require(requirePath + 'controllers/LoginController');

chai.use(spies);
var assert = chai.assert;
var should = chai.should();
var spy = chai.spy;

var controller;
var res;

describe('LoginController', function() {
    beforeEach(function() {
        controller = new LoginController();
        res = {
            redirect: spy()
        };
    });

    describe('constructor', function() {
        it('inherits from BaseController', function() {
            var callSpy = spy.on(blueprint.BaseController, 'call');

            var cont = new LoginController();

            callSpy.should.have.been.called.with.exactly(cont);
        });
    });

    describe('completeLogin', function() {
        it('returns a function that redirects to the dashboard', function() {
            controller.completeLogin().should.be.a('function');
        });

        describe('returned function', function() {
            it('redirects to the dashboard', function() {
                controller.completeLogin()(null, res);

                res.redirect.should.have.been.called.with.exactly('/dashboard');
            });
        });
    });

    describe('logout', function() {
        it('returns a function that redirects to login', function() {
            controller.logout().should.be.a('function');
        });

        describe('returned function', function() {
            it('redirects to login', function() {
                controller.logout()(null, res);

                res.redirect.should.have.been.called.with.exactly('/login');
            });
        });
    });
});
