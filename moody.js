Marks = new Mongo.Collection("marks")

if (Meteor.isClient) {
  Session.set("lastMood", null);

  Template.body.helpers({
    moods: [
      { type: "bad", image: "bad.png" },
      { type: "ok", image: "ok.png" },
      { type: "happy", image: "happy.png" },
    ],
  });

  Template.mood.helpers({
    displayStyle: function() {
      return (!Session.get("lastMood") || Session.get("lastMood").type === this.type) ? "block" : "none";
    }
  });

  Template.body.events({
    'click .mood': function () {
      if (Session.get("lastMood")) {
        return;
      }
      console.log("saving:", this.type)
      Session.set("lastMood", this)
      Meteor.setTimeout(function() {
        Session.set("lastMood", null)
      }, 5000)
      Marks.insert( { mood: this.type, timestamp: new Date(), owner: Meteor.userId() } )
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
