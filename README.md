# GitHub Users API

[View the demo](https://clever-twilight-811798.netlify.app)

## Overview

A simple user interface to query GitHub's Users API.

This tech stack is what I'd use when creating an enterprise web application. While the UI is fairly simple, I wanted to show how I'd approach creating a new repo from scratch.

The inclusion of Prettier, ESLint, TypeScript, and Cypress helps bake in quality from the get go.

## Technologies Used

⚛️ React for building out the user interface
💪🏾 TypeScript as the primary language to keep things strong(ly typed).
🛠 Cypress for E2E testing
🧼 ESLint + Prettier for keeping code clean
⚡️ Vite for a quick and easy development environment
☁️ Netlify for simple deployments

## Todo

- Test on smaller devices

## Things worth noting

### Constructing my own pagination URLs instead of using GitHub's

My URL is the single source of truth. I want to ensure that we don't lose state when we refresh the page.

### Basic progressive enhancement using `prefers-reduced-motion`

Using the `prefers-reduced-motion` media query ensures that I don't subject users who prefer no motion to unnecessary animations. By default I offer a simple opacity change when hovering over a list item. If the media query satisfies `prefers-reduced-motion: no-preference`, then I add some additional animation.
