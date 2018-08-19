Router.route('/project/:_id', {
  name: 'project',
  onBeforeAction: function() {
    if (! Meteor.userId()) {
      this.render('home');
    } else {
      Session.set("currentProjectId", this.params._id);
      this.next();
    }
  }
  });

Router.route('/', {name: 'viewProjects'});

Router.route('/logout', function () {

  accountsUIBootstrap3.logoutCallback = function(error) {
    if(error) console.log("Error:" + error);
    Router.go('home');
  }
});

Router.onBeforeAction(function() {
  if (! Meteor.userId()) {
    this.render('home');
  } else {
    this.next();
  }
});
