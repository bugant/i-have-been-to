import Ember from 'ember';

export default Ember.Mixin.create({
  checkLoginStatus() {
    return this.get('fb').getLoginStatus().then((response) => {
      if (response.status === 'connected') {
        localStorage.setItem('fbToken', response.authResponse.accessToken);
        this.transitionTo('home');
      } else {
        this.transitionTo('fb-login');
      }
    }).catch(() => {
      this.transitionTo('fb-login');
    });
  }
});
