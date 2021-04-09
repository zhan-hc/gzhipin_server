/* 测试 */

const md5 = require('blueimp-md5')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin_test')
const conn = mongoose.connection
conn.on('connected',function(){
  console.log('connect success')
})

const userSchema = mongoose.Schema({ // 指定文档的结构： 属性名、属性值类型
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})

const UserModel = mongoose.model('user',userSchema)

function testSave(){
  const userModel = new UserModel({username:'peter',password: md5('147'),type: 'laoban'})
  userModel.save(function(error,user){
    console.log('save',error,user)
  })
}
testSave()

function testFind () {
  UserModel.find(function (error, users) {
    console.log('find',error,users)
  })
  UserModel.findOne({_id:'606f1c425c90264f8c5a8cfc'},function(error,user) {
    console.log('findOne',error,user)
  })
}
// testFind()

function testUpdate () {
  UserModel.findByIdAndUpdate({_id:'606f1c425c90264f8c5a8cfc'},
  {username:'jack'},function (error,oldUser) {
    console.log('findByIdAndUpdate',error,oldUser)
  })
}

// testUpdate()

function testDelete () {
  UserModel.remove({_id:'606fbaecb45ac11ec03ae464'},function (error,status) {
    console.log('remove',error,status) // {n:1/0,ok:1,deletedCount:1-n}
  })
}

// testDelete()