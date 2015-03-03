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

      var scope, element;

      beforeEach((inject(function($compile, $rootScope){
        scope = $rootScope.$new();
        scope.model = {};
        scope.options = {
          blockTypes: [
            "text"
          ]
        };
        var elementHtml = '<ng-sir-trevor st-model="model" st-params="options">';
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
        expect(element.children().children()[0].id).to.eql(scope.model.ID);
      });

      it('should have get, set and clear functions on the editor', function() {
        expect(angular.isFunction(scope.model.get)).to.be.ok;
        expect(angular.isArray(scope.model.get())).to.be.ok;
        expect(scope.model.get()).to.eql([]);

        var data =[{type:"text",data:{text:"Test Text"}}];

        expect(angular.isFunction(scope.model.set)).to.be.ok;
        scope.model.set(data);
        var outputData = scope.model.get();
        outputData.forEach(function(outputBlock, index) {
          expect(outputBlock.type).to.eql(data[index].type);
          expect(outputBlock.data).to.eql(data[index].data);

        });


        expect(angular.isFunction(scope.model.clear)).to.be.ok;
        scope.model.clear();
        expect(scope.model.get()).to.eql([]);


      });

    });

});
