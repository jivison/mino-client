# Mino Client

![Mino logo](src/assets/logo.svg)

This is the frontend for my final project Mino. Mino is a music collection aggregation service that allows you to view your entire music collection in one spot. It currently has seeding support for Spotify, Youtube, and Vinyl with more to come in the future.

This app is built with React and Sass. The backend is built with Ruby on Rails and can be found at [mino-api](https://github.com/jivison/mino-api).

## Running the app yourself

`yarn start` will invoke [start-api.sh](start-api.sh), which will attempt to start the rails server. If you would like to use the script, simply change the path to work with your local machine. The ports chosen are not arbitrary as the Rails server is set up to accept CORS requests from port 7879. You can change this under `/config/application.rb` on the api.

## Structure

The router in `App.js` serves pages, which can be found in `/src/pages/`. These pages load components from `/src/components/`. `helpers/` contain components that are used more than once, while every component loose in `components/` is only called once.

`/src/api` contains helpers to interact with the Rails API. 

`/src/icons` contains icon components and styles.

`/src/models` contains no components, but API requests to the Rails server. `query.js` is a wrapper to the server itself. It is also contains the URL to the Rails server.

`/src/assets` contains images rendered in the application and the favicon.

`/src/styles` contains all the CSS and SASS of the application. If you would like to make site-wide changes to fonts or colours, you can edit `vars.css`. The `styles` folder follows the same structure as `/src/components`