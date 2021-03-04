# TeamLoop

## About

A React/Redux app to facilitate communication between teams.

View on [my personal site](https://teamloop.manarm.co/), or download and run locally with npm install; npm start.

## Guide

Create items, called 'loops', and assign them to people on your team. Items can be of three different types.
1. Task: A todo, with a title and description. Has 3 phases: new, in progress, and Complete.
2. Thought: An observation. Goes from new to complete once the recipient has acknowledged it.
3. Question: A yes/no question. Goes from new to complete once the recipient has answered. 

For now, everything lives in memory. There are two users who can assign loops to themselves or each other. Start with a blank sandbox, or load demo data from the log-in screen to populate some premade items. A refresh will reset all state.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
