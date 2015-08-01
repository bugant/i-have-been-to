import FB from 'ember-cli-facebook-js-sdk/fb';

export default {
  name: 'fb',
  initialize: function() {
    return FB.init({
      appId: '1476146572701176',
      version: 'v2.4',
      xfbml: true
    });
  }
};
