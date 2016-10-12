var express = require('express');
var router = express.Router();
var Article=require('../models/article')
var moment=require('moment')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/article/:id',function(req,res){
	var id=req.params.id
	Article.findByIdAndUpdate(id,{$inc:{'meta.views':1}}).exec(function(err,article){
		res.locals.time=moment(article.meta.updateAt).format('L')
		res.render('article',{
			article:article,
			pretty:' '
		})
	})
})

module.exports = router;
