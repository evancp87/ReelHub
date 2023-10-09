# Frontend Mentor - Entertainment App site solution

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the backend server:

- navigate to the backend directory and enter the command to start the server:

```bash
ts-node server.ts

```

Then, navigate to the frontend directory and start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
- Add/Remove bookmarks from all movies and TV series
- Search for relevant shows on all pages

### Expected Behaviour

- General
  - The navigation menu should be fixed to the left for larger screens. Use the "Desktop - Home" page in the design as a visual reference.
- Home
  - The trending section should scroll sideways to reveal other trending shows
  - Any search input should search through all shows (i.e. all movies and TV series)
- Movies
  - This page should only display shows with the "Movie" category
  - Any search input should search through all movies
- TV Series
  - This page should only display shows with the "TV Series" category
  - Any search input should search through all TV series
- Bookmarked Shows
  - This page should display all bookmarked shows from both categories
  - Any search input should search through all bookmarked shows

### Screenshot

![](./frontend/public/images/screenshot.png)

### Links

- Solution URL: [Github repo](https://github.com/evancp87)
- Live Site URL: [Vercel live site](https://reelhub.vercel.app/)

## My process

### Built with

- Next JS
- TypeScript
- RTK Query
- Jest
- Mock Service worker
- Axios
- Joi
- React Toastify
- Bcrypt
- Cloudinary
- Cors
- Express
- Mongoose
- Json Web Tokens
- Tailwind CSS
- Daisy UI

### What I learned

This was an interesting challenge, as I most things in my stack where things i'd never implemented before. Next JS took some getting used to, as I chose the use the lates version, which is fairly new. There seemed to be tradeoffs in doing things that seemed simple with React, like creating a catch all route for invalid urls with React Router, that had a few extra steps in Next. Once I got my head around this, i found Next to handle a lot of things very gracefully, and once understood are actually easier and more configured to do things that take a bit more work in React, such as creating layout components.

This was my first project using TypeScript and i definitely felt the benefits of the strict typing, although it definitely slowed me down trying to understand some of the error messages, and having to import types from each 3rd party library.

I used RTK Query as an alternative to RTK, and found it very powerful, needing less set up than RTK slices, doing away with useEffect hooks in components, and giving hooks to handle loading and error states, rather than writing manually in RTK. Like Next JS 13, it seems like quite a new technology, and sometimes it was hard to find answers to problems online. There were also some compatibility issues with a few things, meaning i couldn't use, for example, Next-Auth, or there was also overlap in functionality with Next JS, i.e. loading hooks in RTK Query vs Next JS built in Loading components. I enjoyed using it, but I would use it in certain use cases.

I've been using Tailwind for a while now, but I feel that i've reached the limits of the framework, as there were definitely things in this challenge I couldn't build with it very easily, and I'm not sure if it'll be something i use that often in future.

I used Cloudinary to handle image uploads and it was fairly straightforward. I struggled with using AWS buckets + Multer, before deciding on Cloudinary. I reckon i could've done something with this option, but Cloudinary was the better option i think.

### Continued development

With Next JS, i feel like now I have an understanding of how version 13 works, with the app router, I can go further with using Next JS server and api functionality. I could also do with learning the older versions of Next.

With TypeScript i need to keep using it and building up an understanding of the errors and how to approach them. I would also like to use more advanced syntax, such as generics.

## Author

- Website - [Evan Parker](https://www.evanparker.co.uk/)
- Frontend Mentor - [@evancp87](https://www.frontendmentor.io/profile/evancp87)
