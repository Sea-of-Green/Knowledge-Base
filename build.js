var Metalsmith    = require('metalsmith');
var sitemap       = require('metalsmith-mapsite');
var feed          = require('metalsmith-feed');
var defaultValues = require('metalsmith-default-values');
// HTML
var layouts       = require('metalsmith-layouts');
var drafts        = require('metalsmith-drafts');
var snippet       = require('metalsmith-snippet');
var markdown      = require('metalsmith-markdown');
var permalinks    = require('metalsmith-permalinks');
var collections   = require('metalsmith-collections');
var pagination    = require('metalsmith-pagination');
var tags          = require('metalsmith-tags');
// CSS
var sass          = require('metalsmith-sass');
var prefix        = require('metalsmith-autoprefixer');
var bourbon       = require('node-neat').includePaths;
// JS
var uglify        = require('metalsmith-uglify');
// IMAGES
var imagemin      = require('metalsmith-imagemin');

Metalsmith(__dirname)
  .source('source')
  .destination('_build')
  .metadata({
    title: 'Sea of Green Knowledge Base',
    description: 'Knowledge Base for Sea of Green articles regarding gardening tips, techniques, and product recommendations.',
    keywords: 'sea of green, gardens, gardening, hydro, hydroponics, hydroponic'
  })
  // CSS
  .use(sass({
    includePaths: bourbon,
    outputStyle: 'compressed',
    outputDir: 'css/'
  }))
  .use(prefix())
  // JS
  .use(uglify({
    concat: 'js/main.js',
    removeOriginal: true
    }))
  // IMAGES
  .use(imagemin())
  // HTML
  .use(drafts())
  .use(collections({
    blog: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    },
    pages: {
      pattern: '*.md'
    }
  }))
  // Set default values
  .use(defaultValues([
    {
      pattern: 'blog/**/*.md',
      defaults: {
        layout: 'post.jade'
      }
    }
  ]))
  .use(pagination({
    'collections.blog': {
      perPage: 10,
      layout: 'blog.jade',
      first: 'blog/index.html',
      noPageOne: true,
      path: 'blog/page/:num/index.html',
      pageMetadata: {
        title: 'Blog'
      }
    }
  }))
  .use(markdown({
    gfm: true,
    smartypants: true,
    tables: true
  }))
  .use(snippet({
    maxLength: 140
  }))
  .use(permalinks({
    pattern: ':collection/:title',
    relative: false,
    linksets: [{
      match: { collection: 'pages' },
      pattern: ':title',
    }]
  }))
  .use(tags({
    handle: 'tags',
    path:'tagged/:tag/index.html',
    pathPage: "tagged/:tag/:num/index.html",
    perPage: 10,
    layout: 'tag.jade',
    sortBy: 'date',
    reverse: true
  }))
  .use(layouts({
    engine: 'jade',
    moment: require('moment'),
    directory: 'templates',
    default: 'default.jade',
    pattern: '**/*.html'
  }))
  .use(sitemap('http://kb.sea-of-green.com'))
  .use(feed({collection: 'blog'}))
  .build(function(err) {
    if (err) throw err;
  });
