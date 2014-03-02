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
          link: function ($scope, $element, $attrs, ngModel) {
            $timeout(function () {
              $scope.$watch($attrs.ngModel, function () {
                $element.iCheck('update');
              });

              if (!$attrs.ngICheckCheckboxClass) {
                $attrs.$set('ngICheckCheckboxClass', 'icheckbox_square-blue');
              }

              if (!$attrs.ngICheckRadioClass) {
                $attrs.$set('ngICheckRadioClass', 'iradio_square-blue');
              }

              $element.iCheck({
                checkboxClass: $attrs.ngICheckCheckboxClass,
                radioClass: $attrs.ngICheckRadioClass
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
