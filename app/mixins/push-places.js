import Ember from 'ember';

export default Ember.Mixin.create({
  pushPlaces(model) {
    var url = '/me/tagged_places';
    var paging = model.get('rawResponse.paging.cursors.after');

    if (paging) {
      url = `${url}?after=${paging}`;
    }

    return this.get('fb').api(url).then(function(response) {
      model.set('places', (model.get('places') || []).concat(response.data));
      model.set('rawResponse', response);
      model.set('hasNext', Ember.get(response, 'paging.next'));
      return model;
    });
  }
});
