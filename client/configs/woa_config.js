woa_config = `{
  "commonUrl": "http://www.diarioregistrado.com/economia",
  "newsTemplate": {
    "name": "Diario Registrado News",
    "tag": "news",
    "xpath": ".//div[@id='frame-content']/div[1]/div[1]/div[1]/section[1]/article"
  },
  "properties": [
    {
      "name": "Title",
      "tag": "title",
      "xpath": "div[1]/div[2]/div[1]/a[1]/h3[1]"
    },
    {
      "name": "Content",
      "tag": "content",
      "xpath": "div[1]/div[2]/div[1]/a[1]/p[1]"
    },
    {
      "name": "Image",
      "tag": "thumbnail",
      "xpath": "div[1]/div[1]/a[1]/div[1]"
    },
    {
      "name": "Tag",
      "tag": "tag",
      "xpath": "div[1]/div[2]/div[1]/div[1]/h4[1]/a[1]"
    }
  ],
  "decoratedTemplate": {
    "selectMessage": "showRelatedTweets",
    "mapMessageParam" : {
        "key": "keywords",
        "value": "Tag"
    }
  }
}`;
