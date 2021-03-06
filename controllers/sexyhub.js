/*!
 * nodeclub - site index controller.
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * Copyright(c) 2012 muyuan
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var PhRes         = require('../proxy').PhRes;
var config       = require('../config');
var eventproxy   = require('eventproxy');
var cache        = require('../common/cache');
var xmlbuilder   = require('xmlbuilder');
var renderHelper = require('../common/render_helper');
var _            = require('lodash');

exports.index = function (req, res, next) {
  var page = parseInt(req.query.page, 10) || 1;
  page = page > 0 ? page : 1;
  var tab = req.query.tab || 'all';

  var proxy = new eventproxy();
  proxy.fail(next);

  // 取主题
  var query = {};
//   if (!tab || tab === 'all') {
//     query.tab = {$ne: 'job'}
//   } else {
//     if (tab === 'good') {
//       query.good = true;
//     } else {
//       query.tab = tab;
//     }
//   }

  var limit = config.list_topic_count;
  var options = { skip: (page - 1) * limit, limit: limit, sort: '-create_at'};
  options = { skip: 0, limit: 500, sort: {'_id':-1}};

//   Topic.getTopicsByQuery(query, options, proxy.done('topics', function (topics) {
//     return topics;
//   }));

//   PhRes.getAllPhRes(query, options, proxy.done('phres', function(info,phres){
//       console.log("in getAllPhRes->phres:-------********************************" + phres);
//       return phres;
//   }));

  PhRes.getAllPhRes(query, options, function(info,phres){
      res.render('sexyhub/index', {
        phres: phres
      });
  });

//   // 取排行榜上的用户
//   cache.get('tops', proxy.done(function (tops) {
//     if (tops) {
//       proxy.emit('tops', tops);
//     } else {
//       User.getUsersByQuery(
//         {is_block: false},
//         { limit: 10, sort: '-score'},
//         proxy.done('tops', function (tops) {
//           cache.set('tops', tops, 60 * 1);
//           return tops;
//         })
//       );
//     }
//   }));
//   // END 取排行榜上的用户

//   // 取0回复的主题
//   cache.get('no_reply_topics', proxy.done(function (no_reply_topics) {
//     if (no_reply_topics) {
//       proxy.emit('no_reply_topics', no_reply_topics);
//     } else {
//       Topic.getTopicsByQuery(
//         { reply_count: 0, tab: {$ne: 'job'}},
//         { limit: 5, sort: '-create_at'},
//         proxy.done('no_reply_topics', function (no_reply_topics) {
//           cache.set('no_reply_topics', no_reply_topics, 60 * 1);
//           return no_reply_topics;
//         }));
//     }
//   }));
//   // END 取0回复的主题

//   // 取分页数据
//   var pagesCacheKey = JSON.stringify(query) + 'pages';
//   cache.get(pagesCacheKey, proxy.done(function (pages) {
//     if (pages) {
//       proxy.emit('pages', pages);
//     } else {
//       Topic.getCountByQuery(query, proxy.done(function (all_topics_count) {
//         var pages = Math.ceil(all_topics_count / limit);
//         cache.set(pagesCacheKey, pages, 60 * 1);
//         proxy.emit('pages', pages);
//       }));
//     }
//   }));
//   // END 取分页数据

  proxy.all('phres',
    function (phres) {
        //console.log("in controller->phres:-------********************************" + phres);
      res.render('sexyhub/index', {
        phres: phres
      });
    });
};