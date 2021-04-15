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
  UserModel.findOne({username},function(err,user) {
    if (user) {
      res.send({ code: 1, msg: '此用户已存在'});
    } else {
      new UserModel({username, type, password: md5(password)}).save(function(error,user) {
        res.cookie('userid',user._id,{maxAge: 1000*60*60*24})
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
// 用户信息完善
router.post('/update', function(req, res) {
  console.log(req.cookies)
  const userid = req.cookies.userid
  if (!userid) { // 如果没有, 说明没有登陆, 直接返回提示
    return res.send({code: 1, msg: '请先登陆'})
  }
  UserModel.findByIdAndUpdate({_id: userid}, req.body, function(err,user) {
    if (!user) {
      res.clearCookie('userid')
      return res.send({code: 1, msg: '请先登陆'})
    } else {
      const {_id,username,type} = user
      const data = Object.assign(req.body, {_id, username, type})
      res.send({ code: 0, data: data});
    }
  })
})
// 获取对应的user
router.get('/user', function(req, res) {
  const userid = req.cookies.userid
  if(!userid) {
  return res.send({code: 1, msg: '请先登陆'})
  }
  // 查询对应的 user
  UserModel.findOne({_id: userid}, filter, function (err, user) {
  return res.send({code: 0, data: user})
  })
})
// 获取对应的userList
router.get('/userList', function(req, res) {
  const {type} = req.query
  UserModel.find({type},function (err, users) {
    if (!users) {
      return res.send({code: 1, data: '暂无数据'})
    } else {
      return res.send({code: 0, data: users})
    }
  })
})
module.exports = router;
