import Ember from 'ember';
import FbCheckLogin from 'i-have-been-to/mixins/routes/fb-check-login';

export default Ember.Route.extend(FbCheckLogin, {
  beforeModel: function() {
    return this.checkLoginStatus();
  }
});
