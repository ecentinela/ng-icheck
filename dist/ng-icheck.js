/**!
 * AngularJS iCheck directive
 * @author Javier Martínez <ecentinela@gmail.com>
 * @version 0.1.0
 */

/* global angular, iCheck */

(function () {
  'use strict';

  angular.module('ngICheck', []).directive(
    'ngICheck',
    [
      '$timeout',
      function ($timeout) {
        return {
          require: 'ngModel',
          link: function ($scope, $element, $attrs) {
            $timeout(function () {
              $element = $(element);

              $scope.$watch($attrs.ngModel, function () {
                $element.iCheck('update');
              });

              $element.iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue'
              }).on('ifChanged', function (event) {
                if ($attrs.ngModel) {
                  switch ($element.attr('type')) {
                    case 'checkbox':
                      $scope.$apply(function () {
                        ngModel.$setViewValue(event.target.checked);
                      });

                      break;

                    case 'radio':
                      $scope.$apply(function () {
                        ngModel.$setViewValue(event.target.checked ? $attrs.value : null);
                      });

                      break;
                  }
                }
              });
            });
          }
        };
      }
    ]
  );

})();
