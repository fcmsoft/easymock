woa_config = `{
  'commonUrl': 'http://www.diarioregistrado.com/economia',
  'newsTemplate': {
    'name': 'Diario Registrado News',
    'tag': 'news',
    'xpath': '/html/body/frame-pages/frame-page/page-search/div/div[2]/a'
  },
  'properties': [
    {
      'name': 'Title',
      'tag': 'title',
      'xpath': 'div/div/div[2]'
    },
    {
      'name': 'Content',
      'tag': 'content',
      'xpath': 'div/div/div[3]'
    },
    {
      'name': 'Image',
      'tag': 'thumbnail',
      'xpath': 'div/picture/img'
    },
    {
      'name': 'Fecha',
      'tag': 'fecha',
      'xpath': 'div/div/div[1]'
    }
  ],
  'decoratedTemplate': {
    'selectMessage': 'showRelatedTweets',
    'mapMessageParam' : {
        'key': 'keywords',
        'value': 'Tag'
    }
  }
}`;
woa_config2 = `{
  'commonUrl': 'http://fortunaweb.com.ar/category/economia/',
  'newsTemplate': {
    'name': 'Fortuna News',
    'tag': 'news',
    'xpath': './/div[@id="contenido-general-seccion"]/article'
  },
  'properties': [
    {
      'name': 'Title',
      'tag': 'title',
      'xpath': 'h3[1]/a[1]'
    },
    {
      'name': 'Content',
      'tag': 'content',
      'xpath': 'div[1]/p[1]'
    },
    /*{
      'name': 'Image',
      'tag': 'thumbnail',
      'xpath': 'div[1]/img'
    }*/
  ],
  'decoratedTemplate': {
    'selectMessage': 'showRelatedTweets',
    'mapMessageParam' : {
        'key': 'keywords',
        'value': 'Tag'
    }
  }
}`;
