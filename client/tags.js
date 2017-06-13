Tags = new Meteor.Collection(null);
// No usar punto  . en el name de la tag porque esa es la forma q se usa para detectar luego q es un objeto -
// usar solo letras y numeros
// los nombres no deben repetirse
Tags.insert(
  {
    name: 'tag1',
    text: 'TAG 1 String Unico',
    process: `function() { return 'Biblioteca ON line';}`,
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
    name: 'autor',
    text: 'TAG Autor - Objeto unico',
    process: `function() {
      return {
        nombre: 'Juan Perez',
        'fecha-nacimiento': '13-01-1970',
        'nacionalidad': 'Argentino'
      };
    }`,
    type: 'object',
    items: ['nombre', 'fecha-nacimiento', 'nacionalidad']
  }
);
Tags.insert(
  {
    name: 'libros1',
    text: 'TAG SET de LIBROS con propiedades: título, autor y editorial',
    process: `function() {
      return [
        {
          titulo: 'Una noche fatal',
          autor: 'Juan Perez',
          editorial: 'nueva edcion'
        },
        {
          titulo: 'Otro libro mas',
          autor: 'Matilda Lopez',
          editorial: 'Editorial masa'
        }
    ];
    }`,
    type: 'array',
    items: ['titulo', 'autor', 'editorial']
  }
);
Tags.insert(
  {
    name: 'diario-WOA',
    text: 'TAG SET de WOA con info de noticias',
    process: `function(context, callback) {
      //This method is mandatory. It will be called by WOA when the API is ready
	    context.initWOAscript = function(){
        var commonUrl = "http://www.diarioregistrado.com/economia",
            result = [];
		      try{
            	//Defining a IO template
            	var newsTemplate = WOA.newInformationObjectTemplate({
            		name: "Diario Registrado News", tag: "news", url: commonUrl,
            		xpath: './/div[@id="frame-content"]/div[1]/div[1]/div[1]/section[1]/article'
            	});
            	//Add it a TITLE property
            	newsTemplate.addProperty({
            		name: "Title", tag: "title", url: commonUrl,
            		xpath: 'div[1]/div[2]/div[1]/a[1]/h3[1]'
            	});
            	//Add it a CONTENT property
            	newsTemplate.addProperty({
            		name: "Content", tag: "content", url: commonUrl,
            		xpath: 'div[1]/div[2]/div[1]/a[1]/p[1]'
            	});
            	//Add it a THUMBNAIL property
            	newsTemplate.addProperty({
            		name: "Image", tag: "thumbnail", url: commonUrl,
            		xpath: 'div[1]/div[1]/a[1]/div[1]'
            	});
            	//Add it a TAG property
            	newsTemplate.addProperty({
            		name: "Tag", tag: "tag", url: commonUrl,
            		xpath: 'div[1]/div[2]/div[1]/div[1]/h4[1]/a[1]'
            	});
            	//Apply a decorator & select some messages
            	var decoratedTemplate = WOA.newDecorator("NewsDecorator", newsTemplate);
            	decoratedTemplate.selectMessage("showRelatedTweets");
            	decoratedTemplate.mapMessageParam("keywords", "Tag");

            	//Retrieving Information Objects based on the templates
              WOA.getInformationObjects(decoratedTemplate, function(ioses){
                  for (var i = 0; i < ioses.length; i++) {
                      result.push({
                          'titulo': ioses[i].getPropertyByTagName("title").getValue()
                      });
                  }
                  callback(result);
              });
          }catch(err){console.log(err);}
        }
    }`,
    type: 'array',
    items: ['titulo']
  }
);
