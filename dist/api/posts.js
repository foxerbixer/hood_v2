'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _expressAsyncRouter = require('express-async-router');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _post = require('../helpers/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (ctx) {

  var api = (0, _expressAsyncRouter.AsyncRouter)();
  var _ctx$models = ctx.models,
      Post = _ctx$models.Post,
      Profile = _ctx$models.Profile;

  //*** @api    POST api/posts
  //*** @desc   Create post
  //*** @access Private

  api.post('/', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var _validatePostInput, isValid, errors, newPost, post;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _validatePostInput = (0, _post2.default)(req.body), isValid = _validatePostInput.isValid, errors = _validatePostInput.errors;

              if (isValid) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).json(errors));

            case 4:
              newPost = new Post({
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
              });
              _context.next = 7;
              return newPost.save();

            case 7:
              post = _context.sent;

              res.json(post);

              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);

              res.status(404).json({ error: _context.t0 });

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  //*** @api    GET api/posts
  //*** @desc   Get posts
  //*** @access Public
  api.get('/', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var posts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return Post.find().sort({ date: -1 });

            case 3:
              posts = _context2.sent;

              res.json(posts);

              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);

              res.status(404).json({ error: _context2.t0 });

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());

  //*** @api    GET api/posts/:id
  //*** @desc   Get post by id
  //*** @access Public
  api.get('/:_id', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var post;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return Post.findById({ _id: req.params._id });

            case 3:
              post = _context3.sent;

              if (post) {
                res.json(post);
              }

              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3['catch'](0);

              res.status(404).json({ error: _context3.t0 });

            case 10:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 7]]);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());

  //*** @api    DELETE api/posts/:id
  //*** @desc   Delete post 
  //*** @access Private
  api.delete('/:_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var profile, post;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Profile.findOne({ user: req.user.id });

            case 3:
              profile = _context4.sent;

              if (!profile) {
                _context4.next = 15;
                break;
              }

              _context4.next = 7;
              return Post.findById({ _id: req.params._id });

            case 7:
              post = _context4.sent;

              if (!(post.user.toString() !== req.user.id)) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt('return', res.status(401).json('Not authorized'));

            case 12:
              _context4.next = 14;
              return post.remove();

            case 14:
              res.json('success');

            case 15:
              _context4.next = 20;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4['catch'](0);

              res.status(404).json({ error: _context4.t0 });

            case 20:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 17]]);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());

  //*** @api    POST api/posts/like/:id
  //*** @desc   Like post
  //*** @access Private
  api.post('/like/:_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var profile, post, updatedPost;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return Profile.findOne({ user: req.user.id });

            case 3:
              profile = _context5.sent;

              if (!profile) {
                _context5.next = 17;
                break;
              }

              _context5.next = 7;
              return Post.findById({ _id: req.params._id });

            case 7:
              post = _context5.sent;

              if (!(post.likes.filter(function (like) {
                return like.user.toString() === req.user.id;
              }).length > 0)) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt('return', res.status(400).json('You already liked it'));

            case 12:
              post.likes.unshift({ user: req.user.id });
              _context5.next = 15;
              return post.save();

            case 15:
              updatedPost = _context5.sent;

              res.json(updatedPost);

            case 17:
              _context5.next = 22;
              break;

            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5['catch'](0);

              res.status(404).json({ error: _context5.t0 });

            case 22:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[0, 19]]);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());

  //*** @api    POST api/posts/unlike/:id
  //*** @desc   Unlike post
  //*** @access Private
  api.post('/unlike/:_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
      var profile, post, updatedPost;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return Profile.findOne({ user: req.user.id });

            case 3:
              profile = _context6.sent;

              if (!profile) {
                _context6.next = 17;
                break;
              }

              _context6.next = 7;
              return Post.findById({ _id: req.params._id });

            case 7:
              post = _context6.sent;

              if (!(post.likes.filter(function (like) {
                return like.user.toString() === req.user.id;
              }).length === 0)) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt('return', res.status(404).json('You\'ve not liked it yet'));

            case 12:
              post.likes = _lodash2.default.remove(post.likes, function (item) {
                return item.user.toString() !== req.user.id;
              });
              _context6.next = 15;
              return post.save();

            case 15:
              updatedPost = _context6.sent;

              res.json(updatedPost);

            case 17:
              _context6.next = 22;
              break;

            case 19:
              _context6.prev = 19;
              _context6.t0 = _context6['catch'](0);

              res.status(404).json({ error: _context6.t0 });

            case 22:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 19]]);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());

  //*** @api    POST api/posts/comment/:_id
  //*** @desc   Add comment
  //*** @access Private
  api.post('/comment/:_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
      var _validatePostInput2, isValid, errors, post, newComment, updatedPost;

      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _validatePostInput2 = (0, _post2.default)(req.body), isValid = _validatePostInput2.isValid, errors = _validatePostInput2.errors;

              if (isValid) {
                _context7.next = 4;
                break;
              }

              return _context7.abrupt('return', res.status(400).json(errors));

            case 4:
              _context7.next = 6;
              return Post.findById({ _id: req.params._id });

            case 6:
              post = _context7.sent;

              if (!post) {
                _context7.next = 14;
                break;
              }

              newComment = {
                user: req.user.id,
                name: req.body.name,
                avatar: req.body.avatar,
                text: req.body.text
              };


              post.comments.unshift(newComment);
              _context7.next = 12;
              return post.save();

            case 12:
              updatedPost = _context7.sent;

              res.json(updatedPost);

            case 14:
              _context7.next = 19;
              break;

            case 16:
              _context7.prev = 16;
              _context7.t0 = _context7['catch'](0);

              res.status(404).json({ error: _context7.t0 });

            case 19:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, undefined, [[0, 16]]);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());

  //*** @api    DELETE api/posts/comment/:_id/:comment_id
  //*** @desc   Delete comment
  //*** @access Private
  api.delete('/comment/:_id/:comment_id', _passport2.default.authenticate('jwt', { session: false }), function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
      var post, updatedPost;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return Post.findById({ _id: req.params._id });

            case 3:
              post = _context8.sent;

              if (!(post.comments.filter(function (comment) {
                return comment._id.toString() === req.params.comment_id;
              }).length === 0)) {
                _context8.next = 8;
                break;
              }

              return _context8.abrupt('return', res.status(404).json('There\'s not comment'));

            case 8:
              post.comments = _lodash2.default.remove(post.comments, function (item) {
                return item._id.toString() !== req.params.comment_id;
              });

            case 9:
              _context8.next = 11;
              return post.save();

            case 11:
              updatedPost = _context8.sent;

              res.json(updatedPost);

              _context8.next = 18;
              break;

            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8['catch'](0);

              res.status(404).json({ error: _context8.t0 });

            case 18:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[0, 15]]);
    }));

    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());

  return api;
};