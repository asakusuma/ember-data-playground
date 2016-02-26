import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('members', { path: '/members/:member_id' });
  this.route('companies', { path: '/companies/:company_id' });
});

export default Router;
