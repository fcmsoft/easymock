
Template.eachProjectInList.events({
    'click .edit-project': function (e, tpl) {
        e.preventDefault();
        showModal(Template.editProjectModal, $('.container-fluid'), this);
    },
    'click .remove-project': function (e, tpl) {
      e.preventDefault();
      $('.idP').val(this._id);
      $('.delete-modal').modal('show');
    }
});

Template.viewProjects.events({
    'click .yes-remove-project': function (e, tpl) {
      var idP =$('.delete-modal .idP').val();
      Meteor.call('removeProject', idP);
      $('.delete-modal').modal('hide');
    },
    'click .no-remove-project': function (e, tpl) {
      $('.delete-modal').modal('hide');
    },
    'submit #create-project': function (e, tpl) {
      e.preventDefault();

      var name = tpl.find('.projectName').value,
          detail = tpl.find('.projectDetail').value,
          userId = Meteor.userId(),
          date = new Date,
          pages = [{ name: 'pag1', nodes:[]}],
          newProject = { name: name, detail: detail, userId: userId, lastDate: date, pages: pages};

      Meteor.call('addProject', newProject);
      $('#new-project-modal').modal('hide');
    },
    'click .save-edit-project': function (e, tpl) {
      e.preventDefault();

      var name = tpl.find('.projectName').value,
          detail = tpl.find('.projectDetail').value,
          date = new Date,
          project = { name: name, detail: detail, lastDate: date};

      Meteor.call('editProject', this._id, project);
      $('#new-project-modal').modal('hide');
    },
});

