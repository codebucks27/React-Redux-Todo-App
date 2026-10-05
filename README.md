# Build TODO App with Redux and React JS

This repository contains code for Todo app with react-redux.

View Demo:
https://react-redux-todo-app-lac.vercel.app/

If you want to learn how to create it please follow below tutorial:

https://youtu.be/YhgSuUkWlK4

If you prefer the blog format then checkout this link👇: <br />
<a href="https://devdreaming.com/videos/build-stunning-portfolio-website-react-js-framer-motion#code-links" target="_blank">Checkout this blog on How to Build a Todo App with Redux and React JS</a> <br />


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Dependency and tooling update

The original tutorial and CRA notes above are retained for reference. The app now uses React 19 (`createRoot`), Redux Toolkit 2/Redux 5/React Redux 9, Framer Motion 14 and React Icons 5, with Vite 8 replacing CRA. JSX entry files use `.jsx`; the stale starter test is migrated to actual todo-flow coverage using Vitest and current Testing Library; ESLint 9 is retained for React plugin compatibility.

Use Bun 1.4.2: `bun install --frozen-lockfile`, `bun run start` (or `bun run dev`, port 3000), `bun run lint`, `bun run test` (`bun run test:watch` for watch mode), `bun run build`, and `bun run preview`. Node 22.22.2+, 24.15+ or 26+ is required by the development tools. Production files still go to `build/`, including `third-party-licenses.md`; public assets and SPA routing are preserved, and build targets follow the original Browserslist production query. Existing `REACT_APP_*`, `process.env.NODE_ENV`, `process.env.PUBLIC_URL` and HTML `%PUBLIC_URL%` remain supported; `PUBLIC_URL` also sets the asset base path. No environment values are required.
