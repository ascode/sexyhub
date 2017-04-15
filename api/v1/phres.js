var models       = require('../../models');
var PhResModel   = models.PhRes;
var PhResProxy   = require('../../proxy').PhRes;
var config       = require('../../config');
var eventproxy   = require('eventproxy');
var _            = require('lodash');
var at           = require('../../common/at');
var renderHelper = require('../../common/render_helper');

var index = function (req, res, next) {
  var page     = parseInt(req.query.page, 10) || 1;
  page         = page > 0 ? page : 1;
  var limit    = Number(req.query.limit) || config.list_topic_count;
  var mdrender = req.query.mdrender === 'false' ? false : true;

  var query = {};
//   if (tab && tab !== 'all') {
//     if (tab === 'good') {
//       query.good = true;
//     } else {
//       query.tab = tab;
//     }
//   }
  //query.deleted = false;
  var options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'};

  var ep = new eventproxy();
  ep.fail(next);

  PhResModel.find(query, '', options, ep.done('PhRes'));

  ep.all('PhRes', function (phres) {
      res.send({success: true, data: phres});
    // phres.forEach(function (topic) {
    //   UserModel.findById(topic.author_id, ep.done(function (author) {
    //     if (mdrender) {
    //       topic.content = renderHelper.markdown(at.linkUsers(topic.content));
    //     }
    //     topic.author = _.pick(author, ['loginname', 'avatar_url']);
    //     ep.emit('author');
    //   }));
    // });

    // ep.after('author', topics.length, function () {
    //   topics = topics.map(function (topic) {
    //     return _.pick(topic, ['id', 'author_id', 'tab', 'content', 'title', 'last_reply_at',
    //       'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author']);
    //   });

    //   res.send({success: true, data: topics});
    // });
  });
};

exports.index = index;

// var show = function (req, res, next) {
//   var topicId  = String(req.params.id);

//   var mdrender = req.query.mdrender === 'false' ? false : true;
//   var ep       = new eventproxy();

//   if (!validator.isMongoId(topicId)) {
//     res.status(400);
//     return res.send({success: false, error_msg: '不是有效的话题id'});
//   }

//   ep.fail(next);

//   TopicProxy.getFullTopic(topicId, ep.done(function (msg, topic, author, replies) {
//     if (!topic) {
//       res.status(404);
//       return res.send({success: false, error_msg: '话题不存在'});
//     }
//     topic = _.pick(topic, ['id', 'author_id', 'tab', 'content', 'title', 'last_reply_at',
//       'good', 'top', 'reply_count', 'visit_count', 'create_at', 'author']);

//     if (mdrender) {
//       topic.content = renderHelper.markdown(at.linkUsers(topic.content));
//     }
//     topic.author = _.pick(author, ['loginname', 'avatar_url']);

//     topic.replies = replies.map(function (reply) {
//       if (mdrender) {
//         reply.content = renderHelper.markdown(at.linkUsers(reply.content));
//       }
//       reply.author = _.pick(reply.author, ['loginname', 'avatar_url']);
//       reply =  _.pick(reply, ['id', 'author', 'content', 'ups', 'create_at', 'reply_id']);
//       reply.reply_id = reply.reply_id || null;

//       if (reply.ups && req.user && reply.ups.indexOf(req.user.id) != -1) {
//         reply.is_uped = true;
//       } else {
//         reply.is_uped = false;
//       }

//       return reply;
//     });

//     ep.emit('full_topic', topic)
//   }));


//   if (!req.user) {
//     ep.emitLater('is_collect', null)
//   } else {
//     TopicCollect.getTopicCollect(req.user._id, topicId, ep.done('is_collect'))
//   }

//   ep.all('full_topic', 'is_collect', function (full_topic, is_collect) {
//     full_topic.is_collect = !!is_collect;

//     res.send({success: true, data: full_topic});
//   })

// };

// exports.show = show;
