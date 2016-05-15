# simple_stack

This is a simple stack composed of Mongodb, express, node.js, jQuery/AJAX and snap.js.svg on the frontend.
The database consits of a collection of json objects which are the attributes for a svg circle element.
Most importantly they store the x,y coordinates of the circle.
Upon mouseup, a circle is drawn and stored into the db. 


{ 
  "_id": { "$oid": "57381512b898ec11007a3522" }, 
  "cx": "1074", 
  "cy": "460", 
  "r": "24", 
  "fill": "coral", 
  "stroke": "coral", 
  "strokeOpacity": "0.3", 
  "strokeWidth": "10" 
}



Stitched together from the following tutorials and numerous StackOverflow posts:

Create a Web App and RESTful API Server Using the MEAN Stack
https://devcenter.heroku.com/articles/mean-apps-restful-api

CREATING A SIMPLE RESTFUL WEB APP WITH NODE.JS, EXPRESS, AND MONGODB
http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/
