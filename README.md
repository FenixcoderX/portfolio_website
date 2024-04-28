# Portfolio website

React | TypeScript | TailwindCSS | Swiper | GeoAPIfy | Custom Analytics API | Netlify Functions

[Link to Analytics API](https://github.com/FenixcoderX/Analytics_API)

A single-page portfolio website that has info section, skills and projects. Website uses information about IP to set the language at first visit and works with custom analitics API to collect some data. Netlify functions are used to fetch data from APIs.

## Getting started

1. Find the `data.json-example` file in the `src/assets` directory.
2. Change the name to `data.json`.

3. Find the `images` folder in the `public/assets` directory.
4. Change the name to `img`.

**Optional:**

5. Find the `.env-example` file in the root directory.
6. Change the name to `.env`
7. If you want to use IP information, follow these steps:
   - Register on [Geoapify](https://www.geoapify.com).
   - Obtain an API key for the IP Geolocation API.
   - Write this key into the `.env` file as `REACT_APP_API_KEY`.
8. If you want to test the **Analytics API**, you need to start it first.
9. To start the application with Netlify functions that are used to fetch data from APIs, you need to install the Netlify CLI globally using the command `npm install netlify-cli -g`.

Then, run the following commands in your terminal:

```bash
npm install  # to install all project dependencies
npm start    # to start the development server without use of Netlify functions
netlify dev  # to start the development server with use of Netlify functions
```

Open [http://localhost:3000](http://localhost:3000) if you use npm start command

Open [http://localhost:8888](http://localhost:8888) if you use netlify dev command

## License

This project is licensed under the MIT License - see the [LICENSE FILE](LICENSE.txt) file for details.
