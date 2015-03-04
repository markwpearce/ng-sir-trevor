'use strict';

describe('', function() {

    beforeEach(module('SirTrevor'));

    it('can get an instance of SirTrevor', inject(function(SirTrevor) {
        expect(SirTrevor).to.be.ok;
    }));

    it('can get an instance of SirTrevorOptions', inject(function(SirTrevorOptions) {
        expect(SirTrevorOptions).to.be.ok;
    }));

    describe('ng-sir-trevor directive', function() {

      var scope, element, $timeout;

      beforeEach((inject(function($compile, $rootScope, _$timeout_){
        scope = $rootScope.$new();
        $timeout = _$timeout_;
        scope.editor = {};
        scope.options = {
          blockTypes: [
            "Text"
          ]
        };
        var elementHtml = '<ng-sir-trevor st-editor="editor" st-params="options" st-data="output">';
        element = $compile(elementHtml)(scope);
        scope.$digest();
      })));

      it('should compile properly', function() {
        expect(element).to.be.ok;
      });

      it('should be a form', function() {
        expect(element).to.be.ok;
        expect(element.children()[0].tagName.toLowerCase()).to.eql('form');
      });

      it('should create a sir trevor editor bound to scope', function() {
        expect(element).to.be.ok;
        expect(element.children().children()[0].id).to.eql(scope.editor.ID);
      });

      it('should have get, set and clear functions on the editor', function() {
        expect(angular.isFunction(scope.editor.get)).to.be.ok;
        expect(angular.isArray(scope.editor.get())).to.be.ok;
        expect(scope.editor.get()).to.eql([]);

        var data =[{type:"text",data:{text:"Test Text"}}];

        expect(angular.isFunction(scope.editor.set)).to.be.ok;
        scope.editor.set(data);
        var outputData = scope.editor.get();
        expect(outputData.length).to.eql(1);
        outputData.forEach(function(outputBlock, index) {
          expect(outputBlock.type).to.eql(data[index].type);
          expect(outputBlock.data).to.eql(data[index].data);
        });
        expect(angular.isFunction(scope.editor.clear)).to.be.ok;
        scope.editor.clear();
        expect(scope.editor.get()).to.eql([]);
      });

      it('should bind to ng-model attribute', function() {
        expect(scope.output.length).to.eql(0);
        var data =[{type:"text",data:{text:"Test Text"}}];
        scope.editor.set(data);
        scope.$digest();
        $timeout.flush();
        expect(scope.output.length).to.eql(1);
      });

    });

});
