# myMovies
## Overview

![Image](/src/images/mymovies.png)

This is a client-side of a movie database App called myMovies  which fetches data from its server-side (MyMovies-API). It allows users to search for and save information about different movies, directors, and genres. Users will also be able to register, update their personal information, and create a list of their favorite movies.

A user need to first create an account (register ) to access the full features of the app.

Check myMovies-API documentation
Essential Views and Features:

Login view

    Allows users to log in with a username and password

Registration view

    Allows new users to register (username, password, email, birthday)

Main view

    Returns a list of ALL movies to the user (each listed item with an image, title, and release year)
    Sorting and filtering
    Ability to select a movie for more details

Single Movie view

    Returns data (image, title, release year, description, genre, director, actors) about a single movie to the user.
    Allows users to add a movie to their list of favorites
    Allow users to move to director and genre viewv

Director view

    Returns data about a director's name, bio and birth year.

Genre view

    Returns data about a genre, with a name and description.

Profile view

    Allows users to update their user info (username, password, email, date of birth)
    Allows existing users to deregister
    Displays user's favorite movies
    Allows users to remove a movie from their list of favorites

Technical Features:

    It is a single-page application (SPA)
    It uses state routing to navigate between views and share URLs
    It gives users the option to filter movies
    It initially uses Parcel as its build tool
    React Redux is written using the React library and React Redux
    It uses React Bootstrap as a UI library for styling and responsiveness
    It contains a mix of class components and function components
    It is hosted online

Dependencies:

    React
    react-bootstrap
    react-dom
    react-router-dom
    Redux
    Axios
    prop-types
 