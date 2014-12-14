'use strict';

/**
 * @name  testConfig
 * @description Configuration of the tests list
 */

function testConfig($stateProvider) {
    $stateProvider
        .state('assessment.edit.tests', {
            url: '/tests',
            resolve: {
                list: function (Restangular, $stateParams) {
                    return Restangular
                        .one('assessment', $stateParams.id)
                        .getList('test');
                }
            },
            views: {
                assessmentTab: {
                    templateUrl: 'assessment/edit/tests/list.tpl.html',
                    controller: 'TestListCtrl as tests'
                }
            }
        });
}


/**
 * @name  TestistCtrl
 * @description Controller of the test list in the tabs
 */
function TestListCtrl($mdToast, list, $mdDialog, Restangular, $stateParams) {

    var self = this;

    this.list = list;

    this.dialog = function (event, test, index) {
        $mdDialog
            .show({
                templateUrl: 'assessment/edit/tests/dialog.tpl.html',
                controller: 'TestCtrl as test',
                targetEvent: event,
                locals: {
                    data: test || {assertions: []}
                }
            })
            .then(function (response) {
                if (response.type === 'creation') {
                    self.list.push(response.data);
                    $mdToast.show({
                        template: '<md-toast>Test created</md-toast>'
                    });
                } else {
                    self.list[index] = response.data;
                    $mdToast.show({
                        template: '<md-toast>Test updated</md-toast>'
                    });
                }

            });
    };
    this.remove = function (event, testId, index) {
        var confirm = $mdDialog
            .confirm()
            .title('Confirm suppression ?')
            .ariaLabel('suppression dialog')
            .ok('Remove')
            .cancel('Cancel')
            .targetEvent(event);

        $mdDialog.show(confirm)
            .then(Restangular
                .one('assessment', $stateParams.id)
                .one('test', testId)
                .remove()
        )
            .then(function () {
                self.list.splice(index, 1);
                $mdToast.show({
                    template: '<md-toast>test removed !</md-toast>'
                });
            });
    };
}

/**
 * @name  TestCtrl
 * @description Controller of the dialog of test edition
 */
function TestCtrl(data, $stateParams, Restangular, $mdDialog) {
    var self = this;

    this.data = Restangular.copy(data);

    this.save = function () {
        if (self.data._id) {
            self.data
                .put()
                .then(function (updatedGuide) {
                    $mdDialog.hide({
                        type: 'update',
                        data: updatedGuide
                    });
                });
        } else {
            Restangular
                .one('assessment', $stateParams.id)
                .all('test')
                .post(self.data)
                .then(function (createdGuide) {
                    $mdDialog.hide({
                        type: 'creation',
                        data: createdGuide
                    });
                });
        }
    };

    this.cancel = function () {
        $mdDialog.cancel();
    };

    this.updateAssertion = function (index, value) {
        self.data.assertions[index] = value;
    };

    this.removeAssertion = function (index) {
        self.data.assertions.splice(index, 1);
    };

    this.addAssertion = function () {
        self.data.assertions.push('');
    };
}

angular.module('assessment.edit.tests', [])
    .config(testConfig)
    .controller('TestListCtrl', TestListCtrl)
    .controller('TestCtrl', TestCtrl);
