Meteor.publish('friends', () => {
  return Friends.find();
});