Template.project.events({
  'click .preview-button': function(e, tpl) {
    $('body').addClass('preview');
    $('.preview-button').hide();
    $('.edit-button').show();
  },
  'click .edit-button': function(e, tpl) {
    $('body').removeClass('preview');
    $('.preview-button').show();
    $('.edit-button').hide();
  },
  'click .save-page': function (e, tpl) {
      e.preventDefault();
      var name = tpl.find('.pageName').value,
          projectId = Session.get("currentProjectId");
      //Pages.insert({ name: name, projectId: projectId});
      Meteor.call('addPage', projectId, name);

      $('#new-page-modal').modal('hide');
  },

  'click .save-edit-page': function (e, tpl) {
        e.preventDefault();
        var name = tpl.find('.pageName').value,
            projectId = Session.get("currentProjectId");
        if (name!='') {
          Meteor.call('updatePage', Session.get("currentProjectId"), Session.get("currentPage"), name);
        }
        $('#edit-page-modal').modal('hide');
  },

  'click .add-page': function (e, tpl) {
      showModal(Template.newPageModal, $('.page-container'));
  },

  'click .yes-remove-page': function (e, tpl) {
    e.preventDefault();
    var projectId = Session.get("currentProjectId");
    Meteor.call('removePage', Session.get('currentProjectId'), Session.get("currentPage"));
    $('#delete-page-modal').modal('hide');
  },

  'click .remove-page': function (e, tpl) {
    Session.set('currentPage', this._id);
    showModal(Template.deletePageModal, $('.page-container'));
  },

  'click .edit-page': function (e, tpl) {
    Session.set('currentPage', this._id);
    showModal(Template.editPageModal, $('.page-container'), this);
  },

  'dragstart .widget': function (e, tpl) {
    var json_value = {
      name: this.name,
      text: this.text,
      origin: 'widget',
      type: this.type,
      template: this.template
    }
    e.originalEvent.dataTransfer.setData("application/json", JSON.stringify(json_value));
    e.originalEvent.dataTransfer.effectAllowed = "copy";
    console.log('on dragstart for widget');
  },

  'dragstart .grid': function (e, tpl) {
    var json_value = {
      name: this.name,
      origin: 'grid'
    }
    e.originalEvent.dataTransfer.setData("application/json", JSON.stringify(json_value));
    e.originalEvent.dataTransfer.effectAllowed = "copy";
    console.log('on dragstart for grid');
  },

  'dragstart .node': function (e, tpl) {
    var style = window.getComputedStyle(e.target, null);
    var offset_dataX = (parseInt(style.getPropertyValue("left"),10) - e.originalEvent.clientX);
    var offset_dataY = (parseInt(style.getPropertyValue("top"),10) - e.originalEvent.clientY);
    var json_value = {
      name: $(e.originalEvent.target).attr('name'),
      origin: 'node',
      _id: e.originalEvent.target.id,
      offsetX: offset_dataX,
      offsetY: offset_dataY
    }
    $('.node.active').popover('destroy');
    $('.node.active').removeClass('active');
    $(e.currentTarget).addClass('active');
    Session.set('currentNode', e.originalEvent.target.id);
    e.originalEvent.dataTransfer.setData("application/json", JSON.stringify(json_value));
    e.originalEvent.dataTransfer.effectAllowed = "move";
  },

  'dragenter .page': function (e, tpl) { console.log('ENTRE A DRAGENTER page');
    e.preventDefault();

    e.originalEvent.dataTransfer.dropEffect = "copy";
  },

  'dragover .page': function (e, tpl) {
    var x = e.originalEvent.clientX,
        y = e.originalEvent.clientY;
    e.preventDefault();
    //buscar el nodo anterior mas cercano
    /*var pageNodes = tpl.$('.page').children();
    var nodeSelected;
    if (pageNodes.length > 2) {
      pageNodes.each(function(id, node){
        var nodePosY = getPosition(node).top;
        console.log(y, nodePosY);
        if (nodePosY < y) {
          nodeSelected = node;
          console.log('encontro UNO');
        }
      });
      if (nodeSelected) {
      /*  console.log(nodeSelected);
        tpl.$(nodeSelected).after('<div class="insertPoint"></div>');
        var data = e.originalEvent.dataTransfer.getData('application/json');
        data = JSON.parse(data);*/
    /*  }
    }
*/
  },

  'drop .page': function (e, tpl) { console.log('ENTRE A DROP page');
    e.stopPropagation();
    /*
      storeNode = {
        name: data.name,
        text: data.text,
        posX: e.originalEvent.clientX,
        posY: e.originalEvent.clientY,
        color: '#000',
        backgroundColor: '#FFF',
        width: (data.type==1) ? '' : '100',
        height: (data.type==1) ? '' : '50',
        type: data.type,
        border: (data.type==1) ? '' : '1px solid #000',
        template: data.template
      }
*/
    var data = e.originalEvent.dataTransfer.getData('application/json');
    data = JSON.parse(data);

    var node = $("<div/>", {
          class: (data.origin=='widget') ? 'node' : 'contenedor',
          }),
        page = tpl.$('.page').clone(),
        template = '',
        x = e.originalEvent.clientX,
        y = e.originalEvent.clientY,
        pageNodes = tpl.$('.page').children(),
        nodeSelected,
        nextId = tpl.$('.page').children().length;

    e.preventDefault();
    //buscar el nodo anterior mas cercano
    if (pageNodes.length > 2) {
      pageNodes.each(function(){
        var nodePosY = getPosition(this).top;
        if (y > nodePosY) {
          nodeSelected = $(this).attr('id');
        }
      });
    }
    if (data.origin == 'grid') {
        template = Grid.findOne({name:data.name}).template;
    } else {
        template = Widgets.findOne({name:data.name}).template;
    }
    node.attr('id',nextId+1);
    node.html(template);

    if (nodeSelected) {
        console.log(page.find('#'+nodeSelected));
        //page.find(nodeSelected).after(node);
        node.insertBefore(page.find('#'+nodeSelected));
    } else {
        console.log('la mando abajo');
        page.append(node);
    }

      //console.log(tpl.$('.page').html());
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
  },

  'drop .contenedor .row .column': function (e, tpl) {
    e.stopPropagation();
    var data = e.originalEvent.dataTransfer.getData('application/json');
    data = JSON.parse(data);

    var node = $("<div/>", {
          class: (data.origin=='widget') ? 'node' : 'contenedor',
          }),
        page = tpl.$('.page').clone(),
        template = '',
        x = e.originalEvent.clientX,
        y = e.originalEvent.clientY,
        containerNodes = $(e.currentTarget).children(),
        nodeSelected,
        nextId = $(e.currentTarget).children().length;
        nodoOriginIdentyfyByClass = $(e.currentTarget).attr('class').split(' ');
        nodoOriginIdentyfyByClass = nodoOriginIdentyfyByClass[2];
    e.preventDefault();
    //buscar el nodo anterior mas cercano
    if (containerNodes.length > 1) {
      containerNodes.each(function(index){
        var nodePosY = getPosition(this).top;
        if (y > nodePosY) {
          nodeSelected = $(this).attr('id');
        }
      });
    }
    if (data.origin == 'grid') {
        template = Grid.findOne({name:data.name}).template;
    } else {
        template = Widgets.findOne({name:data.name}).template;
    }
    node.attr('id',$(e.currentTarget).parent().parent().attr('id')+'-'+nodoOriginIdentyfyByClass+'-'+(nextId+1));
    node.html(template);

    if (nodeSelected) {
        console.log(page.find('#'+nodeSelected));
        node.insertBefore(page.find('#'+nodeSelected));
    } else {
        console.log('la mando abajo', page.find('#'+$(e.currentTarget).attr('id')));
        let nodoFinal = page.find('#'+$(e.currentTarget).parent().parent().attr('id')+ ' .row .' + nodoOriginIdentyfyByClass);
        nodoFinal.append(node);
    }

   Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
  },

  'click .page': function (e, tpl){
      // si hago clic en una parte de la pagina q no es un nodo, quiero des-seleccionar
      e.stopPropagation();
      console.log('clic on page');
      $('.node.active').popover('destroy');
      $('.node.active').removeClass('active');
      Session.set("currentNode",'');
  },

  'click .node': function (e, tpl) {
      e.stopPropagation();
      $('.node.active').popover('destroy');
      $('.node.active').removeClass('active');
      $(e.currentTarget).addClass('active');
      Session.set("currentNode", e.currentTarget.id );
      let type = $('.node.active').attr('data-type');
      console.log(type);
      var options = {
            title    : function(){
                return $('.properties-title').html();
            },
            container: 'body',
            html     : true,
            placement: 'auto bottom',
            content  : function(){
                return (type==1 || type==2) ? $('.properties-content1-2').html() : $('.properties-content1-2').html();
            }
      },
      node = Nodes.findOne({_id: Session.get('currentNode')});

      $('.node.active').popover(options)
        .popover('show')
        .on('shown.bs.popover', function () {
          $('.close-properties').on('click', function(e){
              e.stopPropagation();
              $('.node.active').popover('destroy');
          });
          $('.deleteNode').on('click', deleteNodeEvent);
          $('.applyEditText').on('click', editNodeEvent);
          $('.editText').val(node.text);
          $('.editColor').val(node.color);
          $('.editBorder').val(node.border);
          $('.editBackgroundColor').val(node.backgroundColor);
          $('.editWidth').val(node.width);
          $('.editHeight').val(node.height);
        });
  },
});

