var app=angular.module('PtModule',[]);

app.controller('DashboardController',['$scope','$http',function($scope,$http){
    $scope.accessToken='';
	//crawl data from graph api to populate the database
	//make http call to get top 5 friends who visited more places
	//set to the graph data object
	//render the highchart graph
   $scope.updateStatus="Click To Update";
   $scope.updateClicked=false;
   $scope.friendsCount=0;
   
   $scope.updateData=function(){
      $scope.updateClicked=true;
	  $scope.updateStatus="Updating";
	  $http.get('/crawlFriendsData').success(function(response,code){
	      $scope.friendsCount=response.count;
		  $scope.updateClicked=false;
	      $scope.updateStatus="Click To Update";
	 }); 
   }    
}]);

