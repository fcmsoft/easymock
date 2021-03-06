
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
        $('.elements-name-button').val('Ocultar Elementos/Tags');
        $('.etiqueta').show();
        $('.etiquetaContent').show();
        $('.node').addClass('active');
        $('.contenedor').addClass('active');
      } else {
          hideElementsName();
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
      $('.etiquetaContent').hide();
      $('.etiqueta').hide();
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
            <style>
            /* WOA loader */
            .loader {
               color: #000;
               font-size: 20px;
               margin: 100px auto;
               width: 1em;
               height: 1em;
               border-radius: 50%;
               position: relative;
               text-indent: -9999em;
               -webkit-animation: load4 1.3s infinite linear;
               animation: load4 1.3s infinite linear;
               -webkit-transform: translateZ(0);
               -ms-transform: translateZ(0);
               transform: translateZ(0);
             }
             @-webkit-keyframes load4 {
               0%,
               100% {
                 box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
               }
               12.5% {
                 box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
               }
               25% {
                 box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
               }
               37.5% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
               }
               50% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
               }
               62.5% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
               }
               75% {
                 box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
               }
               87.5% {
                 box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
               }
             }
             @keyframes load4 {
               0%,
               100% {
                 box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
               }
               12.5% {
                 box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
               }
               25% {
                 box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
               }
               37.5% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
               }
               50% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
               }
               62.5% {
                 box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
               }
               75% {
                 box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
               }
               87.5% {
                 box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
               }
             }
            </style>
          </head><body><div class="container-fluid loader">`;

      // agregar acciones
      page.append(agregarAcciones(specifications));

      // agregar tags de content
      page.append(agregarContentFromTags(contentTags));

      //eliminar las etiquetas
      page.find('.etiqueta').remove();
      page.find('.etiquetaContent').remove();

      content = content + page.html() + script + '</div></body></html>';
      uriContent = "data:application/octet-stream," + encodeURIComponent(content);
      // TODO: ver si es posible asignar nombre y extension html
      window.open(uriContent, 'neuesDokument');
  },

  'click .save-page': function (e, tpl) {
      e.preventDefault();
      const name = tpl.find('.pageName').value,
          projectId = Session.get("currentProjectId");

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

  'dragenter .page': function (e, tpl) {
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
        console.log('la mando abajo ID:', $(e.currentTarget).parent().parent().attr('id')+'-'+nodoOriginIdentyfyByClass+'-'+(nextId+1));
        let nodoFinal = page.find('#'+$(e.currentTarget).parent().parent().attr('id')+ ' .row .' + nodoOriginIdentyfyByClass).first();
        nodoFinal.append(node); console.log('inserta en', nodoFinal);
    }

   Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
  },

  'click .page': function (e, tpl){
      // si hago clic en una parte de la pagina q no es un nodo, quiero des-seleccionar
      e.stopPropagation();
      clearSelection();
      hideElementsName();
  },

  'click .node': function (e, tpl) {
    // si esta presente el preview button entonces esta en edit mode
    if($('.preview-button').is(':visible')) {
      editEvent(e, tpl);
    }

  },

  'click .contenedor': function (e, tpl) {
    if($('.preview-button').is(':visible')) {
      editEvent(e, tpl);
    }
  },


});

// para obtener el valor real y no el calculado
var getCss = function($elem, prop) {
  var wasVisible = $elem.css('display') !== 'none';
  try {
      return $elem.hide().css(prop);
  } finally {
      if (wasVisible) $elem.show();
  }
};

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
      tagsDisponibles = getTagsDisponibles(tags, isWidget),
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

  // armar lista de tags disponibles
  tagsHtml = `<select class="content-tags form-control"><option value="-1"> Seleccione...</option>`;
  tagsDisponibles.forEach(function(tag) {
    let tagState = '',
        tagData = tag.split('.'),
        typeTagCompuesta = tagData.length > 1;
    if (typeTagCompuesta) {
        // agrego un * en la comparacion por los casos q visualmente pongo * para representar arrays
        tagState = (contentTag &&
          (tagData[0] === contentTag.tag || tagData[0] === contentTag.tag + '*')
          && tagData[1] === contentTag.item) ?
          'selected' : '';
    } else {
        tagState = (contentTag && tagData[0] === contentTag.tag) ? 'selected' : '';
    }
    tagsHtml += `<option value="${tag}" ${tagState}> ${tag}</option>`;
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
    let value = getCss($(e.currentTarget).children(),prop.name);
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
  if (elem.includeText || elem.includeVal) {
    $('#properties-form').prepend('<div class="form-group properties-form-group"><label for="editText">Texto</label><input type="text" value="" name="editText" class="editText form-control"></div>');
  }
  if (elem.includeList) {
    $('#properties-form').prepend('<div class="form-group properties-form-group"><label for="editList">Items</label><input type="text" value="" name="editList" class="editList form-control"><p class="small">Separar items con coma</p></div>');
  }
  if (elem.includeSrc) {
    $('#properties-form').prepend('<div class="form-group properties-form-group"><label for="editSrc">Src</label><input type="text" value="" name="editSrc" class="editSrc form-control"></div>');
  }

  $(elemTypeClass + '.active').popover(options)
    .popover('show')
    .on('shown.bs.popover', function () {
      $('.close-properties').on('click', function(e) {
          e.stopPropagation();
          $(elemTypeClass + '.active').popover('destroy');
      });
      $('.deleteNode').on('click', {id: elemId}, isWidget ? deleteNodeEvent : deleteContenedorEvent);
      $('.applyEditText').on('click',  {id: elemId}, isWidget ? editNodeEvent : editGridEvent);
      //$('.applyOperations').on('click',  {id: elemId, isWidget: isWidget}, editOperations);
      //$('.applyContentTags').on('click',  {id: elemId, isWidget: isWidget}, editContentTags);
      // hago esto manualmente en vez de usar .tab() porque tengo los id en la plantilla y rompen
      $('.popover #properties-tabs a').on('click', function(e) {
          let id = $(this).attr('href');
          $('.tab-pane').removeClass('active');  console.log('click en tab', id);
          $('.popover ' + id).addClass('active');
      });
      // selecciono la primer tab para que no quede marcada la anterior seleccionada
      $('a#style-tab').click();

      $('.popover .content-tags').on('click', function(e) {
          // se selecciono una tag de contenido
          // muestro debajo de la lista la descripcion
          let selTag = $('.popover .content-tags').val(),
              tagParts = selTag.split('.'),
              tag = Tags.findOne({name: tagParts[0]});

          $('.tag-description').html(tag ? tag.text : '');
      });
      if (elem.includeText || elem.includeVal) {
        $('.editText').val( $(e.currentTarget).text());
      }
      if (elem.includeSrc) {
        $('.editSrc').val($(e.currentTarget).children().attr('src'));
      }
      if (elem.includeList) {
        let list = '';
        $(e.currentTarget).find('option').each((index, elem)=>{ list = list + $(elem).text() + ','; });
        $('.editList').val(list.slice(0,-1));
      }
      $('.elementName').val( $(e.currentTarget).attr('data-element-name'));
    });
  }

//retorna lista de tags de acuerdo a si es grid o widget
function getTagsDisponibles(tags, isWidget) {
    let res = [];
    if (isWidget) {
        tags.forEach(function(t){
          switch (t.type) {
            case 'string':
              res.push(t.name);
              break;
            case 'object':
              t.items.forEach(function (item) {
                res.push(t.name + '.' + item);
              });
              break;
            case 'array':
              t.items.forEach(function(item) {
                res.push(t.name + '*.' + item);
              });
              break;
          }
        });
    } else {
      //es contenedor
      tags.forEach(function(t){
        switch (t.type) {
          case 'string':
            //no se puede agregar directamente a grid
            break;
          case 'object':
            res.push(t.name);
            break;
          case 'array':
            res.push(t.name);
            break;
        }
      });
    }
    return res;
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

function agregarScriptContentTagFunction() {
    return `
            function generator(ct, htmlRes) {
                  var elem = $('#' + ct.el);
                  if (elem.length) {
                    //es un elem comun
                        if (typeof htmlRes === 'object') {
                          //si el resultado es un objeto, solo tomo la propiedad q corresponde
                          htmlRes = htmlRes[ct.item];
                        }
                        elem.html(elem.html().replace(elem.text(),htmlRes));
                  }
              }

              //es un grid con array, plantilla a repetir
              function arrayGenerator(el, items, htmlRes) {
                var elem = $(el);
                if (elem.length) {
                  if(elem.hasClass('contenedor')) {
                    var elContent = elem.clone();
                    elContent.addClass('cloned');
                    items.forEach(function(item){
                      var e = elContent.find(item.el);
                      if (e[0].children[0].tagName === 'IMG') {
                        e[0].children[0].src = htmlRes[item.item];
                      } else {
                        e.html(e.html().replace(e.text(),htmlRes[item.item]));
                      }
                    });
                    elem.after(elContent);
                  }
                }
              }`;
}

function agregarContentFromTags(contentTags) {
    let scriptTags = '';
    scriptTags += `<script>
    document.addEventListener("DOMContentLoaded",function(event) { `;
    scriptTags += agregarScriptContentTagFunction();
    contentTags.forEach(function(ct) {
        let t = Tags.findOne({name: ct.tag}),
            tagFunction = t.process,
            relativeElems = [];

        if (t.type === 'array') {
              tagConfig = t.config || {};
              if (ct.item === 'undefined' || ct.item === '') {
                  relativeElems = ContentTags.find({page : Session.get("currentPage"), tag: ct.tag, item: {$ne: ''}}).fetch();
                  scriptTags += `
                          (function () {
                            var res = ${tagFunction}(this, ${tagConfig}, function(results) {
                                $('.container-fluid').removeClass('loader');
                                if (results.length>0) {
                                  results.forEach(function(r) {
                                      //por cada uno de los resultados encontrados, llamo al generator
                                      arrayGenerator('#${ct.el}', ${printItems(relativeElems)}, r);
                                  });
                                  //al final tengo q borrar el contenedor original
                                  $('#${ct.el}').not('.cloned').remove();
                                }
                            });
                          })();`;
                        }
        } else {
          scriptTags += `
              (function () {
                var res = ${tagFunction}();
                generator({tag: '${ct.tag}', el: '${ct.el}', item: '${ct.item}'}, res);
              })();`;
        }

      });
      scriptTags += `});</script>`;
      return scriptTags;
}

function printItems(elements) {
  let elems = '[';
  elements.forEach(function(e){
    elems += `{'item':'${e.item}', el: '#${e.el}'},`;
  });
  return elems + ']';
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
    page.find('#etiquetaContent-'+id).remove();
    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    Meteor.call('removeElementTags', Session.get('currentProjectId'), Session.get('currentPage'), id);
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

function getEtiquetaContent(page, id, contentTag){
    let etiquetaContent = page.find('#etiquetaContent-' + id).length > 0 ?
      page.find('#etiquetaContent-' + id) :
      $("<div/>", {
        class: 'etiquetaContent',
        id: 'etiquetaContent-' + id
      }),
      type = Tags.findOne({name: contentTag.tag}).type,
      tagText = contentTag.tag;
    if (type === 'object') {
      tagText += '.' + contentTag.item;
    }
    if (type === 'array') {
      tagText += '*.' + contentTag.item;
    }
    return etiquetaContent.html('<p>Data('+tagText+')</p>');
}

function editNodeEvent(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        node = page.find('#'+id),
        type = node.attr('data-type'),
        widget = Widgets.findOne({name : type}),
        propertiesList = widget.styles,
        styles = {},
        etiqueta = page.find('#etiqueta-' + id).length > 0 ?
            page.find('#etiqueta-' + id) :
            $("<div/>", {
              class: 'etiqueta',
              id: 'etiqueta-' + id
            });

    propertiesList.forEach(function(prop) {
      styles[prop.name] = $('.popover .' + prop.inputClass).val();
    });
    if(widget.includeText) {
      node.html(node.html().replace(node.text(), $('.popover .editText').val()));
    }
    if(widget.includeVal) {
      node.children().val($('.popover .editText').val());
    }
    if(widget.includeSrc) {
      node.children().attr('src',$('.popover .editSrc').val());
    }
    if(widget.includeList) {
      let nodeSelect = node.find('select');
      nodeSelect.html('');
      const list = $('.popover .editList').val().split(',');
      list.forEach((l) => nodeSelect.append($('<option>', {
        value: l,
        text: l
    })));
    }
    node.attr('data-element-name', $('.popover .elementName').val());

    if ($('.popover .elementName').val().length > 0) {
      etiqueta.html('<p>' + $('.popover .elementName').val()+'</p>');
      node.before(etiqueta);
    } else {
      page.find('#etiqueta-' + id).remove();
    }

    node.children().css(styles);

    editOperations(id);
    const tag = editContentTags(id);

    const contentTag = ContentTags.findOne({page : Session.get("currentPage"), el: id}) || tag;

    // agregar texto a la etiqueta de contenido (tag) si tiene
    if (contentTag && contentTag.tag !== '-1') {
      node.before(getEtiquetaContent(page, id, contentTag));
    }

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());

    $('.node.active').popover('destroy');
};

function editOperations(id) {
    let action = {
          project: Session.get('currentProjectId'),
          page: Session.get('currentPage'),
          el: id,
          event: $('.popover .actions').val(),
          operation: $('.popover .operations').val(),
          element: $('.popover .elements').val()
        };

    if (action.event != '-1' && action.operation != '-1' && action.element != '-1') {
      Meteor.call('addAction',  Session.get('currentProjectId'), action);
    } else {
      // selecciono ninguno, borro lo q tenia
      // tendría que avisar, preguntar si o no?
      Meteor.call('deleteAction',  action);
    }
};

function editContentTags(id) {
    let selTag = $('.popover .content-tags').val(),
        tagParts = selTag.split('.'),
        tag = {
          project: Session.get('currentProjectId'),
          page: Session.get('currentPage'),
          el: id,
          tag: tagParts[0].replace('*', ''),
          item: tagParts[1] || ''
        }; console.log('tag', tag);
    if (tag.tag != '-1') {
      Meteor.call('addTag', tag);
    } else {
      // selecciono ninguno, borro lo q tenia
      // tendría que avisar, preguntar si o no?
      Meteor.call('deleteTag',  tag);
    }
    return tag;
};

function editGridEvent(e) {
    let page = $('.page').clone(),
        id = e.data.id,
        element = page.find('#'+id),
        type = element.attr('data-type'),
        gridType = Grid.findOne({name : type}),
        propertiesList = gridType.styles,
        styles = {},
        contentTag = ContentTags.findOne({page : Session.get("currentPage"), el: id}),
        etiquetaContent = page.find('#etiquetaContent-' + id).length > 0 ?
            page.find('#etiquetaContent-' + id) :
            $("<div/>", {
              class: 'etiquetaContent',
              id: 'etiquetaContent-' + id
            }),
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
      etiqueta.html('<p>'+$('.popover .elementName').val()+'</p>');
      element.before(etiqueta);
    }

    // agregar texto a la etiqueta de contenido (tag) si tiene
    if (contentTag) {
      etiquetaContent.html('<p>Data('+contentTag.tag+')</p>');
      element.before(etiquetaContent);
    }
    element.children().css(styles);

    editOperations(id, false);
    editContentTags(id, false);

    Meteor.call('updatePageContent', Session.get('currentProjectId'), Session.get('currentPage'), page.html());
    $('.contenedor.active').popover('destroy');
};

function hideElementsName() {
    $('.elements-name-button').removeClass('showing');
    $('.elements-name-button').val('Ver Elementos/Tags');
    $('.etiqueta').hide();
    $('.etiquetaContent').hide();
    $('.node').removeClass('active');
    $('.contenedor').removeClass('active');
}

function clearSelection() {
    $('.node.active').popover('destroy');
    $('.node.active').removeClass('active');
    $('.contenedor.active').popover('destroy');
    $('.contenedor.active').removeClass('active');
    $('.etiqueta').hide();
    $('.etiquetaContent').hide();
};
