
Template.nav.helpers({
  isInProject: function() {
    return (Meteor.user() !== null) && (Iron.Location.get().path.includes('project/'));
  }
});

Template.viewProjects.helpers({
  ProjectList: function(){
      return Projects.find();
    }
});

Template.eachProjectInList.helpers({
  formatTimestamp: function(timestamp){
     return moment(timestamp).calendar();
  }
});

Template.project.helpers({
  currentProject: function() {
    return Projects.findOne({_id:Session.get('currentProjectId')});
  },
  widgets: function(){
    return Widgets.find();
  },
  grid: function(){
    return Grid.find();
  },
  tags: function(){
    return Tags.find();
  },
  currentProjectPages: function() {
    return Pages.find({projectId: Session.get('currentProjectId')});
  },

});


Template.project.onCreated(function () {
  $('body').removeClass('loaded');
  this.subscribe('projects',
    function() {
      $('body').addClass('loaded');
      $('body').addClass('builder');
      $('.edit-button').hide();
      setTimeout(function(){
          $('#content').removeClass('hidden');
      }, 1000);
    }
  );
});

Template.project.onRendered(function (){
  $('.widget').tooltip();
});

Template.eachPageInList.onRendered(function (){
    if (!$('.page-item').hasClass('active')) {
      var item = $('.page-item:first');
      item.trigger('click');
      Session.set('currentPage',item.attr('id'));
    }
});

Template.page.helpers({
  currentPage: function() {
    return Pages.findOne({_id: Session.get('currentPage')});
  },
  attributes: function() { console.log('se llama');
    return {
      class: 'node',
      style: {background: 'blue'}
    };
  },
});
