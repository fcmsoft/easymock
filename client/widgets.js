Widgets = new Meteor.Collection(null);
Widgets.insert(
  {
    name: 'button',
    icon: 'flaticon-tool7',
    template: '<a class="btn btn-default" >Button</a>',
    text: 'Button',
    styles: [
      {
        name: 'text-align',
        inputClass: 'editTextAlign',
        label: 'Text Align'
      },
      {
        name: 'align-items',
        inputClass: 'editAlignItems',
        label: 'Vertical Align'
      },
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'padding',
        inputClass: 'editPadding',
        label: 'Padding',
      }
    ],
    includeText: true
  }
);
Widgets.insert(
  {
    name: 'text',
    icon: 'flaticon-line22',
    template: '<p>Text</p>',
    text: 'Text',
    styles: [
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'padding',
        inputClass: 'editPadding',
        label: 'Padding',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: true
  }
);
Widgets.insert(
  {
    name: 'input',
    icon: 'flaticon-text69',
    template: '<input type="text" value="input">',
    text: 'Input',
    styles: [
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'padding',
        inputClass: 'editPadding',
        label: 'Padding',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: false,
    includeVal: true
    }
);
Widgets.insert(
  {
    name: 'titulo',
    icon: 'flaticon-font13',
    template: '<h1>Titulo</h1>',
    text: 'Título',
    styles: [
      {
        name: 'font-size',
        inputClass: 'editFontSize',
        label: 'Font Size',
      },
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'padding',
        inputClass: 'editPadding',
        label: 'Padding',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: true
    }
);
Widgets.insert(
  {
    name: 'titulo2',
    icon: 'flaticon-font13',
    template: '<h2>Titulo2</h2>',
    text: 'Título2',
    styles: [
      {
        name: 'font-size',
        inputClass: 'editFontSize',
        label: 'Font Size',
      },
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'padding',
        inputClass: 'editPadding',
        label: 'Padding',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: true
    }
);

Widgets.insert(
  {
    name: 'select',
    icon: 'flaticon-drop10',
    template: '<select class="form-control"><option value="opcion1">Opcion 1</option></select>',
    styles: [
      {
        name: 'color',
        inputClass: 'editColor',
        label: 'Color',
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
      },
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: false,
    includeList: true
    }
);

Widgets.insert(
  {
    name: 'image',
    icon: 'flaticon-image2',
    template: '<img src="..." alt="image">',
    src: '',
    styles: [
      {
        name: 'height',
        inputClass: 'editHeight',
        label: 'Height',
      },
      {
        name: 'width',
        inputClass: 'editWidth',
        label: 'Width',
      },
      {
        name: 'border',
        inputClass: 'editBorder',
        label: 'Border',
      },
      {
        name: 'margin',
        inputClass: 'editDisplay',
        label: 'Margin',
      }
    ],
    includeText: false,
    includeList: false,
    includeSrc: true
    }
);
