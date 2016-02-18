import Ember from 'ember';
import RoutesFbLoginStatusMixin from 'i-have-been-to/mixins/routes/fb-login-status';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/fb login status');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesFbLoginStatusObject = Ember.Object.extend(RoutesFbLoginStatusMixin);
  let subject = RoutesFbLoginStatusObject.create();
  assert.ok(subject);
});
