Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

angular.module('app', [
    'ngMaterial',
    'ui.router',
    'ui.ace',
    'assessment',
    'backend'
])
    .constant('BACKEND_URL', 'http://127.0.0.1:5011')
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