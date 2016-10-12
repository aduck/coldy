var mongoose=require('mongoose')
var articleSchema=require('../schemas/article')
// 新建模型
var Article=mongoose.model('Article',articleSchema,'articles')

module.exports=Article