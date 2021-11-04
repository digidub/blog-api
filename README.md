# Blog REST API

A REST API built using Node & Express. Data is stored via Mongoose/MongoDB. Authentication using PassportJS

The API was developed to handle blog content:

 - Allow authenticated users to Create, Read, Update and Delete blog posts and blog comments
 - Allow non-authenticated users to Read blog posts and Create and Read blog comments
 
*Note*: The front-end admin panel (to allow authorised users to interact with the API as per the first bullet above) can be accessed here: [**blog API client**](https://github.com/digidub/blog-admin-frontend).

## Skills Employed

In building this project I leveraged the following concepts and technologies:

- **Node & Express**
  - Building a lightweight Express app to listen for incoming requests
  - Routing HTTP methods (GET, POST, PUT, DELETE) to appropriate API URI endpoints
  - Responding to HTTP methods using asynchronous modular control functions
  - Consistent error handling
  - Separation of Models, Routes and Controllers
  - Using middleware to handle authentication (see below)
- **Authentication**
  - Using PassportJS to handle authentication
  - Creating multiple strategies to handle stateless authentication:
    - LocalStrategy for initial verification & JWT token retrieval
    - JWTStrategy for stateless auth
  - Stateless authentication allowing both JWT tokens AND http Cookies (for secure client side authentication storage)
- **Database**
  - Creation and validation of MongoDB document schema using Mongoose
  - asynchronous fetching and checking of database data
  

