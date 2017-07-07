var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', async (req, res, next) => {
  var articles = await Article.find()
  console.log(articles)
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: articles
  });

});
