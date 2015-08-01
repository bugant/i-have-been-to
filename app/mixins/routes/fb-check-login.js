import Ember from 'ember';
import FB from 'ember-cli-facebook-js-sdk/fb';

export default Ember.Mixin.create({
  checkLoginStatus: function() {
    var route = this;
    return FB.getLoginStatus().then(function(response) {
      if (response.status === 'connected') {
        route.transitionTo('home');
      } else {
        route.transitionTo('fb-login');
      }
    }).catch(function() {
      route.transitionTo('fb-login');
    });
  }
});
