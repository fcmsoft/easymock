
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
  'click .show-tags-button': function(e, tpl) {
      clearSelection();
      $('.tag').show();
      $('.node').addClass('active');
      $('.contenedor').addClass('active');
  },
  'click .hide-tags-button': function(e, tpl) {
      $('.tag').hide();
      $('.node').removeClass('active');
      $('.contenedor').removeClass('active');
  },
  'click .preview-button': function(e, tpl) {
      let script = '',
          specifications = Specification.find({page : Session.get("currentPage")});
      $('.node.active').popover('destroy');
      $('.node.active').removeClass('active');
      $('.contenedor.active').popover('destroy');
      $('.contenedor.active').removeClass('active');
      $('body').addClass('preview');
      $('body').removeClass('edit');
      $('.preview-button').hide();
      $('.edit-button').show();
      $('.show-tags-button').hide();
      $('.hide-tags-button').hide();

      // agregar acciones
      specifications.forEach(function(s) {

        script += `<script type="text/javascript">
                    $('#${s.el}').${s.event}(function(e){
                        e.stopPropagation();
                        console.log(e);
                        $('#${s.element}').${s.operation}();
                    });
                  </script>`;
      });
      $('body').append(script);

  },
  'click .edit-button': function(e, tpl) {
      $('body').removeClass('preview');
      $('body').addClass('edit');
      $('.preview-button').show();
      $('.edit-button').hide();
      $('.show-tags-button').show();
      $('.hide-tags-button').show();
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
      origin: 'widget'
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
      var json_value = {
        name: $(e.currentTarget).attr('data-type'),
        id: $(e.currentTarget).attr('id'),
        origin: 'node'
      }
      clearSelection();
      console.log('entre a DRAG node', json_value);
      e.originalEvent.dataTransfer.setData("application/json", JSON.stringify(json_value));
      console.log('on dragstart for node');
      e.originalEvent.dataTransfer.effectAllowed = "move";
  },

  'dragenter .page': function (e, tpl) { console.log('ENTRE A DRAGENTER page');
      e.preventDefault();
      e.originalEvent.dataTransfer.dropEffect = "copy";
  },

  'dragover .page': function (e, tpl) {
    e.preventDefault();

  },

  'drop .page': function (e, tpl) { console.log('ENTRE A DROP page');
    e.stopPropagation();
    var data = e.originalEvent.dataTransfer.getData('application/json');
    data = JSON.parse(data);
    var node,
        page = tpl.$('.page').clone(),
        nodeSelected,
        nextId = tpl.$('.page').children().length;

    e.preventDefault();

    if (data.origin === 'node') {
      node = page.find('#'+data.id).clone();
      page.find('#'+data.id).remove();
    } else
    {
      //creo nuevo nodo
      node = createNode(data, nextId+1);
    }
    //buscar el nodo anterior mas cercano
    nodeSelected = getPreviousNode(tpl.$('.page').children(), e.originalEvent.clientY);

    if (nodeSelected) {
        console.log('selecciono un nodo',page.find('#'+nodeSelected));
        node.insertBefore(page.find('#'+nodeSelected));
    } else {
        console.log('la mando abajo');
        page.append(node);
    }

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
  },

  'drop .contenedor .row .column': function (e, tpl) { console.log('entre a DROP Contenedor');
    e.stopPropagation();
    var data = e.originalEvent.dataTransfer.getData('application/json');
    data = JSON.parse(data);

    var node,
        page = tpl.$('.page').clone(),
        nodeSelected,
        nextId = $(e.currentTarget).children().length;
        nodoOriginIdentyfyByClass = $(e.currentTarget).attr('class').split(' ');
        nodoOriginIdentyfyByClass = nodoOriginIdentyfyByClass[2];

    e.preventDefault();

    if (data.origin === 'node') {
      node = page.find('#'+data.id).clone();
      page.find('#'+data.id).remove();
    } else {
      //creo nuevo nodo
      node = createNode(data, $(e.currentTarget).parent().parent().attr('id')+'-'+nodoOriginIdentyfyByClass+'-'+(nextId+1));
    }

    //buscar el nodo anterior mas cercano
    nodeSelected = getPreviousNode($(e.currentTarget).children(), e.originalEvent.clientY);

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
      clearSelection();
  },

  'click .node': function (e, tpl) { console.log('edittando');
      e.stopPropagation();
      clearSelection();
      $(e.currentTarget).addClass('active');

      let type = $('.node.active').attr('data-type'),
          widget = Widgets.findOne({name : type}),
          propertiesList = widget.styles,
          actions = EventList.find(),
          operations = OperationList.find(),
          elements = $('.tag:hidden');
          propertiesHtml = '',
          actionsHtml = '',
          operationsHtml = '',
          elementsHtml = '',
          options = {
                title    : function(){
                    return $('.properties-title').html();
                },
                container: 'body',
                html     : true,
                placement: 'bottom',
                content  : function() {
                    return $('.properties-content').html();
                }
              };

      actionsHtml = `<select class="actions"><option value="-1"> Seleccione...</option>`;
      actions.forEach(function(action){
        actionsHtml += `<option value="${action.event}"> ${action.event}</option>`;
      });
      actionsHtml += `</select>`;
      operationsHtml = `<select class="operations"><option value="-1"> Seleccione...</option>`;
      operations.forEach(function(op){
        operationsHtml += `<option value="${op.name}"> ${op.name}</option>`;
      });
      operationsHtml += `</select>`;
      propertiesList.forEach(function(prop){
        let value = $(e.currentTarget).children().css(prop.name);
        propertiesHtml += `<div class="form-group properties-form-group"><label for="edit-${prop.name}">
          ${prop.label}</label><input type="text" value="${value}" class="form-control ${prop.inputClass}"></div>`;
      });
      elementsHtml = `<select class="elements"><option value="-1"> Seleccione...</option>`;
      elements.map(function(index, el){
          let id = (el.id).substring(4);
          elementsHtml += `<option value="${id}"> ${$(el).text()}</option>`;
      });
      elementsHtml += `</select>`;

      $('#properties-form').html('');
      $('#properties-form').append(propertiesHtml);
      $('#events-list').html('');
      $('#events-list').append(actionsHtml);
      $('#operations-list').html('');
      $('#operations-list').append(operationsHtml);
      $('#elements-list').html('');
      $('#elements-list').append(elementsHtml);
      if (widget.includeText) {
        $('#properties-form').prepend('<div class="form-group properties-form-group"><label for="editText">Texto</label><input type="text" value="" name="editText" class="editText form-control"></div>');
      }

      $('.node.active').popover(options)
        .popover('show')
        .on('shown.bs.popover', function () {
          $('.close-properties').on('click', function(e) {
              e.stopPropagation();
              $('.node.active').popover('destroy');
          });
          $('.deleteNode').on('click', {id: $(e.currentTarget).attr('id')}, deleteNodeEvent);
          $('.applyEditText').on('click',  {id: $(e.currentTarget).attr('id')}, editNodeEvent);
          $('.applyOperations').on('click',  {id: $(e.currentTarget).attr('id')}, editOperations);
          // hago esto manualmente en vez de usar .tab() porque tengo los id en la plantilla y rompen
          $('.popover #properties-tabs a').on('click', function(e) {
              let id = $(this).attr('href');
              $('.tab-pane').removeClass('active');
              $('.popover ' + id).addClass('active');
          });
          $('.editText').val( $(e.currentTarget).text());
          $('.elementName').val( $(e.currentTarget).attr('data-element-name'));
        });
  },

  'mouseover .contenedor, mouseover .node': function (e, tpl) {
      e.stopPropagation();
      //clearSelection(); console.log('entre a hover', e.currentTarget);
      //$(e.currentTarget).addClass('active');
  },

  'click .contenedor': function (e, tpl) {
      e.stopPropagation();
      clearSelection();
      $(e.currentTarget).addClass('active');
      var options = {
            title    : function(){
                return $('.properties-title').html();
            },
            container: 'body',
            html     : true,
            placement: 'auto bottom',
            content  : function(){
                return $('.properties-grid-content').html();
            }
      };
      var contenedorActual = e.currentTarget;
      $('.contenedor.active').popover(options)
        .popover('show')
        .on('shown.bs.popover', function () {
          $('.close-properties').on('click', function(e){
              e.stopPropagation();
              $('.contenedor.active').popover('destroy');
          });
          $('.elementName').val( $(e.currentTarget).attr('data-element-name'));
          $('.applyEditText').on('click',  {id: $(e.currentTarget).attr('id')}, editGridEvent);
          $('.deleteContenedor').on('click', {contenedor: contenedorActual}, deleteContenedorEvent);
        });
  },
});

