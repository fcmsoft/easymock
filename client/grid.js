Grid = new Meteor.Collection(null);
Grid.insert(
  {
    name: '12',
    text: '1 col',
    template: '<div class="row"><div class="col-md-12 column column-1"></div></div>'
  });
Grid.insert(
  {
    name: '6',
    text: '2 col',
    template: '<div class="row"><div class="col-md-6 column column-1"></div><div class="col-md-6 column column-2"></div></div>'
  });
Grid.insert(
  {
    name: '3',
    text: '3 col',
    template: '<div class="row"><div class="col-md-4 column column-1"></div><div class="col-md-4 column column-2"></div><div class="col-md-4 column column-3"></div>'
  });
Grid.insert(
  {
    name: '4',
    text: '4 col',
    template: '<div class="row"><div class="col-md-3 column column-1"></div><div class="col-md-3 column column-2"></div><div class="col-md-3 column column-3"></div><div class="col-md-3 column column-4"></div></div>'
  });
