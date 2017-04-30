Tags = new Meteor.Collection(null);
// No usar punto  . en el name de la tag porque esa es la forma q se usa para detectar luego q es un objeto -
// usar solo letras y numeros
// los nombres no deben repetirse
Tags.insert(
  {
    name: 'tag1',
    text: 'TAG 1  ',
    process: `function() { return 'hola';}`,
    type: 'string'
  }
);
Tags.insert(
  {
    name: 'tag2',
    text: 'TAG 2  ',
    process: `function() {
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo nulla mauris, varius dictum urna elementum quis. Praesent nec dictum nisi, eu facilisis purus. Pellentesque cursus, ex at ornare aliquam, orci sem accumsan velit, quis molestie libero sapien id ex. Sed ut orci eu libero vulputate interdum eu at nibh. Mauris eget urna eu nunc ultricies accumsan eu et ante. Curabitur sollicitudin bibendum mi nec viverra. Suspendisse quis dignissim leo. Fusce vel scelerisque elit, in vestibulum nulla. Phasellus cursus tempus sollicitudin. Vivamus sodales, sapien at sagittis viverra, mi ex lobortis nibh, ac sollicitudin ipsum felis non lectus. Ut vel nisl interdum, egestas orci eget, vestibulum nulla.';
    }`,
    type: 'string'
  }
);
Tags.insert(
  {
    name: 'tag3',
    text: 'TAG LIBRO con propiedades: título, autor y editorial',
    process: `function() {
      return {
        titulo: 'Una noche fatal',
        autor: 'juan perez',
        editorial: 'nueva edcion'
      };
    }`,
    type: 'object',
    items: ['titulo', 'autor', 'editorial']
  }
);
