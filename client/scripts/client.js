var myApp = angular.module('myApp', []);

myApp.controller("FirstController", ["$scope", "DataService", function($scope, DataService){
  $scope.postData = DataService.postData;
}]);

myApp.controller("SecondController", ["$scope", "DataService", function($scope, DataService){
  DataService.getData();
  $scope.messageObject = DataService.messageObject;
}]);

myApp.factory('DataService', ['$http', function($http){
  var messageObject = {
    messages: []
  };

  var getData = function(){
    $http.get('/messages').then(function(response){
      messageObject.messages = angular.copy(response.data);
    });
  };

  function postData(message){
    $http.post('/messages', message).then(getData());
  }

  return {
    messageObject : messageObject,
    getData  : getData,
    postData : postData
  };
}]);
