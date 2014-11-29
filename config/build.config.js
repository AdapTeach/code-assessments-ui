'use strict';

//basic configuration object used by gulp tasks
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
  buildName : 'all-source.js',
  build : 'src/build',
  module : 'app',
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};
