Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'angular-data.DS',
    'assessment',
    'backend'
])
    .factory('AceConfig', function () {
        var AceConfig = {};

        AceConfig.java = {
            mode: 'java',
            theme: 'eclipse',
            require: ['ace/ext/language_tools'],
            advanced: {
                enableSnippets: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true
            }
        };

        return AceConfig;
    })
    .config(function ($locationProvider,$urlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/assessment/new');
    });