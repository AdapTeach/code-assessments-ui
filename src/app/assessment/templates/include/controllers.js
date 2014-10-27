angular.module('assessment')
    .controller('GuidesCtrl',function($atAssessment){

        this.save = function($index,guide){

        };

        this.remove = function($index){
            $atAssessment.removeGuide($index)
        };

        this.up = function(index,guide){

        };

        this.down = function(index,guide){

        };
    })
    .controller('TipsCtrl',function($atAssessment){
        this.save = function(tip){

        };

        this.remove = function(tip){

        };
    })