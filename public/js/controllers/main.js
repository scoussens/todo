// js/controllers/main.js
angular.module('todoController', [])
  .controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    //when landing on the page, get all todos and show them
    Todos.get()
      .success(function(data) {
        $scope.todos = data;
      });

    //when submitting the add form, send the text to the node api
    $scope.createTodo = function() {
      //validate the formData to make sure there is something there
      if(!$.isEmptyObject($scope.formData)) {
        //call the create function from our service
        Todos.create($scope.formData)
          .success(function(data) {
            $scope.formData = {}; //clear the form data once submitted
            $scope.todos = data; //show the new list of todos
          });
      }
    };

    //delete a todo after checking it
    $scope.deleteTodo = function(id) {
      Todos.delete(id)
        .success(function(data ) {
          $scope.todos = data;
        });
    };
  });
