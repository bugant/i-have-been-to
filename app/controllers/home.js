import Ember from 'ember';
import PushPlaces from 'i-have-been-to/mixins/push-places';

export default Ember.Controller.extend(PushPlaces, {
  fb: Ember.inject.service(),

  actions: {
    loadMore() {
      return this.pushPlaces(this.get('model'));
    }
  }
});
