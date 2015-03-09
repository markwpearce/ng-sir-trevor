angular.module('SirTrevorExample', ['SirTrevor'])
  .controller('ExampleController', ['SirTrevor', '$timeout', function(SirTrevor, $timeout){

    var ctrl = this;

    ctrl.editor = {};
    ctrl.options = {
      blockTypes: [
        "Heading",
        "Text",
        "List",
        "Quote",
        "Image",
        "Video",
        "Tweet"
      ]
    };
    ctrl.sirTrevorData = [{
      type: "heading",
      data: {
        text: "Hello! This is a doubly-bound Sir Trevor editor! Awesome."
      }
    }];

    ctrl.originalData = angular.copy(ctrl.sirTrevorData);

    ctrl.clear = function() {
      $timeout(function() {
        ctrl.editor.clear();
      });
    };

    ctrl.reset = function() {
      $timeout(function() {
        ctrl.editor.clear();
        ctrl.editor.set(ctrl.originalData);
      });
    };

 }]);
