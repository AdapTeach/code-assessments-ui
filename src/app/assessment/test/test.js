'use strict';
/**
 * @name  TestListCtrl
 * @description Controller of the test list in the tabs
 */
function TestListCtrl($mdDialog) {
    this.edit = function ($index, $event, test) {
        $mdDialog.show({
            templateUrl: 'dialog.tpl.html',
            //targetEvent: $event,
            locals: {
                index: $index,
                test: testId
            },
            controller: 'TestDialogCtrl as test'
        }).then(function (newTest) {
            test = newTest;
        });
    };
}

/**
 * @name  TestDialogCtrl
 * @description Controller of the test detail dialog
 */
function TestDialogCtrl(testId, atTest, $mdDialog, $mdToast) {
    atTest.bindOne(this, 'data', testId);
    this.update = function () {
        atTest.save(testId, this.data).then(function (test) {
            $mdToast.show({
                template: '<md-toast>test updated</md-toast>'
            });
            $mdDialog.hide(test);
        });
    };
    this.remove = function () {
        atTest.destroy(this._id).then(function () {
            $mdToast.show({
                template: '<md-toast>test removed</md-toast>'
            });
            $mdDialog.hide();
        });
    };
}

/**
 * @name  TestCtrl
 * @description Controller of the bottomsheet of test creation
 */
function TestCtrl(atTest, $mdBottomSheet, $mdToast) {
    var self = this;
    this.save = function () {
        atTest.create(self).then(function () {
            $mdToast.show({
                template: '<md-toast>Test created</md-toast>',
                hideDelay: 3000
            });
            $mdBottomSheet.hide();
        });
    };
}

angular.module('assessment.tests',[])
    .controller('TestListCtrl', TestListCtrl)
    .controller('TestDialogCtrl', TestDialogCtrl)
    .controller('TestCtrl', TestCtrl);

