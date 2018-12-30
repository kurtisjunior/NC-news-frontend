# NorthCoders News Front-end

This project uses the data from a backend project: https://kurtisncnews.herokuapp.com/api to create a dynamic front-end user interface  using React. 

For example, https://kurtisncnews.herokuapp.com/api/articles, is the API GET request endpoint for all articles. This same GET request is used to render articles to the homepage of the front end exemplified here: https://kurtisncnews.netlify.com

The site loads without the user being logged in. This doesn’t influence the user’s navigation of the app but it does prevent the user from making comments, voting, or posting articles (notified with messages to log-in). Once logged in the user has full access and has access to their unique profile page to view their site activity. However, users may only delete their own articles and can place only one vote at any time. 

## Getting started
Clone the project from github and navigate to the file.  Run NPM install to ensure all dependencies have been installed – react, react-dom, react-strap, axios (to make api requests), reachrouter (for component links and navigation) and moments. 

## The site allows users to: 
- Browse all articles – with total number of comments and votes 
- Filter articles by comment count, votes and date posted
- Create a new article
- Comment on an existing article
- View their own profile activity 
- View the profiles of other users
- Links to handy sites in the footer

The project can then be run locally with the command NPM START.

Author: Kurtis Angell – learning Javascript at Northcoders. 

