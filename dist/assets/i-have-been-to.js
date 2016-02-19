"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('i-have-been-to/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'i-have-been-to/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _iHaveBeenToConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _iHaveBeenToConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _iHaveBeenToConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _iHaveBeenToConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('i-have-been-to/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'i-have-been-to/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _iHaveBeenToConfigEnvironment) {

  var name = _iHaveBeenToConfigEnvironment['default'].APP.name;
  var version = _iHaveBeenToConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('i-have-been-to/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('i-have-been-to/controllers/home', ['exports', 'ember', 'i-have-been-to/mixins/push-places'], function (exports, _ember, _iHaveBeenToMixinsPushPlaces) {
  exports['default'] = _ember['default'].Controller.extend(_iHaveBeenToMixinsPushPlaces['default'], {
    fb: _ember['default'].inject.service(),

    actions: {
      loadMore: function loadMore() {
        return this.pushPlaces(this.get('model'));
      }
    }
  });
});
define('i-have-been-to/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('i-have-been-to/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'i-have-been-to/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _iHaveBeenToConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_iHaveBeenToConfigEnvironment['default'].APP.name, _iHaveBeenToConfigEnvironment['default'].APP.version)
  };
});
define('i-have-been-to/initializers/export-application-global', ['exports', 'ember', 'i-have-been-to/config/environment'], function (exports, _ember, _iHaveBeenToConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_iHaveBeenToConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _iHaveBeenToConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_iHaveBeenToConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('i-have-been-to/mixins/push-places', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    pushPlaces: function pushPlaces(model) {
      var url = '/me/tagged_places';
      var paging = model.get('rawResponse.paging.cursors.after');

      if (paging) {
        url = url + '?after=' + paging;
      }

      return this.get('fb').api(url).then(function (response) {
        model.set('places', (model.get('places') || []).concat(response.data));
        model.set('rawResponse', response);
        model.set('hasNext', _ember['default'].get(response, 'paging.next'));
        return model;
      });
    }
  });
});
define('i-have-been-to/mixins/routes/fb-login-status', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Mixin.create({
    checkLoginStatus: function checkLoginStatus() {
      var _this = this;

      return this.get('fb').getLoginStatus().then(function (response) {
        if (response.status === 'connected') {
          _this.transitionTo('home');
        } else {
          _this.transitionTo('fb-login');
        }
      })['catch'](function () {
        _this.transitionTo('fb-login');
      });
    }
  });
});
define('i-have-been-to/router', ['exports', 'ember', 'i-have-been-to/config/environment'], function (exports, _ember, _iHaveBeenToConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _iHaveBeenToConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('fb-login', { path: '/' });
    this.route('home');
  });

  exports['default'] = Router;
});
define('i-have-been-to/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    fb: _ember['default'].inject.service(),

    beforeModel: function beforeModel() {
      var _this = this;

      return this.get('fb').getLoginStatus().then(function (response) {
        if (response.status === 'connected') {
          var fbToken = response.authResponse.accessToken;
          _this.get('fb').setAccessToken(fbToken);
          _this.transitionTo('home');
        } else {
          _this.transitionTo('fb-login');
        }
      });
    }
  });
});
define('i-have-been-to/routes/fb-login', ['exports', 'ember', 'i-have-been-to/mixins/routes/fb-login-status'], function (exports, _ember, _iHaveBeenToMixinsRoutesFbLoginStatus) {
  exports['default'] = _ember['default'].Route.extend(_iHaveBeenToMixinsRoutesFbLoginStatus['default'], {
    fb: _ember['default'].inject.service(),

    beforeModel: function beforeModel() {
      var _this = this;

      window.checkLoginState = function () {
        _this.checkLoginStatus();
      };
    }
  });
});
define('i-have-been-to/routes/home', ['exports', 'ember', 'i-have-been-to/mixins/push-places'], function (exports, _ember, _iHaveBeenToMixinsPushPlaces) {
  exports['default'] = _ember['default'].Route.extend(_iHaveBeenToMixinsPushPlaces['default'], {
    fb: _ember['default'].inject.service(),

    model: function model() {
      var model = _ember['default'].Object.create();
      model.set('places', _ember['default'].A());
      return this.pushPlaces(model);
    }
  });
});
define('i-have-been-to/services/fb', ['exports', 'ember-cli-facebook-js-sdk/services/fb'], function (exports, _emberCliFacebookJsSdkServicesFb) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliFacebookJsSdkServicesFb['default'];
    }
  });
});
define("i-have-been-to/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "i-have-been-to/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "col-sm-6 col-sm-offset-3");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        dom.setAttribute(el4, "id", "title");
        var el5 = dom.createTextNode("I have been to...");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 3, 3);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [8, 0], [8, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("i-have-been-to/templates/fb-login", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "i-have-been-to/templates/fb-login.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "col-sm-6 col-sm-offset-3");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "fb-login-button");
        dom.setAttribute(el3, "data-max-rows", "1");
        dom.setAttribute(el3, "data-size", "xlarge");
        dom.setAttribute(el3, "data-show-faces", "false");
        dom.setAttribute(el3, "data-auto-logout-link", "false");
        dom.setAttribute(el3, "onlogin", "checkLoginState();");
        dom.setAttribute(el3, "scope", "public_profile,email,user_tagged_places");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("i-have-been-to/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@1.13.11",
            "loc": {
              "source": null,
              "start": {
                "line": 11,
                "column": 12
              },
              "end": {
                "line": 13,
                "column": 12
              }
            },
            "moduleName": "i-have-been-to/templates/home.hbs"
          },
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(",\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "place.place.location.street", ["loc", [null, [12, 14], [12, 45]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 19,
              "column": 2
            }
          },
          "moduleName": "i-have-been-to/templates/home.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "col-sm-3");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "card");
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "card-block");
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("h4");
          dom.setAttribute(el4, "class", "card-title");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("div");
          dom.setAttribute(el4, "class", "card-text");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n        ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "card-block");
          var el4 = dom.createTextNode("\n          ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("p");
          dom.setAttribute(el4, "class", "card-text");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("            ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode(" ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3, 1]);
          var morphs = new Array(5);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [3]), 0, 0);
          morphs[2] = dom.createMorphAt(element3, 1, 1);
          morphs[3] = dom.createMorphAt(element3, 3, 3);
          morphs[4] = dom.createMorphAt(element3, 5, 5);
          return morphs;
        },
        statements: [["content", "place.place.name", ["loc", [null, [6, 33], [6, 53]]]], ["content", "place.created_time", ["loc", [null, [7, 33], [7, 55]]]], ["block", "if", [["get", "place.place.location.street", ["loc", [null, [11, 18], [11, 45]]]]], [], 0, null, ["loc", [null, [11, 12], [13, 19]]]], ["content", "place.place.location.city", ["loc", [null, [14, 12], [14, 41]]]], ["content", "place.place.location.country", ["loc", [null, [14, 42], [14, 74]]]]],
        locals: ["place"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 22,
              "column": 0
            },
            "end": {
              "line": 24,
              "column": 0
            }
          },
          "moduleName": "i-have-been-to/templates/home.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode("More places");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["loadMore"], [], ["loc", [null, [23, 10], [23, 31]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "i-have-been-to/templates/home.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "model.places", ["loc", [null, [2, 10], [2, 22]]]]], [], 0, null, ["loc", [null, [2, 2], [19, 11]]]], ["block", "if", [["get", "model.hasNext", ["loc", [null, [22, 6], [22, 19]]]]], [], 1, null, ["loc", [null, [22, 0], [24, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('i-have-been-to/config/environment', ['ember'], function(Ember) {
  var prefix = 'i-have-been-to';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("i-have-been-to/app")["default"].create({"name":"i-have-been-to","version":"0.0.0+27dd024f"});
}

/* jshint ignore:end */
//# sourceMappingURL=i-have-been-to.map