import Ember from 'ember';
import PushPlacesMixin from '../../../mixins/push-places';
import { module, test } from 'qunit';

module('Unit | Mixin | push places');

test('it works', function(assert) {
  let PushPlacesObject = Ember.Object.extend(PushPlacesMixin);
  let subject = PushPlacesObject.create();
  assert.ok(subject);
});
