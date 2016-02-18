import Ember from 'ember';
import FBLoginStatus from 'i-have-been-to/mixins/routes/fb-login-status';

export default Ember.Route.extend(FBLoginStatus, {
  fb: Ember.inject.service(),

  beforeModel() {
    window.checkLoginState = () => {
      this.checkLoginStatus();
    };
  }
});
