var express = require('express');
var Article = require('../models/article')
var router = express.Router();

/* 添加新文章 */
router.route('/postArticle')
.get(function(req,res,next){
	res.render('admin/add_article',{
		pretty:' ',
		title:'添加文章',
		cates:['生活','技术','碎语']
	})
})
.post(function(req,res,next){
	var title=req.body.title
	var author=req.body.author
	var category=req.body.category
	var content=req.body.content
	var article=new Article({
		title:title,
		author:author,
		category:category,
		content:content
	})
	article.save(function(err){
		if(err){
			console.log(err)
		}else{
			console.log('添加成功')
			res.redirect('/admin/articles')
		}
	})
})

/* 获取文章列表 */
router.get('/articles',function(req,res,next){
	Article.find({}).exec(function(err,articles){
		if(err){
			console.log(err)
		}else{
			res.render('admin/list_article',{
				'title':'文章列表',
				articles:articles,
				pretty:' '
			})
		}
	})
})

/* 删除文章 */
router.get('/removeArticle/:id',function(req,res){
	var id=req.params.id
	Article.remove({'_id':id}).exec(function(err){
		if(err){
			console.log(err)
		}else{
			console.log('删除成功')
			res.redirect('/admin/articles')
		}
	})
})


/* 更新文章 */
router.get('/upArticle/:id',function(req,res,next){
	var id=req.params.id
	Article.findById(id).exec(function(err,article){
		if(err){
			console.log(err)
		}else{
			res.render('admin/update_article',{
				title:'修改文章',
				article:article,
				cates:['生活','技术','碎语'],
				pretty:' '
			})
		}
	})
})

router.post('/upArticle',function(req,res){
	var id=req.body.article_id
	var title=req.body.title
	var author=req.body.author
	var category=req.body.category
	var content=req.body.content
	Article.update({'_id':id},{$set:{title:title,author:author,category:category,content:content}}).exec(function(err){
		if(err){
			console.log(err)
		}else{
			console.log('修改成功')
			res.redirect('/admin/articles')
		}
	})
})

module.exports = router;
