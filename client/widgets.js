Widgets = new Meteor.Collection(null);
Widgets.insert(
  {
    name: 'button',
    icon: 'flaticon-tool7',
    template: '<a class="btn btn-default" >Button</a>',
    text: 'Button',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);
Widgets.insert(
  {
    name: 'text',
    icon: 'flaticon-line22',
    template: '<p>Text</p>',
    text: 'Text',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);
Widgets.insert(
  {
    name: 'input',
    icon: 'flaticon-text69',
    template: '<input type="text" value="input">',
    text: 'Input',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);
Widgets.insert(
  {
    name: 'titulo',
    icon: 'flaticon-font13',
    template: '<h1>Titulo</h1>',
    text: 'Título',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);
Widgets.insert(
  {
    name: 'titulo2',
    icon: 'flaticon-font13',
    template: '<h2>Titulo2</h2>',
    text: 'Título2',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);

Widgets.insert(
  {
    name: 'select',
    icon: 'flaticon-drop10',
    template: '<select><option value="opcion1">Opcion 1</option></select>',
    text: '',
    styles: ['color', 'background-color', 'height', 'width', 'border-color']
  }
);
