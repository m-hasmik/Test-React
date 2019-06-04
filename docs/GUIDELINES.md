# Frontend Developer Best Practices

This document represents the code guidelines to use while developing this project, please read before getting into it.

## Glossary

- TDD: Test Driven Development

---

## How to structure the project

What we currently do with the projects, is that we divide the concerns into separate folders, based on those concerns, we provide different value to each of the features we construct.

### Utils

All the functions that can be applied globally through the project

### Types

All the flow types that are globally shared

### Actions

The redux actions that can be executed, the name of the file reflects to what Object the actions are in charge of.

### Reducers

It’s the place were we store all the results of our actions, it’s the state of the global application.

### Locales

All the translations files, divided by language.

### Components

All the atomic pieces that conform the Interface of our application, these components can be divided into two segments, depending on how small they are, inside the `common` folder, we can find the smallest pieces, like `Button` or `Header` and outside of this folder, are the components that can be used anywhere in the UI but are a composition of smaller pieces to display the information in a cohesive way.

### Routes

This app, utilizes `react-router` v4, which is a dynamic router, when we say dynamic routing, we mean routing that takes place as your app is rendering, not in a configuration or convention outside of a running app. That means almost everything is a component in React Router.

The Routes are then the composition of our Components into one view that contains all the information desired to fulfil a purpose, for example, in order to display all the Companies, we show the Company component and utilize some logic to load the data from the server, etc.

### API

A collection of endpoints and models that those endpoints are related to, the specific behaviour of the data can be found here, we also utilize the concept of data normalizers, to avoid inconsistency through the application, we define which data and how it’s named through these normalizers and then we use a common language through the app based on it, you can check out the types of each of these models to understand how they can be used.

### Constants

The most general and reusable constants found through the app

## What’s the data flow

In order to understand the data flow of the application, you need to understand a little bit of react and redux, assuming you have those concepts in mind, we can then say the following statement.

This app utilizes the API as the first entry point of data to it, through the API calls, we get the data from the server in the different environments and then normalize that data to the `FlowType` for consistent development. We request the data using an action dispatched by a `Route`, when the User enters a Route, we use the `componentDidMount` lifecycle method to request the data through a `redux` action, which will then trigger an event that calls the API.

Then the event can go into two different paths, we say that the action was successfully completed when the server deliver data to us and that data comes with a response type that is ok, a 300 status code or less for example. Then this data is processed by the normalizer and it’s fed into the reducer, which holds the global state of the App or into the inner state of our view depending on the type of data we receive.

We fix the failure path with one event, the server responded with a status that wasn’t ok, a 400+ status code for example. Then we feed this error into the reducer, which holds the global state of the App or into the inner state of our view depending on the type of data we receive.

From there, the `Route` component is responsible onto feeding the information into the different components displayed in it.

## Code Structure

When talking to product, you’ll usually get these common questions

- Do we need to develop a new component to reflect this data?
- How much time are we going to spend on it?
- how do we ensure that this will work in the long run?

To answer those questions, we can use our framework best practices, but we can also leave some common agreements to leave things clear.

### Components

When developing a component, there are 3 things that you need to keep in mind.

1. Which data do I need?
2. Will it handle different states?
3. What am I testing?

The approach we currently have in the app is with TDD, which means we always create the Test and start thinking on what we want our code to do, before creating the code for it. That makes us think in the responsibilities that the component will have.

There are a couple concepts to keep in mind

_Atomic components:_ It’s a styled component, so basically a component that by it’s own does not have any type of functionality, it’s a common HTML element with defined styles.

_Component:_ It receives values as props and then use this values to understand how it will display the data, it can also be connected to the Store and dispatch actions.

The functionality of a Component can be tested with a unit or an integration test, while an atomic component (common component) should just be tested with a snapshot of it. So we test that we’re not changing the styles unless it’s on purpose.
