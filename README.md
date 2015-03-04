ng-sir-trevor
=============
Sir Trevor Angular services and directive,
to work better with [SirTrevor](https://madebymany.github.io/sir-trevor-js/) in an AngularJS enviroment.


## Install

Via bower command.

```
bower install ng-sir-trevor
```

Now add ng-sir-trevor script and dependency to your index.html page

```
<!-- dependecy.js -->
<link rel="stylesheet" href="bower_components/sir-trevor/sir-trevor-icons.css" type="text/css" media="screen" title="no title" charset="utf-8">
<link rel="stylesheet" href="bower_components/sir-trevor/sir-trevor.css" type="text/css" media="screen" title="no title" charset="utf-8">

<script type="text/javascript" src="bower_components/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="bower_components/Eventable/eventable.js"></script>
<script type="text/javascript" src="bower_components/underscore/underscore-min.js"></script>
<script type="text/javascript" src="bower_components/sir-trevor/sir-trevor.min.js"></script>

<!-- ng-sir-trevor.js -->
<script type="text/javascript" src="bower_components/ng-sir-trevor-js/dist/ng-sir-trevor.min.js"></script>

```

For requirejs configuration

```
require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'underscore': 'bower_components/underscore/underscore',
        'angular': 'bower_components/angular/angular',
        'eventable': 'bower_components/Eventable/eventable',
        'sir-trevor': 'bower_components/sir-trevor/sir-trevor',
        'ng-sir-trevor': 'bower_components/ng-sir-trevor/dist/ng-sir-trevor',
    },
    shim: {
        jquery: {exports: 'jQuery'},

        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },

        'sir-trevor': {
            deps: ['jquery', 'eventable', 'lodash'],
            exports: 'SirTrevor'
        },

        'ng-sir-trevor': {
            deps: ['sir-trevor', 'angular']
        }
    }
});
```

For browserify-shim configuration

```
"browserify-shim": {
    "jquery": {
        "exports": "global.$"
      },
    "angular": {
      "depends": ["jquery"],
      "exports": "global.angular"
    },
    "underscore": {
     "exports": "global._"
    },
    "sir-trevor-js": {
      "depends": ["jquery", "Eventable", "underscore", "es5-shim", "es6-shim"],
      "exports": "SirTrevor"
    },
    "ng-sir-trevor": {
      "depends": ["jquery", "sir-trevor-js"]
    }
  }
```

## Usage

To use ngSirTrevor in your code, use:

``` html
<form>
  <ng-sir-trevor st-editor="editor" st-params="options" st-data="sirTrevorData" st-always-validate="false">
  </ng-sir-trevor>
</form>
```

where:

- **st-editor** becomes the [SirTrevor.Editor](https://github.com/madebymany/sir-trevor-js/blob/master/src/editor.js) object for this instance ()
- **st-params**: are the [configuration options](https://madebymany.github.io/sir-trevor-js/docs.html#2) for this editor
- **st-data**: is both the initialization data for this editor, and the data-bound current content of the editor. This will be an array that will be updated automatically as the content of the Sir Trevor editor changes. It is the array data found [here](https://madebymany.github.io/sir-trevor-js/docs.html#1-3)
- **st-always-validate**: will cause the editor to continuously show validation errors

### Editor Object

The editor object will have three extra functions available:

- **clear()**: Clears the content of the editor
- **set(<list>)**: Add this content to the editor. <list> is the array of data
- **get(<validate>)**: Get the content of the editor. <validate> is true if you want it to validate the content. The format is teh same as the data found [here](https://madebymany.github.io/sir-trevor-js/docs.html#1-3)


## Development

Build and test:

```
gulp
```

Serve project - serves base directory. Go to http://localhost:8080/example for example
```
gulp serve
```

Serve & watch for changes - serves base directory, will rebuild & test when files change
```
gulp watch
```
