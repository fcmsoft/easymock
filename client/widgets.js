Widgets = new Meteor.Collection(null);
Widgets.insert(
  {
    name: 'button',
    icon: 'flaticon-tool7',
    template: '<a class="btn btn-default" >Button</a>',
    text: 'Button',
    includeText: true,
    styles:  [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);
Widgets.insert(
  {
    name: 'text',
    icon: 'flaticon-line22',
    template: '<p>Text</p>',
    text: 'Text',
    includeText: true,
    styles:  [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);
Widgets.insert(
  {
    name: 'input',
    icon: 'flaticon-text69',
    template: '<input type="text" value="input">',
    text: 'Input',
    includeText: true,
    styles:  [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);
Widgets.insert(
  {
    name: 'titulo',
    icon: 'flaticon-font13',
    template: '<h1>Titulo</h1>',
    text: 'Título',
    includeText: true,
    styles:  [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);
Widgets.insert(
  {
    name: 'titulo2',
    icon: 'flaticon-font13',
    template: '<h2>Titulo2</h2>',
    text: 'Título2',
    includeText: true,
    styles: [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);

Widgets.insert(
  {
    name: 'select',
    icon: 'flaticon-drop10',
    template: '<select><option value="opcion1">Opcion 1</option></select>',
    text: '',
    includeText: false,
    styles: [
      {name: 'color'},
      {name: 'background-color'},
      {name: 'height'},
      {name: 'width'},
      {name: 'border-color'}
    ]
  }
);
