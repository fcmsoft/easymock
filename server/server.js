Projects = new Meteor.Collection('projects');
Pages = new Meteor.Collection('pages');
Specification = new Meteor.Collection('specification');
ContentTags = new Meteor.Collection('tags');

Meteor.publish('projects', function() {
   var cursor = Projects.find({userId: this.userId},{pages: false});
   this.ready();
   return cursor;
});

Meteor.publish('pages', function() {
  //mejorar  q no levante todo de una?
   var cursor = Pages.find();
   this.ready();
   return cursor;
});

Meteor.publish('specification', function() {
   var cursor = Specification.find();
   this.ready();
   return cursor;
});

Meteor.publish('tags', function() {
   var cursor = ContentTags.find();
   this.ready();
   return cursor;
});

Meteor.methods({
  addPage: function(projectId, pageName){
    var newPage = {
      projectId: projectId,
      name: pageName,
      content: ''
    }
    Pages.insert(newPage);
    Projects.update({_id:projectId},
     {$set: {
       lastDate: new Date
     }});
  },
  updatePage: function(projectId, pageId, pageName){
    Pages.update({_id:pageId}, {$set:
      { name: pageName }} );

    Projects.update({_id:projectId},
       {$set: {
         lastDate: new Date
     }});
  },
  updatePageContent: function(projectId, pageId, content){
    Pages.update({_id:pageId}, {$set:
      { content: content }} );

    Projects.update({_id:projectId},
       {$set: {
         lastDate: new Date
     }});
  },

  removeProject: function(idP) {
    Projects.remove(idP);
  },

  addProject: function(newProject) {
    Projects.insert(newProject);
  },

  editProject: function(projectId, projectData){
    Projects.update({_id:projectId }, {$set: projectData} );
  },

  removePage: function(projectId, idPage) {
    Pages.remove(idPage);
    Projects.update({_id:projectId},
     {$set: {
       lastDate: new Date
     }});
  },
  addAction: function(projectId, newAction) {
    // add action if not exist any action for that elem 
    // otherwise update it
    var existe = Specification.findOne({page: newAction.page, project: newAction.project, el: newAction.el});
    
    existe ? 
      Specification.update(
        {page: newAction.page, project: newAction.project, el: newAction.el},
        {$set: {
          element: newAction.element,
          event: newAction.event,
          operation: newAction.operation
          }
        }) : 
      Specification.insert(newAction);
    Projects.update({_id:projectId},
       {$set: {
         lastDate: new Date
     }});
   },
   addTag: function(projectId, newTag) {
  // add content tag if not exist any for that elem 
    // otherwise update it
    var existe = ContentTags.findOne({page: newTag.page, project: newTag.project, el: newTag.el});
    
    existe ? 
      ContentTags.update(
        {page: newTag.page, project: newTag.project, el: newTag.el},
        {$set: {
          tag: newTag.tag,
          }
        }) : 
    ContentTags.insert(newTag);
    Projects.update({_id:projectId},
       {$set: {
         lastDate: new Date
     }});
   },
});
