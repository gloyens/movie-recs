# MovieBot
### Live website: https://movie-recs-seven.vercel.app

Thanks for checking out MovieBot!
You'll need an OpenAI API key to use it. If you don't have one, feel free to check out the video below to see how it works:

https://github.com/gloyens/movie-recs/assets/92999775/f4020883-0c4a-4e72-9828-bb211fbc2c90



## What is this project?
This is a movie recommendation app based on the OpenAI API. It'll ask you a series of questions - different every time - then give you recommendations based on what you've answered.

## Aim
The aim for this website was to get a handle on OpenAI's API, so that I could use it as a stepping stone for bigger and better apps in the future.

I also used it as an opportunity to get more familiar with **Next.js 13** and the general process of creating projects from start to finish - using packages, APIs, **[CSS Components](https://www.css-components.net/)** and so on. All pretty straightforward stuff, but it takes a bit of practice to get to grips with everything, so this was a welcome opportunity to do so.

I was also able to use **[TMDB](https://developer.themoviedb.org/reference/intro/getting-started)** to get the movie posters, which was great because my experience with APIs is particularly limited. Playing with this really demystified the process.

## How it works

This app is pretty much just ChatGPT in the background, which I talk to through the OpenAI API. I start off with a (really long!) prompt telling it how to behave, after which it spits out a list of questions in JSON format, one by one. After all the questions have been answered, it gives a list of recommendations, also in JSON format.

After setting up the app so that I could communicate with it using a basic `<input>` tag, all I really needed to do was make it look pretty. Part of that meant feeding the movie titles into the TMDB API and getting the posters, but the rest of it was mostly CSS, error handling and prompt massaging. Really fun project overall! 

The website uses Next 13 with Typescript and the /app router, hosted on Vercel. Pages are built from traditional React components as well as with **[CSS Components](https://www.css-components.net/)**.
