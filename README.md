# simple_stack
https://tranquil-inlet-96090.herokuapp.com/ 
This is a simple stack composed of Mongodb, Monk, express, Node.js, jQuery/AJAX then Snap.svg on the frontend.
The database consits of a collection of json objects which are the attributes for a svg element, most importantly each record has the x,y coordinates of circles.

Upon loading the webapp pulls all circles from the database and plots them. Upon clicking the background, a circle is drawn and stored into the db. On circle click, that element is removed from the view and database.

## Next steps include:
- making the app realtime(socket.io)
- plot circle on click anywhere, remove all circles new circle overlaps with: crowd sourcing a field of evenly spaced circles
- making each user unqiue: cookie stored in db: each unique user = differnt color
- taking advantage of the timestamp upon which element was inserted

```javascript
{
    "_id": { "$oid": "573abbc4a6f2921100851ab1" },
    "timestamp": "1463466973029",
    "cx": "195",
    "cy": "168",
    "r": "24",
    "fill": "coral",
    "stroke": "coral",
    "strokeOpacity": "0.3",
    "strokeWidth": "10"
}
```


Stitched together from the following tutorials and numerous StackOverflow posts:

Create a Web App and RESTful API Server Using the MEAN Stack

https://devcenter.heroku.com/articles/mean-apps-restful-api


CREATING A SIMPLE RESTFUL WEB APP WITH NODE.JS, EXPRESS, AND MONGODB

http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
