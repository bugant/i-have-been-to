import Ember from 'ember';
import FbCheckLogin from 'i-have-been-to/mixins/routes/fb-check-login';

export default Ember.Route.extend(FbCheckLogin, {
  setupController: function(controller, model) {
    var route = this;
    this._super(controller, model);
    window.checkLoginState = function() {
      route.checkLoginStatus();
    };
  }
});
