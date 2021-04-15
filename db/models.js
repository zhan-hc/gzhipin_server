const md5 = require('blueimp-md5')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin')
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

// 定义 chats 集合的文档结构
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // 发送用户的 id
  to: {type: String, required: true}, // 接收用户的 id
  chat_id: {type: String, required: true}, // from 和 to 组成的字符串
  content: {type: String, required: true}, // 内容
  read: {type:Boolean, default: false}, // 标识是否已读
  create_time: {type: Number} // 创建时间
})
// 定义能操作 chats 集合数据的 Model
const ChatModel = mongoose.model('chat', chatSchema)
// 向外暴露 Model
exports.ChatModel = ChatModel