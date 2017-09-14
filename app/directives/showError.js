app.directive('showError',[function(){
    return {
        restrict: 'E',
        templateUrl:'/directives/showError.html',
        scope:{
            formControl: '=',
            fieldLabel: '@'
        }
    }
}]);