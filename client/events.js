
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
  'click .elements-name-button': function(e, tpl) {
      if (!$('.elements-name-button').hasClass('showing')) {
        clearSelection();
        $('.elements-name-button').addClass('showing');
        $('.elements-name-button').val('Ocultar Elementos');
        $('.etiqueta').show();
        $('.node').addClass('active');
        $('.contenedor').addClass('active');
      } else {
        $('.elements-name-button').removeClass('showing');
        $('.elements-name-button').val('Ver Elementos');
        $('.etiqueta').hide();
        $('.node').removeClass('active');
        $('.contenedor').removeClass('active');
      }
  },
  'click .preview-button': function(e, tpl) {
      let script = '',
          scriptTags = '',
          specifications = Specification.find({page : Session.get("currentPage")}),
          contentTags = ContentTags.find({page : Session.get("currentPage")});
      $('.node.active').popover('destroy');
      $('.node.active').removeClass('active');
      $('.contenedor.active').popover('destroy');
      $('.contenedor.active').removeClass('active');
      $('body').addClass('preview');
      $('body').removeClass('edit');
      $('.preview-button').hide();
      $('.edit-button').show();
      $('.elements-name-button').hide();

      // agregar acciones
      $('body').append(agregarAcciones(specifications));

      // agregar tags de content
      $('body').append(agregarContentFromTags(contentTags));
  },
  'click .edit-button': function(e, tpl) {
    // tengo q recargar la pagina, es mas facil q borrar los javascripts etc agregados
      window.location.reload();
  },

  'click .export-button': function(e, tpl) {
      let page = $('.page').clone()
          uriContent = '',
          script = '',
          specifications = Specification.find({page : Session.get("currentPage")}),
          contentTags = ContentTags.find({page : Session.get("currentPage")}),
          content = `<!DOCTYPE html><html><head>
            <title>Easy Mock</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
            <script
              src="https://code.jquery.com/jquery-3.2.1.min.js"
              integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
              crossorigin="anonymous">
            </script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

          </head><body><div class="container-fluid">`;

      // agregar acciones
      page.append(agregarAcciones(specifications));

      // agregar tags de content
      page.append(agregarContentFromTags(contentTags));

      page.find('.etiqueta').remove();
      content = content + page.html() + script + '</div></body></html>';
      uriContent = "data:application/octet-stream," + encodeURIComponent(content);
      // TODO: ver si es posible asignar nombre y extension html
      window.open(uriContent, 'neuesDokument');
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
        node.insertAfter(page.find('#'+nodeSelected));
    } else {
        console.log('la mando abajo');
        page.append(node);
    }

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
  },

  'drop .contenedor .row .column': function (e, tpl) {
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

  'click .node': function (e, tpl) {
      editEvent(e, tpl);
  },

  'click .contenedor': function (e, tpl) {
      editEvent(e, tpl);
  },

  'mouseover .contenedor, mouseover .node': function (e, tpl) {
      e.stopPropagation();
      //clearSelection(); console.log('entre a hover', e.currentTarget);
      //$(e.currentTarget).addClass('active');
  },

});

