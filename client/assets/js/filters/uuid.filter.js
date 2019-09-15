angular.module('application').filter('uuid', ['uuid2', function(uuid2) {
  return function() {
    return uuid2.newuuid();
  };
}]);
