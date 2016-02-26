import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      members: this.store.peekAll('member')
    };
  }
});
