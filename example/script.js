angular.module('SirTrevorExample', ['SirTrevor'])
  .controller('ExampleController', ['SirTrevor', '$scope', function(SirTrevor, $scope){

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

 }]);
