# Design Bright Website

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
      * 
    * server.js -- Express client side server

## Installation Instructions
This requires Node v6.9.5 and MySQL to be installed.

Once those are installed navigate to the root folder and execute the following commands.
```
cd 
```