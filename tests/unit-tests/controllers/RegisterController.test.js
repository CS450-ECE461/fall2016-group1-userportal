var requirePath = '../../../app/';

var chai = require('chai');
var spies = require('chai-spies');
var blueprint = require ('@onehilltech/blueprint');
var request = require('superagent');
var RegisterController = require(requirePath + 'controllers/RegisterController');

chai.use(spies);
var spy = chai.spy;

var controller, req, res, post, send, end, user;

describe('RegisterController', function() {
    beforeEach(function() {
        controller = new RegisterController();
        req = {
            body: {
                'firstName' : 'John',
                'middleName' : 'U',
                'lastName' : 'Doe',
                'emailAddress' :  'johndoe@idk.com',
                'password' : 'null',
                'username' : ''
            }
        };
        res = {
            render: spy(),
            redirect: spy()
        };
        end = spy();
        send = spy(function() { return { end: end } });
        post = spy(function() { return { send: send } });
        request.post = post;

        // set up user
        user = Object.assign({}, req.body); // copy req.body
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

        describe('returned function', function() {
            it('posts the user to the api', function() {
                controller.completeSignUp()(req, res);

                post.should.have.been.called.once();

                var postArg = post.__spy.calls[0][0];
                postArg.should.be.a('string')
                postArg.search(/api.*users/).should.not.equal(-1);
                send.should.have.been.called.with.exactly({ user: user });
                end.should.have.been.called.once();
                end.__spy.calls[0][0].should.be.a('function');
            });

            describe('request.end callback', function() {
                var completeSignUp;

                beforeEach(function() {
                    completeSignUp = controller.completeSignUp();
                });

                it('checks that first name only consist of characters', function() {
                    req.body.firstName = '_John';

                    completeSignUp(req, res);
                    end.__spy.calls[0][0](); // call the anonymous function

                    res.render.should.have.been.called.once();

                    var renderArgs = res.render.__spy.calls[0];
                    renderArgs[0].should.equal('register.pug');
                    renderArgs[1].error_message.search(/first.*name/i).should.not.equal(-1);
                });

                it('checks that middle name only consist of characters', function() {
                    req.body.middleName = 'U*';

                    completeSignUp(req, res);
                    end.__spy.calls[0][0](); // call the anonymous function

                    res.render.should.have.been.called.once();

                    var renderArgs = res.render.__spy.calls[0];
                    renderArgs[0].should.equal('register.pug');
                    renderArgs[1].error_message.search(/middle.*name/i).should.not.equal(-1);
                });

                it('checks that last name only consist of characters', function() {
                    req.body.lastName = 'D0e';

                    completeSignUp(req, res);
                    end.__spy.calls[0][0](); // call the anonymous function

                    res.render.should.have.been.called.once();

                    var renderArgs = res.render.__spy.calls[0];
                    renderArgs[0].should.equal('register.pug');
                    renderArgs[1].error_message.search(/last.*name/i).should.not.equal(-1);
                });

                it('checks for errors returned by the server', function() {
                    var statuses = ['422', '409', '400'];
                    var messages = [/username|email/i, /email/i, /something/i];
                    completeSignUp(req, res);

                    for (var i = 0; i < statuses.length; i++) {
                        end.__spy.calls[0][0]({ status: statuses[i] }); // call the anonymous function

                        res.render.should.have.been.called.once();

                        var renderArgs = res.render.__spy.calls[0];
                        renderArgs[0].should.equal('register.pug');
                        renderArgs[1].error_message.search(messages[i]).should.not.equal(-1);

                        res.render.reset();
                    }
                });

                it('redirects the user to the login page if registration succeeded', function() {
                    completeSignUp(req, res);
                    end.__spy.calls[0][0](); // call the anonymous function

                    res.redirect.should.have.been.called.with.exactly('/login');
                });
            });
        });
    });
});
