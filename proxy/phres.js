var EventProxy = require('eventproxy');
var _ = require('lodash');

var PhRes = require('../models').PhRes;

/**
 * 根据消息Id获取消息
 * Callback:
 * - err, 数据库错误
 * - message, 消息对象
 * @param {String} id 消息ID
 * @param {Function} callback 回调函数
 */
exports.getPhResById = function (id, callback) {
  PhRes.findOne({_id: id}, function (err, message) {
    if (err) {
      return callback(err);
    }
  });
};

exports.getAllPhRes = function (condition, options, callback) {
    PhRes.find(condition, '', options, function (err, phres) {
      //console.log("getAllPhRes()->phres:-------********************************" + phres);
        return callback(null, phres);

    });
};