import Ember from 'ember';
import PushPlaces from 'i-have-been-to/mixins/push-places';

export default Ember.Route.extend(PushPlaces, {
  fb: Ember.inject.service(),

  model() {
    let model = Ember.Object.create();
    model.set('places', Ember.A());
    return this.pushPlaces(model);
  }
});
