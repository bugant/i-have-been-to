import Ember from 'ember';
import FB from 'ember-cli-facebook-js-sdk/fb';

export default Ember.Route.extend({
  model: function() {
    var model = Ember.Object.create();
    model.set('places', Ember.A());
    return this._pushPlaces(model);
  },

  _pushPlaces: function(routeModel) {
    var model = routeModel || this.currentModel;
    var url = '/me/tagged_places';
    var paging = model.get('rawResponse.paging.cursors.after');

    if (paging) {
      url = url + '?after=%@'.fmt(paging);
    }

    return FB.api(url).then(function(response) {
      model.set('places', model.get('places').concat(response.data));
      model.set('rawResponse', response);
      model.set('hasNext', Ember.get(response, 'paging.next'));
      return model;
    });
  },

  actions: {
    loadMore: function() {
      this._pushPlaces();
    }
  }
});
