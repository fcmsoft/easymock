Grid = new Meteor.Collection(null);
Grid.insert(
  {
    name: '12',
    text: '1 col',
    template: '<div class="row"><div class="col-md-12 column column-1"></div></div>',
    styles: [
      {
        name: 'text-align',
        inputClass: 'editTextAlign',
        label: 'Text Align'
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
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
    ]
  });
Grid.insert(
  {
    name: '6',
    text: '2 col',
    template: '<div class="row"><div class="col-md-6 column column-1"></div><div class="col-md-6 column column-2"></div></div>',
    styles: [
      {
        name: 'text-align',
        inputClass: 'editTextAlign',
        label: 'Text Align'
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
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
    ]
  });
Grid.insert(
  {
    name: '3',
    text: '3 col',
    template: '<div class="row"><div class="col-md-4 column column-1"></div><div class="col-md-4 column column-2"></div><div class="col-md-4 column column-3"></div>',
    styles: [
      {
        name: 'text-align',
        inputClass: 'editTextAlign',
        label: 'Text Align'
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
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
    ]
  });
Grid.insert(
  {
    name: '4',
    text: '4 col',
    template: '<div class="row"><div class="col-md-3 column column-1"></div><div class="col-md-3 column column-2"></div><div class="col-md-3 column column-3"></div><div class="col-md-3 column column-4"></div></div>',
    styles: [
      {
        name: 'text-align',
        inputClass: 'editTextAlign',
        label: 'Text Align'
      },
      {
        name: 'background-color',
        inputClass: 'editBackgroundColor',
        label: 'Background Color',
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
    ]
  });
