# Design Bright Website

## Installation Instructions
This requires Node v6.9.5 and MySQL to be installed.

Once those are installed navigate to the root folder and execute the following commands.
```
cd backend
npm i --only=production
cd ../client
npm i --only=production
```

### Environment Variables

Enter the following information in the .env files for the client and backend.

#### Backend

```
API_PORT = 3000
DB_HOST = localhost
DB_USER = #Database User#
DB_PASS = #Database Password#
DB_PORT = #Database Port#
DB_NAME = #Database Name#
DB_SCHEMA = mysql
PRIVATE_KEY_FILE = #Certificate Key File#
CERTIFICATE_FILE = #Certificate File#
AUTH0_DOMAIN = #Auth0 Domain#
AUTH0_CLIENT_ID = #Auth0 Client ID#
AUTH0_API_ID = #Auth0 API ID#
AUTH0_API_SECRET = #Auth0 API Secret#
CLOUDINARY_NAME = #Cloudinary Name#
CLOUDINARY_KEY = #Cloudinary Key#
CLOUDINARY_SECRET = #Cloudinary Secret#
STRIPE_KEY = #Stripe Key#
STRIPE_SECRET = #Stripe Secret#
EMAIL_PASS = #Email Password#
```

#### Client

```
HTTP_PORT = 3001
HTTPS_PORT = 3002
PRIVATE_KEY_FILE = #Certificate Key File#
CERTIFICATE_FILE = #Certificate File
```

## Run Site

Run the following commands to start the site. Use separate consoles for each block.

#### Backend
```
cd backend
npm start
```

#### Client
```
cd client
npm start
```

## Folder Structure
### API
* backend
  * build -- Compiled code
    * ***app.js*** -- Entry point
  * src -- Source code
    * helpers -- Reusable helper functions.
    * models -- Data access and management functions.
    * routes -- API routes
    * ***app.js*** -- Source code entry point.
  * ***.env*** -- Environment variable file. Not included.

### Client
* client
  * build -- Compiled code
    * dist -- Public files.
      * assets
        * css -- Foundation CSS file
        * fonts -- Font Awesome Fonts
        * img -- Site images
        * js - Compiled JavaScript and Stripe.JS code
      * ***index.html*** -- Root HTML file
    * ***server.js*** -- Entry point
  * src -- Source code
    * client -- Client side JavaScript
      * app -- Main site component.
        * components
          * footer -- Site footer
          * header -- Site header
          * routes -- Site routing.
        * scss -- General SASS
        * index.js -- Main site component entry point
      * helpers -- Reusable helper functions
      * partials -- Reusable components
        * login
          * form -- Login form
          * modal -- Login modal
        * message -- Message and error component
        * overlayModal -- Makes child component a modal
      * scenes -- Site pages
        * advisor -- Become an Advisor page
        * campaign -- Individual Campaign page
        * campaignsList -- Search and Browse Campaigns page
        * editCampaign -- Edit Individual Campaign page
        * help -- Help page
        * home -- Home page
        * mngCampaigns -- Manage Nonprofit User Campaigns page
        * sign -- User management pages
          * scenes
            * login -- Login page
            * register -- Register User page
        * userProfile -- User Profile Pages
          * scenes
            * edit -- Edit Profile page
            * view -- View Profile page
      * store -- Redux Store
        * actions -- Redux Actions
        * constants -- Redux Constants
        * reducers -- Redux Reducers
      * ***index.js*** -- Application wrapped in Redux Store
    * ***server.js*** -- Express client side server