angular.module('nodelist', ['node', 'nodes']).
  config(function($routeProvider) {
    $routeProvider.
      when('/', {controller:ListCtrl, templateUrl:'http://local/d7_dev/angular/nodes/list'}).
      otherwise({redirectTo:'/'});
  });


function ListCtrl($scope, Nodes, Node) {
  var currentClass = this.constructor.name;
  // Set defaule values.
  if (!Drupal.settings.angularjs.hasOwnProperty(currentClass)) {
    return;
  }

  var values = Drupal.settings.angularjs[currentClass];
  angular.forEach(values, function(value, key) {
    $scope[key] = value;
  });

  $scope.promote = function(node, newValue) {
    var update = new Node();
    update.promote = newValue;
    update.nid = node.nid;
    update.update();
    node.promote = newValue;
  }

  $scope.$watch('nodeType', function(newValue, oldValue) {
    if ('' != newValue.seleted) {
      $scope.nodes = Nodes.get({limit: 25, type:newValue.selected});
    }
  });
}
