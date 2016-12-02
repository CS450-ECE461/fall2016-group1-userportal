var requirePath = '../../../app/';

var chai = require('chai');
var spies = require('chai-spies');
var blueprint = require ('@onehilltech/blueprint');
var UserController = require(requirePath + 'controllers/UserController');

chai.use(spies);
var assert = chai.assert;
var should = chai.should();
var spy = chai.spy;

var controller, req, res;

describe('UserController', function() {
    beforeEach(function() {
        controller = new UserController();
        req = {
            logout: spy(),
            user: 'somerandomuser'
        };
        res = {
            render: spy()
        };
    });

    describe('constructor', function() {
        it('inherits from BaseController', function() {
            var callSpy = spy.on(blueprint.BaseController, 'call');

            var cont = new UserController();

            callSpy.should.have.been.called.with.exactly(cont);
        });
    });

    describe('signout', function() {
        it('returns a function', function() {
            controller.signout().should.be.a('function');
        });

        describe('returned function', function() {
            it('logs the user out and renders the login page', function() {
                controller.signout()(req, res);

                req.logout.should.have.been.called.once();
                res.render.should.have.been.called.once();

                var renderArgs = res.render.__spy.calls[0];
                renderArgs[0].should.equal('login.pug');
                renderArgs[1].login_error_message.search(/log.*out/i).should.not.equal(-1);
            });
        });
    });

    describe('showMe', function() {
        it('returns a function', function() {
            controller.showMe().should.be.a('function');
        });

        describe('returned function', function() {
            it('shows the current user', function() {
                controller.showMe()(req, res);

                res.render.should.have.been.called.once();

                var renderArgs = res.render.__spy.calls[0];
                renderArgs[0].should.equal('user.pug');
                renderArgs[1].user.should.equal(req.user);
            });
        });
    });
});
