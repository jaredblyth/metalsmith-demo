var metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var templates   = require('metalsmith-templates');
var assets      = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var permalinks  = require('metalsmith-permalinks');
var more        = require('metalsmith-more');
var paginate    = require('metalsmith-paginate');

var taxonomy    = require('./plugins/taxonomy.js');
var feeds       = require('./plugins/feeds');

console.log('* Starting build');

metalsmith(__dirname)
  .metadata({
    helpers: {
      moment: require('moment')
    },
    site: {
      date: new Date(),
      title: 'Static Shock',
      author: 'Dream Team',
      description: 'A static site about static shocks',
      keywords: 'metalsmith, static, site, shocks',
      link: 'http://no-such-domain.exists'
    }
  })
  .use(collections({
    posts: {
      pattern: 'posts/*',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(paginate({
    perPage: 2,
    path: '/blog/page'
  }))
  .use(markdown())
  .use(more())
  .use(taxonomy({
    collections: ['posts']
  }))
  .use(feeds({
    collections: ['posts'],
    taxonomy: true
  }))
  .use(permalinks({
    pattern: '/:collection/:date/:title'
  }))
  .use(templates('jade'))
  .use(assets({
    source: './public', // relative to __dirname
    destination: './' // Root of the build directory
  }))
  .build(function(err, files) {
    if (err) {
      console.error('- Build failed');
      throw err;
    }
    console.log('* Build successful');
    console.log('+ File(s): ' + Object.keys(files).length);
    console.log('+ Time: ' + process.uptime().toFixed(3) + ' seconds');
  });