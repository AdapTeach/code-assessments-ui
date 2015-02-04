angular.module('app', [
    'ui.router',
    'start'
])

    .config(function ($urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/start');
    });
angular.module('start.SimpleController', [
    'start.SimpleService'
])

    .controller('SimpleController', function () {
        this.instructions = 'Enter your name';
        this.user = {
            name: ''
        };
        this.instructionsAreDisplayed = function () {
            return this.user.name.length === 0;
        };
        this.greetingsAreDisplayed = function () {
            return this.user.name.length > 0;
        };
    });

angular.module('start.SimpleService', [])

    .service('SimpleService', function () {
        this.sayHello = function (name) {
            return 'Hello, ' + name;
        };
    });
angular.module('start', [
    'ui.router',
    'start.SimpleController'
])

    .config(function ($stateProvider) {
        $stateProvider.state('start', {
            url: '/start',
            templateUrl: 'start/start.tpl.html',
            controller: 'SimpleController',
            controllerAs: 'ctrl'
        });
    })

    .run(function ($http) {
        $http.get('/user')
            .success(function (data) {
                console.log(data);
            });
    });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsInN0YXJ0L1NpbXBsZUNvbnRyb2xsZXIuanMiLCJzdGFydC9TaW1wbGVTZXJ2aWNlLmpzIiwic3RhcnQvc3RhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLXNvdXJjZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ3VpLnJvdXRlcicsXG4gICAgJ3N0YXJ0J1xuXSlcblxuICAgIC5jb25maWcoZnVuY3Rpb24gKCR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvc3RhcnQnKTtcbiAgICB9KTsiLCJhbmd1bGFyLm1vZHVsZSgnc3RhcnQuU2ltcGxlQ29udHJvbGxlcicsIFtcbiAgICAnc3RhcnQuU2ltcGxlU2VydmljZSdcbl0pXG5cbiAgICAuY29udHJvbGxlcignU2ltcGxlQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnMgPSAnRW50ZXIgeW91ciBuYW1lJztcbiAgICAgICAgdGhpcy51c2VyID0ge1xuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbnNBcmVEaXNwbGF5ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyLm5hbWUubGVuZ3RoID09PSAwO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdyZWV0aW5nc0FyZURpc3BsYXllZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXIubmFtZS5sZW5ndGggPiAwO1xuICAgICAgICB9O1xuICAgIH0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ3N0YXJ0LlNpbXBsZVNlcnZpY2UnLCBbXSlcblxuICAgIC5zZXJ2aWNlKCdTaW1wbGVTZXJ2aWNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNheUhlbGxvID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnSGVsbG8sICcgKyBuYW1lO1xuICAgICAgICB9O1xuICAgIH0pOyIsImFuZ3VsYXIubW9kdWxlKCdzdGFydCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnc3RhcnQuU2ltcGxlQ29udHJvbGxlcidcbl0pXG5cbiAgICAuY29uZmlnKGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlcikge1xuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnc3RhcnQnLCB7XG4gICAgICAgICAgICB1cmw6ICcvc3RhcnQnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdzdGFydC9zdGFydC50cGwuaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnU2ltcGxlQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjdHJsJ1xuICAgICAgICB9KTtcbiAgICB9KVxuXG4gICAgLnJ1bihmdW5jdGlvbiAoJGh0dHApIHtcbiAgICAgICAgJGh0dHAuZ2V0KCcvdXNlcicpXG4gICAgICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9