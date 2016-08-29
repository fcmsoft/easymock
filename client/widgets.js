Widgets = new Meteor.Collection(null);
Widgets.insert(
  {
    name: 'button',
    icon: 'flaticon-tool7',
    template: '<a class="btn btn-default" >Button</a>',
    text: 'Button',
    type: 1
  }
);
Widgets.insert(
  {
    name: 'text',
    icon: 'flaticon-line22',
    template: '<p>Text</p>',
    text: 'Text',
    type: 1
  }
);
Widgets.insert(
  {
    name: 'input',
    icon: 'flaticon-text69',
    template: '<input type="text" value="input">',
    text: 'Input',
    type: 1
  }
);
Widgets.insert(
  {
    name: 'titulo',
    icon: 'flaticon-font13',
    template: '<h1>Titulo</h1>',
    text: 'Título',
    type: 1
  }
);
Widgets.insert(
  {
    name: 'titulo2',
    icon: 'flaticon-font13',
    template: '<h2>Titulo2</h2>',
    text: 'Título2',
    type: 1
  }
);

Widgets.insert(
  {
    name: 'select',
    icon: 'flaticon-drop10',
    template: '<select><option value="opcion1">Opcion 1</option></select>',
    text: '',
    type: 3
  }
);
