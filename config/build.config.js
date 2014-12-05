var pkg = require('../package.json')

module.exports = {
  port: 5000,
  livereloadport : 35729,
  dist: 'dist',
  base: 'src',
  tpl: 'src/app/**/**/*.tpl.html',
  mainScss : 'src/scss/main.scss',
  scss: ['src/scss/**/*.scss','src/app/**/**/*.scss'],
  js: 'src/app/**/**/*.js',
  index: 'src/index.html',
  assets: 'src/assets/**',
  images: 'src/assets/images/**/*',
  fonts : ['src/vendor/ionicons/fonts/*','src/vendor/font-awesome/font/*'],
  buildName : 'all-source.js',
  build : 'src/build',
  module : 'app',
  header: ['/**',
    ' * '+pkg.name+' - '+pkg.description,
    ' * @version v '+ pkg.version,
    ' * @link '+pkg.homepage,
    ' * @license '+pkg.license,
    ' */',
    '(function(angular,document) {\'use strict\';\n'
  ].join('\n'),
  footer: '\n})(angular, document);\n'
};
