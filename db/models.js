const md5 = require('blueimp-md5')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin_test')
const conn = mongoose.connection
conn.on('connected',function(){
  console.log('db connect success!')
})
// 定义特定集合model
const userSchema = mongoose.Schema({ // 指定文档的结构： 属性名、属性值类型
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  avatar: {type: String}, // 头像
  post: {type: String}, // 职位
  info: {type: String}, // 个人、职位简介
  company: {type: String}, // 公司
 salary: {type: String} // 工资
})

const UserModel = mongoose.model('user',userSchema)

exports.UserModel = UserModel