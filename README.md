# timewaste-tracker

## About

Simple app to visualize the time a group of people spent in games based on their steam statistics.

## Local development

To locally develop the app, you need to first create a `.env.local` file inside the `./next-app` directory. Inside that file you need to add the following environment variables:

PLAYERS_JSON: The array of player objects that defines which player profiles you want to track (see the [model](./next-app/types/player.ts) for reference).
STEAM_API_KEY: Your api key to access the Steam api.
