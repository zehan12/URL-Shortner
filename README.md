# URL SHORTNER

URL shortening is a technique on the World Wide Web that enables the Uniform Resource Locator to be made considerably shorter and still direct to the desired page. This is done by using a redirect path to a web page that has a long URL.

### Live Link
https://url-shortner-zehan12.vercel.app/

## Usage
When the user enters the link, a short link will appear. Use clipboard emote to copy the link. The link will redirect you to the original link.

It has been deployed on Render.com . If you want then you can buy a domain and connect it with the render.com as well. This will shortner the link even more.

## Installation

1. Clone this repo
   git clone https://github.com/zehan12/url-shortner
   
2. Install npm packages
  yarn add
   
2. Start the project
 yarn start
   
## Screenshots
   
   
1. Home Page

[![image](https://www.linkpicture.com/q/How-to-take-a-Screenshot-in-Windows-11-4-Ways-Microsoft-Community-Hub-Google-Chrome-27-11-2022-14_34_20.png)](https://www.linkpicture.com/view.php?img=LPic63832cbe8c0ac787479756)

2. Entered the link in the text field and clicked submit

[![image](https://www.linkpicture.com/q/React-App-Google-Chrome-27-11-2022-15_05_40.png)](https://www.linkpicture.com/view.php?img=LPic6383309cd186d783625410)

3. Short Link Generated

[![image](https://www.linkpicture.com/q/React-App-Google-Chrome-27-11-2022-15_03_00.png)](https://www.linkpicture.com/view.php?img=LPic638330e4a67811632795380)

click to navigation to vist the link or copy to cilpboard

# Endpoints

### CREATE URL
`POST /api/url/short/`

Example request body:
```JSON
{
  "data":{
   		click: 0
   		createdAt: "2022-11-27T09:36:04.916Z"
   		originalUrl: "https://medium.com/@zehan9211/the-inception-of-tailwind-css-in-create-react-app-with-yarn-46c958a0b339"
  		shortUrl: "https://url-e30t.onrender.com/8de6gj"
  		updatedAt: "2022-11-27T09:36:04.916Z"
   		 urlCode : "8de6gj"
   		 __v: 0
   		 _id: "63832f84ae896fb1ae662443"
  }
}
```

Required fields: `originalUrl`.


### GET ALL

`GET /api/url/show`

Example request body:
```JSON
{
  [
   {
    	click: 0
    	createdAt: "2022-11-27T09:36:04.916Z"
    	originalUrl: "https://medium.com/@zehan9211/the-inception-of-tailwind-css-in-		create-react-app-with-yarn-46c958a0b339"
    	shortUrl: "https://url-e30t.onrender.com/8de6gj"
     	updatedAt: "2022-11-27T09:36:04.916Z"
    	urlCode : "8de6gj"
    	__v: 0
    	_id: "63832f84ae896fb1ae662443"
 	}
  ]
}
```

Required fields: `null`

### DELETE  URL

`GET /api/url/short/:code`

Example request body:
```JSON
{
  "data":{
   		click: 0
   		createdAt: "2022-11-27T09:36:04.916Z"
   		originalUrl: "https://medium.com/@zehan9211/the-inception-of-tailwind-css-in-create-react-app-with-yarn-46c958a0b339"
  		shortUrl: "https://url-e30t.onrender.com/8de6gj"
  		updatedAt: "2022-11-27T09:36:04.916Z"
   		 urlCode : "8de6gj"
   		 __v: 0
   		 _id: "63832f84ae896fb1ae662443"
  }
}
```

Required fields: `code`

