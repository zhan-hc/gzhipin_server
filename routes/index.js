var express = require('express');
var router = express.Router();
const {UserModel} = require('../db/models')
const md5 = require('blueimp-md5')
const filter = {password: 0} // 查询时过滤指定属性
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 注册
router.post('/register', function(req, res) {
  const {username, password,type} = req.body
  // const userModel = new UserModel({username:username,password: md5(password),type: type})
  UserModel.findOne({username},function(err,user) {
    if (user) {
      res.send({ code: 1, msg: '此用户已存在'});
    } else {
      new UserModel({username, type, password: md5(password)}).save(function(error,user) {
        // res.cookie('userid',user._id,{maxAge: 1000*60*60*24*7})
        const data = {username, type, _id: user._id}
        res.send({ code: 0, data: data});
      })

    }
  })
});
// 登录
router.post('/login', function(req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)},filter,function(err,user) {
    if (user) {
      res.cookie('userid',user._id,{maxAge: 1000*60*60*24})
      res.send({ code: 0, data: user});
    } else {
        res.send({ code: 1, msg: '用户名或密码错误'});
    }
  })
})
module.exports = router;
