angular.module('nodelist', ['node', 'nodes']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'http://local:8888/d7_dev/angular/nodes/list'}).
      otherwise({redirectTo:'/'});
  });


function ListCtrl($scope, Nodes, Node) {
  var currentClass = this.constructor.name;
  // Set defaule values.
  if (!Drupal.settings.angularjs.hasOwnProperty(currentClass)) {
    return;
  }

  var values = Drupal.settings.angularjs[currentClass];
  console.log(values);

  angular.forEach(values, function(value, key) {
    if (value._type == 'select') {
      $scope[key] = value;
    }
  });

  console.log($scope);

  //$scope.nodes = Nodes.get({limit: 25});
  // Set default search value.
  //$scope.query = {'title': 'Dolo'};

  $scope.promote = function(node, newValue) {
    var update = new Node();
    update.promote = newValue;
    update.nid = node.nid;
    update.update();
    node.promote = newValue;
  }

  $scope.$watch('nodeType', function(newValue, oldValue) {
    if ('' != newValue) {
      $scope.nodes = Nodes.get({limit: 25, type: newValue});
    }
  });
}