/*
* Create a new node to insert in page
*/
var createNode = function(data, nodeId) {
  let node = $("<div/>", {
          class: (data.origin === 'widget') ? 'node' : 'contenedor',
      }),
      template = '';

  if (data.origin === 'grid') {
      template = Grid.findOne({name:data.name}).template;
  } else {
      template = Widgets.findOne({name:data.name}).template;
  }

  node.attr('id', nodeId);
  node.attr('draggable', true);
  node.attr('data-type', data.name);
  node.html(template);

  return node;
}

var getPreviousNode = function(nodes, y) {
  var nodeSelected;
  //buscar el nodo anterior mas cercano
  if (nodes.length > 1) {
    nodes.each(function(){
      var nodePosY = getPosition(this).top;
      if (y > nodePosY && ($(this).hasClass('node') || $(this).hasClass('contenedor')) ) {
        nodeSelected = $(this).attr('id');
      }
    });
    return nodeSelected;
  }
}

var getPosition = function(el) {
  el = el.getBoundingClientRect();
  return {
    left: el.left,
    top: el.top
  }
};

var deleteNodeEvent = function(e) {
    var page = $('.page').clone(),
        id = e.data.id;
    $('.node.active').popover('destroy');
    page.find('#'+id).remove();
    page.find('#tag-'+id).remove();
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
};

