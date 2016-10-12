var mongoose=require('mongoose')
// 新建schema
var articleSchema=new mongoose.Schema({
	title:String,
	author:String,
	//tag:Array,
	category:String,
	content:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		},
		votes:{
			type:Number,
			default:0
		},
		views:{
			type:Number,
			default:0
		}
	}	
})

articleSchema.pre('save',function(next){
	this.meta.createAt=this.meta.updateAt=Date.now()
	next()
})
articleSchema.pre('update',function(next){
	this.update({$set:{'meta.updateAt':Date.now()}})
	next()
})

module.exports=articleSchema