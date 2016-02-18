import Ember from 'ember';

export default Ember.Route.extend({
  fb: Ember.inject.service(),

  beforeModel() {
    return this.get('fb').getLoginStatus().then((response) => {
      if (response.status === 'connected') {
        let fbToken = response.authResponse.accessToken;
        this.get('fb').setAccessToken(fbToken);
        localStorage.setItem('fbToken', fbToken);
      } else {
        this.transitionTo('fb-login');
      }
    });
  }
});