function editEvent(e, tpl) {
      e.stopPropagation();
      clearSelection();
      $(e.currentTarget).addClass('active');

      let isWidget = $(e.currentTarget).hasClass('node'),
          elemTypeClass = isWidget ? '.node' : '.contenedor',
          elemId = $(e.currentTarget).attr('id'),
          type = $(elemTypeClass + '.active').attr('data-type'),
          elem = isWidget ? Widgets.findOne({name : type}) : Grid.findOne({name : type}),
          propertiesList = elem.styles,
          actions = EventList.find(),
          operations = OperationList.find(),
          tags = Tags.find(),
          elements = $('.etiqueta:hidden'),
          contentTag = ContentTags.findOne({page : Session.get("currentPage"), el: elemId}),
          especificacion = Specification.findOne({page : Session.get("currentPage"), el: elemId}),
          propertiesHtml = '',
          actionsHtml = '',
          operationsHtml = '',
          elementsHtml = '',
          tagsHtlm = '',
          options = {
                title    : function(){
                    return $('.properties-title').html() + (isWidget ? 'Widget' : 'Grid');
                },
                container: 'body',
                html     : true,
                placement: 'bottom',
                content  : function() {
                    return $('.properties-content').html();
                }
              };

      // selecciono la primer tab para que no quede marcada la anterior seleccionada
      $('a#style-tab').click();

      // armar lista de tags disponibles
      tagsHtml = `<select class="content-tags form-control"><option value="-1"> Seleccione...</option>`;
      tags.forEach(function(tag) {
        let tagState = '';
        if (tag.type === 'string') {
          tagState = (contentTag && tag.name === contentTag.tag) ? 'selected' : '';
          tagsHtml += `<option value="${tag.name}" ${tagState}> ${tag.name}</option>`;
        } else {
          tag.items.forEach(function(itemTag) {
            tagState = (contentTag && tag.name === contentTag.tag && itemTag === contentTag.item) ? 'selected' : '';
            tagsHtml += `<option value="${tag.name}.${itemTag}" ${tagState}> ${tag.name}.${itemTag}</option>`;
          });
        }
      });
      tagsHtml += `</select><div class="tag-description"></div>`;

      actionsHtml = `<select class="actions form-control"><option value="-1"> Seleccione...</option>`;
      actions.forEach(function(action) {
        let state = (especificacion && especificacion.event === action.event) ? 'selected' : '';
        actionsHtml += `<option value="${action.event}" ${state}> ${action.event}</option>`;
      });
      actionsHtml += `</select>`;
      operationsHtml = `<select class="operations form-control"><option value="-1"> Seleccione...</option>`;
      operations.forEach(function(op) {
        let state = (especificacion && especificacion.operation === op.name) ? 'selected' : '';
        operationsHtml += `<option value="${op.name}" ${state}> ${op.name}</option>`;
      });
      operationsHtml += `</select>`;
      propertiesList.forEach(function(prop) {
        let value = $(e.currentTarget).children().css(prop.name);
        propertiesHtml += `<div class="form-group properties-form-group"><label for="edit-${prop.name}">
          ${prop.label}</label><input type="text" value="${value}" class="form-control ${prop.inputClass}"></div>`;
      });
      elementsHtml = `<select class="elements form-control"><option value="-1"> Seleccione...</option>`;
      elements.map(function(index, el){
          let id = (el.id).substring(9),
              state = (especificacion && especificacion.element === id) ? 'selected' : '';
          elementsHtml += `<option value="${id}" ${state}> ${$(el).text()}</option>`;
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
      $('#content-form').html('');
      $('#content-form').append(tagsHtml);
      if (elem.includeText) {
        $('#properties-form').prepend('<div class="form-group properties-form-group"><label for="editText">Texto</label><input type="text" value="" name="editText" class="editText form-control"></div>');
      }

      $(elemTypeClass + '.active').popover(options)
        .popover('show')
        .on('shown.bs.popover', function () {
          $('.close-properties').on('click', function(e) {
              e.stopPropagation();
              $('.node.active').popover('destroy');
          });
          $('.deleteNode').on('click', {id: elemId}, isWidget ? deleteNodeEvent : deleteContenedorEvent);
          $('.applyEditText').on('click',  {id: elemId}, isWidget ? editNodeEvent : editGridEvent);
          $('.applyOperations').on('click',  {id: elemId, isWidget: isWidget}, editOperations);
          $('.applyContentTags').on('click',  {id: elemId, isWidget: isWidget}, editContentTags);
          // hago esto manualmente en vez de usar .tab() porque tengo los id en la plantilla y rompen
          $('.popover #properties-tabs a').on('click', function(e) {
              let id = $(this).attr('href');
              $('.tab-pane').removeClass('active');
              $('.popover ' + id).addClass('active');
          });
          $('.popover .content-tags').on('click', function(e) {
              // se selecciono una tag de contenido
              // muestro debajo de la lista la descripcion
              let selTag = $('.popover .content-tags').val(),
                  tagParts = selTag.split('.'),
                  tag = Tags.findOne({name: tagParts[0]});

              $('.tag-description').html(tag ? tag.text : '');
          });
          $('.editText').val( $(e.currentTarget).text());
          $('.elementName').val( $(e.currentTarget).attr('data-element-name'));
        });
  }

  // agregar acciones
function agregarAcciones(specifications) {
    let script = '';
    specifications.forEach(function(s) {
        script += `<script type="text/javascript">
                    $('#${s.el}').${s.event}(function(e){
                        e.stopPropagation();
                        $('#${s.element}').${s.operation}();
                    });
                  </script>`;
      });
      return script;
}

function agregarContentFromTags(contentTags) {
    let scriptTags = '';
    contentTags.forEach(function(ct) {
        let t = Tags.findOne({name: ct.tag}),
            htmlRes = t.process;

        scriptTags += `<script type="text/javascript"> console.log($('#${ct.el}'));
                    if($('#${ct.el}').hasClass('contenedor')) {
                       $('#${ct.el}').find('div div').html(${htmlRes});
                    } else {
                      $('#${ct.el}').html($('#${ct.el}').html().replace($('#${ct.el}').text(),${htmlRes}));
                    }
                  </script>`;
      });
      return scriptTags;
}
/*
* Create a new node to insert in page
*/
function createNode(data, nodeId) {
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

function getPreviousNode(nodes, y) {
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

function deleteNodeEvent(e) {
    var page = $('.page').clone(),
        id = e.data.id;
    $('.node.active').popover('destroy');
    page.find('#'+id).remove();
    page.find('#etiqueta-'+id).remove();
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
};

function deleteContenedorEvent(e) {
    var page = $('.page').clone(),
        id = e.data.id;
    $('.contenedor.active').popover('destroy');
    console.log('Borrando contenedor:', e.data.contenedor, id);
    page.find('#'+id).remove();
    page.find('#etiqueta-'+id).remove();
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
};

function editNodeEvent(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        node = page.find('#'+id),
        type = node.attr('data-type'),
        widget = Widgets.findOne({name : type}),
        propertiesList = widget.styles,
        styles = {},
        etiqueta = page.find('#etiqueta-'+id).length > 0 ?
            page.find('#etiqueta-'+id) :
            $("<div/>", {
              class: 'etiqueta',
              id: 'etiqueta-' + id
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
      etiqueta.html('<p>'+$('.popover .elementName').val()+'</p>');
      node.before(etiqueta);
    }
    node.children().css(styles);

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    $('.node.active').popover('destroy');
};

function editOperations(e) {
    let elemTypeClass = e.data.isWidget ? '.node' : '.contenedor',
        action = {
          project: Session.get('currentProjectId'),
          page: Session.get('currentPage'),
          el: e.data.id,
          event: $('.popover .actions').val(),
          operation: $('.popover .operations').val(),
          element: $('.popover .elements').val()
        };

    if (action.event != '-1' && action.operation != '-1' && action.element != '-1') {
      Meteor.call('addAction',  Session.get('currentProjectId'), action);
      $(elemTypeClass + '.active').popover('destroy');
    } else {
      //show error
    }
};

function editContentTags(e) {
    let elemTypeClass = e.data.isWidget ? '.node' : '.contenedor',
        selTag = $('.popover .content-tags').val(),
        tagParts = selTag.split('.'),
        tag = {
          project: Session.get('currentProjectId'),
          page: Session.get('currentPage'),
          el: e.data.id,
          tag: tagParts[0],
          item: tagParts[1]
        };
        console.log(tag);
    if (tag.tag != '-1') {
      Meteor.call('addTag', tag);
    } else {
      //selecciono ninguno, borro lo q tenia
      Meteor.call('deleteTag',  tag);
    }
    $(elemTypeClass + '.active').popover('destroy');
};

function editGridEvent(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        element = page.find('#'+id),
        type = element.attr('data-type'),
        gridType = Grid.findOne({name : type}),
        propertiesList = gridType.styles,
        styles = {},
        etiqueta = page.find('#etiqueta-'+id).length > 0 ?
            page.find('#etiqueta-'+id) :
            $("<div/>", {
              class: 'etiqueta',
              id: 'etiqueta-' + id
            });

    propertiesList.forEach(function(prop) {
      styles[prop.name] = $('.popover .' + prop.inputClass).val();
    });

    if ( $('.popover .elementName').val().length > 0) {
      element.attr('data-element-name', $('.popover .elementName').val());
    }
    etiqueta.html('<p>'+$('.popover .elementName').val()+'</p>');
    element.before(etiqueta);
    element.children().css(styles);

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    $('.contenedor.active').popover('destroy');
};

function clearSelection() {
    $('.node.active').popover('destroy');
    $('.node.active').removeClass('active');
    $('.contenedor.active').popover('destroy');
    $('.contenedor.active').removeClass('active');
    $('.etiqueta').hide();
};
