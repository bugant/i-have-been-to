define('i-have-been-to/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('i-have-been-to/tests/controllers/home.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers');
  QUnit.test('controllers/home.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/home.js should pass jshint.');
  });
});
define('i-have-been-to/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('i-have-been-to/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('i-have-been-to/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'i-have-been-to/tests/helpers/start-app', 'i-have-been-to/tests/helpers/destroy-app'], function (exports, _qunit, _iHaveBeenToTestsHelpersStartApp, _iHaveBeenToTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _iHaveBeenToTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _iHaveBeenToTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('i-have-been-to/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('i-have-been-to/tests/helpers/resolver', ['exports', 'ember/resolver', 'i-have-been-to/config/environment'], function (exports, _emberResolver, _iHaveBeenToConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _iHaveBeenToConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _iHaveBeenToConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('i-have-been-to/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('i-have-been-to/tests/helpers/start-app', ['exports', 'ember', 'i-have-been-to/app', 'i-have-been-to/config/environment'], function (exports, _ember, _iHaveBeenToApp, _iHaveBeenToConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _iHaveBeenToConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _iHaveBeenToApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('i-have-been-to/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('i-have-been-to/tests/mixins/push-places.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins');
  QUnit.test('mixins/push-places.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/push-places.js should pass jshint.');
  });
});
define('i-have-been-to/tests/mixins/routes/fb-login-status.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/routes');
  QUnit.test('mixins/routes/fb-login-status.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/routes/fb-login-status.js should pass jshint.');
  });
});
define('i-have-been-to/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('i-have-been-to/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass jshint.');
  });
});
define('i-have-been-to/tests/routes/fb-login.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/fb-login.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/fb-login.js should pass jshint.');
  });
});
define('i-have-been-to/tests/routes/home.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/home.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/home.js should pass jshint.');
  });
});
define('i-have-been-to/tests/test-helper', ['exports', 'i-have-been-to/tests/helpers/resolver', 'ember-qunit'], function (exports, _iHaveBeenToTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_iHaveBeenToTestsHelpersResolver['default']);
});
define('i-have-been-to/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('i-have-been-to/tests/unit/controllers/home-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:home', 'Unit | Controller | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('i-have-been-to/tests/unit/controllers/home-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers');
  QUnit.test('unit/controllers/home-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/home-test.js should pass jshint.');
  });
});
define('i-have-been-to/tests/unit/mixins/push-places-test', ['exports', 'ember', 'i-have-been-to/mixins/push-places', 'qunit'], function (exports, _ember, _iHaveBeenToMixinsPushPlaces, _qunit) {

  (0, _qunit.module)('Unit | Mixin | push places');

  (0, _qunit.test)('it works', function (assert) {
    var PushPlacesObject = _ember['default'].Object.extend(_iHaveBeenToMixinsPushPlaces['default']);
    var subject = PushPlacesObject.create();
    assert.ok(subject);
  });

  tests('pushPlaces', function (assert) {
    assert.expect(1);

    var PushPlacesObject = _ember['default'].Object.extend(_iHaveBeenToMixinsPushPlaces['default'], {
      fb: {
        api: function api(path) {
          assert.ok(path.match('/me/tagged_places'), 'get places from Facebook');
          return _ember['default'].RSVP.resolve(['foo']);
        }
      }
    });

    var subject = PushPlacesObject.create();
    subject.pushPlaces(_ember['default'].Object.create());
  });
});
define('i-have-been-to/tests/unit/mixins/push-places-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/mixins');
  QUnit.test('unit/mixins/push-places-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'unit/mixins/push-places-test.js should pass jshint.\nunit/mixins/push-places-test.js: line 28, col 3, Missing semicolon.\nunit/mixins/push-places-test.js: line 13, col 1, \'tests\' is not defined.\n\n2 errors');
  });
});
define('i-have-been-to/tests/unit/mixins/routes/fb-login-status-test', ['exports', 'ember', 'i-have-been-to/tests/mixins/routes/fb-login-status', 'qunit'], function (exports, _ember, _iHaveBeenToTestsMixinsRoutesFbLoginStatus, _qunit) {

  (0, _qunit.module)('Unit | Mixin | routes/fb login status');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var RoutesFbLoginStatusObject = _ember['default'].Object.extend(_iHaveBeenToTestsMixinsRoutesFbLoginStatus['default']);
    var subject = RoutesFbLoginStatusObject.create();
    assert.ok(subject);
  });
});
define('i-have-been-to/tests/unit/mixins/routes/fb-login-status-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/mixins/routes');
  QUnit.test('unit/mixins/routes/fb-login-status-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/mixins/routes/fb-login-status-test.js should pass jshint.');
  });
});
define('i-have-been-to/tests/unit/routes/fb-login-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:fb-login', 'Unit | Route | fb login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('i-have-been-to/tests/unit/routes/fb-login-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/fb-login-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/fb-login-test.js should pass jshint.');
  });
});
define('i-have-been-to/tests/unit/routes/home-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:home', 'Unit | Route | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('i-have-been-to/tests/unit/routes/home-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/home-test.js should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/home-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('i-have-been-to/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map