var deleteContenedorEvent = function(e) {
    var page = $('.page').clone(),
        id=$(e.data.contenedor).attr('id');
    $('.contenedor.active').popover('destroy');
    console.log('Borrando contenedor:', e.data.contenedor, id);
    page.find('#'+id).remove();
    page.find('#tag-'+id).remove();
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
};

var editNodeEvent = function(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        node = page.find('#'+id),
        type = node.attr('data-type'),
        widget = Widgets.findOne({name : type}),
        propertiesList = widget.styles,
        styles = {},
        tag = page.find('#tag-'+id).length > 0 ?
            page.find('#tag-'+id) :
            $("<div/>", {
              class: 'tag',
              id: 'tag-' + id
            });

    propertiesList.forEach(function(prop) {
      styles[prop.name] = $('.popover .' + prop.inputClass).val();
    });
    if ( $('.popover .editText').val().length > 0) {
      node.html(node.html().replace(node.text(), $('.popover .editText').val()));
    }
    if ( $('.popover .elementName').val().length > 0) {
      node.attr('data-element-name', $('.popover .elementName').val());
    }
    if ($('.popover .elementName').val().length > 0) {
      tag.html('<p>'+$('.popover .elementName').val()+'</p>');
      node.before(tag);
    }
    node.children().css(styles);

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    $('.node.active').popover('destroy');
};

var editOperations = function(e) {
    let action = {
          project: Session.get('currentProjectId'),
          page: Session.get('currentPage'),
          el: e.data.id,
          event: $('.popover .actions').val(),
          operation: $('.popover .operations').val(),
          element: $('.popover .elements').val()
        };

    if (action.event != '-1' && action.operation != '-1' && action.element != '-1') {
      Meteor.call('addAction',  Session.get('currentProjectId'), action);
      $('.node.active').popover('destroy');
    } else {
      //show error
    }

};

var editGridEvent = function(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        element = page.find('#'+id),
        type = element.attr('data-type'),
        gridType = Grid.findOne({name : type}),
        propertiesList = gridType.styles,
        styles = {},
        tag = page.find('#tag-'+id).length > 0 ?
            page.find('#tag-'+id) :
            $("<div/>", {
              class: 'tag',
              id: 'tag-' + id
            });

    propertiesList.forEach(function(prop) {
      styles[prop.name] = $('.popover .' + prop.inputClass).val();
    });

    if ( $('.popover .elementName').val().length > 0) {
      element.attr('data-element-name', $('.popover .elementName').val());
    }
    tag.html('<p>'+$('.popover .elementName').val()+'</p>');
    element.before(tag);
    element.children().css(styles);

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    $('.contenedor.active').popover('destroy');
};

var clearSelection = function(){
  $('.node.active').popover('destroy');
  $('.node.active').removeClass('active');
  $('.contenedor.active').popover('destroy');
  $('.contenedor.active').removeClass('active');
  $('.tag').hide();
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
