var requirePath = '../../../app/';

var chai = require('chai'); // test suite
var spies = require('chai-spies'); // spies plugin
var blueprint = require ('@onehilltech/blueprint');
var request = require('superagent');
var RegisterController = require(requirePath + 'controllers/RegisterController');

// configure test suite
chai.use(spies);
var assert = chai.assert;
var should = chai.should();
var spy = chai.spy;

// copy external objects that we are going to modify
var _request = Object.assign({}, request);

// "gloabal" variables used throughout tests
var controller, req, res, post, send, end, user;

describe('RegisterController', function() {
    // describe('Class'...)
    // Test are for the specified "class"
    beforeEach(function() {
        // Specifies a function to run before each test (it)
        // Only affects tests in this describe ('RegisterController')
        // and nested describes ('constructor', 'completeSignUp', etc.)
        // Use this to setup things that will be used in most of the affected tests
        // (usually the "global" variables)
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
        // override post with a spy so that it doesn't actually try to send data
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
        // describe('methodName'...)
        // Test a method of the "class"
        it('returns a function', function() {
            // it('does this thing'...)
            // A single test for the described function ('completeSignUp')
            controller.completeSignUp().should.be.a('function');
        });

        describe('returned function', function() {
            // describe('innerMethod'...)
            // Since this function ('completeSignUp') returns a function
            // we want to test the returned function as well
            it('posts the user to the api', function() {
                // it('does this thing'...)
                // a test for the inner describe ('returned function')
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
                // describe('innerMethod'...)
                // The containing funciton ('returned function') passes an
                // ananymous function as a callback so we need to test it
                var completeSignUp;

                beforeEach(function() {
                    // Sppecifies a function to run before each test (it)
                    // Only affects test in this describe and nested describes
                    // Used to set up things that will be used in affected tests
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

// restore modified external objects
Object.assign(request, _request);
