/**
 * This file is part of ng-Sir-Trevor.
 *
 * Copyright 2014 Sourcefabric z.u. and contributors.
 *
 * For the full copyright and license information, please see the
 * AUTHORS and LICENSE files distributed with this source code, or
 * at https://www.sourcefabric.org/superdesk/license
 */

(function() {


'use strict';
angular
.module('SirTrevor', [])
    .provider('SirTrevor', function() {
        this.$get = function() {
            return window.SirTrevor;
        };
        this.Blocks = window.SirTrevor.Blocks;
        this.Block = window.SirTrevor.Block;
        this.Formatters = window.SirTrevor.Formatters;
        this.Formatter = window.SirTrevor.Formatter;
        this.Locales = window.SirTrevor.Locales;
        this.DEFAULTS = window.SirTrevor.DEFAULTS;
    })
    .provider('SirTrevorOptions', function() {
        var options = {
            blockTypes: ['Text'],
            transform: {
                get: function(block) {
                    return {
                        type: block.blockStorage.type,
                        data: block.blockStorage.data
                    };
                },
                set: function(block) {
                    return {
                        type: block.type,
                        data: block.data
                    };
                }
            }
        };
        this.$get = function() {
            return options;
        };
        this.$extend = function(opts) {
            angular.extend(options, opts);
        };
        this.$set = function(opts) {
            options = opts;
        };
    })
    .directive('ngSirTrevor', ['SirTrevor', 'SirTrevorOptions', '$timeout',
            function(SirTrevor, options, $timeout) {
        var directive = {
            template: function(element, attr) {
                var str = '<textarea class="sir-trevor" name="content"></textarea>';
                // sir trevor needs a parent `form` tag.
                if (!element.parent('form').length) {
                    str = '<form>' + str + '</form>';
                }
                return str;
            },
            scope: {
                'editor': '=stEditor',
                'params': '=stParams',
                'data': '=stData',
                'alwaysCheckValidation': '=?stAlwaysValidate'
            },
            controller: ['$scope', function($scope) {
                if(!$scope.data) {
                    $scope.data = [];
                }

            }],
            link: function (scope, element, attrs) {
                var opts = angular.copy(options);
                angular.extend(opts, scope.params);
                opts.el = $(element.find('textarea'));
                scope.editor = new SirTrevor.Editor(opts);
                //HACK - Sir Trevor v0.4.3 has a breaking bug in its destroy funvtion.
                scope.editor.blocks =[];

                var writeOutput = function() {
                  $timeout( function() {
                    scope.data = scope.editor.get(scope.alwaysCheckValidation);
                  });
                };

                scope.editor.get = function(shouldValidate) {
                    var list = [];
                    // sort blocks by index.
                    scope.editor.block_manager.blocks.sort(function(a, b) {
                        return (a.$el.index() - b.$el.index());
                    });
                    angular.forEach(scope.editor.block_manager.blocks, function(block) {
                        scope.editor.validateAndSaveBlock(block, shouldValidate);
                        list.push(opts.transform.get(block));
                    });
                    return list;
                };

                scope.editor.set = function(list) {
                    var item;
                    angular.forEach(list, function(block) {
                        block = angular.copy(block);
                        item = opts.transform.set(block);
                        scope.editor.block_manager.createBlock(item.type, item.data);
                    });
                };

                scope.editor.clear = function() {
                    angular.forEach(scope.editor.block_manager.blocks, function(block) {
                        scope.editor.block_manager.removeBlock(block.blockID);
                    });

                    scope.editor.blocks = [];
                    scope.editor.reinitialize(opts);
                };

                // Add events to trigger Digest Cycle

                // Javascript/jQuery events
                scope.editor.$form.keypress(function(){scope.$digest();});
                scope.editor.$form.click(function(){scope.$digest();});
                scope.editor.$form.mousedown(function(){scope.$digest();});
                scope.editor.$form.mouseup(function(){scope.$digest();});
                scope.editor.$form.bind("cut copy paste",
                    function() {
                        $timeout( function() {
                            scope.$digest();
                        });
                    }
                );
                $(".st-format-bar").click(function(){ scope.$digest(); });

                //SirTrevor events
                SirTrevor.EventBus.on('block:create:new', function(){scope.$digest();});
                SirTrevor.EventBus.on('block:create:existing', function(){scope.$digest();});
                SirTrevor.EventBus.on('block:remove', function(){scope.$digest();});
                SirTrevor.EventBus.on('block:reorder:dropped',function(){scope.$digest();});
                SirTrevor.EventBus.on('formatter:hide', function(){scope.$digest();});
                SirTrevor.EventBus.on('formatter:position', function(){scope.$digest();});

                // Watch editor form for changes
                scope.$watch(function() {
                    return scope.editor.$form.html();
                  }, function() {
                      writeOutput();
                });

                // Initialize data
                if(angular.isArray(scope.data)) {
                  scope.editor.set(scope.data)
                }
                writeOutput();

            }
        };
        return directive;
    }]);

}());