var getPosition = function(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left,
    top: el.top
  }
};

var deleteNodeEvent = function() {
    $('.node.active').popover('destroy');
    console.log('Borrando nodeId:', Session.get("currentNode"));
    if (Session.get('currentNode').length) {
        Meteor.call('removeNode', Session.get('currentProjectId'), Session.get("currentNode"));
        Session.set("currentNode",'');
    }
};

var editNodeEvent = function(text) {
    console.log('Edit text nodeId:', Session.get("currentNode"));
    var page = Pages.findOne({_id:Session.get("currentPage")});
    var storeNode = {};
    storeNode._id = Session.get("currentNode");
    storeNode.text = $('.popover .editText').val();
    storeNode.color = $('.popover .editColor').val();
    storeNode.backgroundColor = $('.popover .editBackgroundColor').val();
    storeNode.width = $('.popover .editWidth').val();
    storeNode.height = $('.popover .editHeight').val();
    storeNode.border = $('.popover .editBorder').val();
    // IMPORTANTE
    //verificar q no guarde sin texto los q son de texto o sin tamaño etc
    Meteor.call('updateNode', Session.get('currentProjectId'), storeNode);
    $('.node.active').popover('destroy');

};

Template.eachPageInList.events({
  "click .page-item": function(event, template){

    Session.set('currentPage', this._id);

    $('.pages-list-group a').removeClass('active');
    $(template.firstNode).addClass('active');

  },

  'click .edit-page': function (e, tpl) {
    e.preventDefault();
    Session.set('currentPage', this._id);
    $('#new-page-modal input').val(this._id);
    $('#new-page-modal').modal('show');
  },

});
