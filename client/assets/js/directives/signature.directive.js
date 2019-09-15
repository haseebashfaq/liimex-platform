
/*
* This Directive is called using format-date
* and is used to format the date types from Strings into Date Objects
*/


angular.module('application').directive("signaturePad", ['$interval', '$timeout', '$window', function($interval, $timeout, $window) {

  var signaturePad, element,
EMPTY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjgAAADcCAQAAADXNhPAAAACIklEQVR42u3UIQEAAAzDsM+/6UsYG0okFDQHMBIJAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcCQADAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMB8BwAMMBDAfAcADDATAcwHAAwwEwHMBwAAwHMBzAcAAMBzAcAMMBDAcwHADDAQwHwHAAwwEMB8BwAMMBMBzAcADDkQAwHMBwAAwHMBwAwwEMBzAcAMMBDAfAcADDAQwHwHAAwwEwHMBwAMMBMBzAcAAMBzAcwHAADAcwHADDAQwHMBwAwwEMB8BwAMMBMBzAcADDATAcwHAADAcwHMBwAAwHMBwAwwEMBzAcAMMBDAegeayZAN3dLgwnAAAAAElFTkSuQmCC';

  return {
    restrict: 'EA',
    replace: true,
    template: '<div class="signature" style="width: 100%; max-width:{{width}}px; height: 100%; max-height:{{height}}px;"><canvas style="display: block; margin: 0 auto;" ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
    scope: {
      accept: '=?',
      clear: '=?',
      dataurl: '=',
      height: '@',
      width: '@',
      notifyDrawing: '&onDrawing'
    },
    controller: [
      '$scope',
      function ($scope) {
        $scope.accept = function () {
          $scope.$parent.$parent.$parent.$parent.dataurl = $scope.dataurl;
          return {
            isEmpty: $scope.dataurl === EMPTY_IMAGE,
            dataUrl: $scope.dataurl
          };
        };

        $scope.onMouseup = function () {
          $scope.updateModel();

          // Notify that drawing has ended
          $scope.notifyDrawing({drawing: false});
        };

        $scope.updateModel = function () {

          /*
           Defer handling mouseup event until $scope.signaturePad handles
           first the same event
           */
          $timeout().then(() => {
            $scope.dataurl = $scope.signaturePad.isEmpty() ? EMPTY_IMAGE : $scope.signaturePad.toDataURL("image/jpeg",100);
          });
        };

        $scope.clear = function () {
          $scope.signaturePad.clear();
          $scope.dataurl = EMPTY_IMAGE;
        };

        $scope.$watch("dataurl", dataUrl => {
          if (!dataUrl || $scope.signaturePad.toDataURL("image/jpeg",100) === dataUrl) {
            return;
          }

          $scope.setDataUrl(dataUrl);
          console.log('data url changed from watch')
          $scope.bangra +="ok"
        });
      }
    ],
    link: function (scope, element, attrs) {
      var canvas = element.find('canvas')[0];
      var parent = canvas.parentElement;
      var scale = 0;
      var ctx = canvas.getContext('2d');

      var width = parseInt(scope.width, 10);
      var height = parseInt(scope.height, 10);

      canvas.width = width;
      canvas.height = height;

      scope.signaturePad = new SignaturePad(canvas,{
        backgroundColor:'rgba(255,255,255,1)'
      });

      scope.setDataUrl = function(dataUrl) {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(ratio, ratio);

        scope.signaturePad.clear();
        scope.signaturePad.fromDataURL(dataUrl);

        $timeout().then(() => {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.scale(1 / scale, 1 / scale);
        });
      };

      var calculateScale = function() {
        var scaleWidth = Math.min(parent.clientWidth / width, 1);
        var scaleHeight = Math.min(parent.clientHeight / height, 1);

        var newScale = Math.min(scaleWidth, scaleHeight);

        if (newScale === scale) {
          return;
        }

        var newWidth = width * newScale;
        var newHeight = height * newScale;
        canvas.style.height = Math.round(newHeight) + "px";
        canvas.style.width = Math.round(newWidth) + "px";

        scale = newScale;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / scale, 1 / scale);
      };

      var resizeIH = $interval(calculateScale, 200);
      scope.$on('$destroy', () => {
        $interval.cancel(resizeIH);
        resizeIH = null;
      });

      angular.element($window).bind('resize', calculateScale);
      scope.$on('$destroy', () => {
        angular.element($window).unbind('resize', calculateScale);
      });

      calculateScale();

      element.on('touchstart', onTouchstart);
      element.on('touchend', onTouchend);

      function onTouchstart() {
        scope.$apply(() => {
          // Notify that drawing has started
          scope.notifyDrawing({drawing: true});
        });
      }

      function onTouchend() {
        scope.$apply(() => {
          // UpdateModel
          scope.updateModel();

          // Notify that drawing has ended
          scope.notifyDrawing({drawing: false});
        });
      }
    }
  };
}]);
angular.module('ngSignaturePad', ['application']);
