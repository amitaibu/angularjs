angular.module('nodelist', ['node', 'nodes']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'http://local/d7_dev/angular/nodes/list'}).
      otherwise({redirectTo:'/'});
  });


function ListCtrl($scope, Nodes, Node) {
  $scope.nodetype = '';
  $scope.nodes = Nodes.get({limit: 25});
  $scope.query = {'title': 'Dolo'};

  $scope.promote = function(node, newValue) {
    var update = new Node();
    update.promote = newValue;
    update.nid = node.nid;
    update.update();
    node.promote = newValue;
  }

  $scope.$watch('nodetype', function(newValue, oldValue) {
    if ('' != newValue) {
      $scope.nodes = Nodes.get({limit: 25, type: newValue});
    }
  });
}
