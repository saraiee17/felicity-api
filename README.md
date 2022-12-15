# felicity-api

Felicity means happiness or the ability to find appropriate expressions for one’s thoughts. This app allows users more autonomy when it comes to their mental health. It's a website where users can track their mood and receive suggestions as well as visualize patterns and data over time through calendar and graphs.


##Back end Built With
-NodeJS
-Express
-Knex
-MySQL

## To Install

Clone this repository
$ git clone git@github.com:saraiee17/felicity-api.git

Go into the repository
$ cd felicity-api

Install dependencies
$ npm install

Creat.env
DB_LOCAL_DBNAME='your database name here'
DB_LOCAL_USER='your user name here'
DB_LOCAL_PASSWORD='your password here'
JWT_KEY=some_random_string
PORT= your chosen port|| 8080

Migrate Data 
$ knex migrate:latest
$knex seed:make user_table
$knex seed:make emotions
$knex seed:run

Run the app
$ node index.js
