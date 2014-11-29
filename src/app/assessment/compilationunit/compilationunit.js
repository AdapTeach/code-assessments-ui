'use strict';

/**
 * @name  TestListCtrl
 * @description Controller of the test list in the tabs
 */
function CompilationUnitListCtrl($mdDialog) {
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
 * @name  CompilationUnitDialogCtrl
 * @description Controller of the compilation unit detail dialog
 */
function CompilationUnitDialogCtrl(testId, $mdDialog, $mdToast) {
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
 * @name  CompilationUnitCtrl
 * @description Controller of the bottomsheet of compilation unit creation
 */
function CompilationUnitCtrl($mdBottomSheet, $mdToast) {
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

angular.module('assessment.compilation',[])
    .controller('CompilationUnitListCtrl', CompilationUnitListCtrl)
    .controller('CompilationUnitDialogCtrl', CompilationUnitDialogCtrl)
    .controller('CompilationUnitCtrl', CompilationUnitCtrl);

