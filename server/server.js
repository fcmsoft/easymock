Projects = new Meteor.Collection('projects');
Pages = new Meteor.Collection('pages');
Nodes = new Meteor.Collection('nodes');

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

Meteor.publish('nodes', function() {
  //mejorar  q no levante todo de una?
   var cursor = Nodes.find();
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
  addWidgetToPage: function(projectId, pageId, storeNode){
    storeNode.pageId = pageId;
    Nodes.insert(storeNode);

    Projects.update({_id:projectId},
     {$set: {
       lastDate: new Date
     }});
  },

  updateNode: function(projectId, node){
    Nodes.update(
      { _id: node._id },
      { $set: node }
    );
    Projects.update({_id:projectId},
     {$set: {
       lastDate: new Date
     }});
  },

  removeNode: function(projectId, nodeId) {
    Nodes.remove(nodeId);
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
    console.log('update project');
    Projects.update({_id:projectId }, {$set: projectData} );
  },

  removePage: function(projectId, idPage) {
    Pages.remove(idPage);
    Projects.update({_id:projectId},
     {$set: {
       lastDate: new Date
     }});
  }

});
