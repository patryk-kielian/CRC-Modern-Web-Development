#### This project was created as part of the _Corporate Readiness Certificate_: _Modern Web Apps Development_ course.
 
 
#### I would like to express my gratitude to **ING Hubs Poland** for organizing the course.


### The website is hosted and available **[here](https://crc-modern-web-development.vercel.app/)**

_Please notice that the project is using Heroku to host the backend part as well as to provide the database. Heroku is a paid service, which means I cannot always run it. When it is unavailable, the website will not be able to access the database with the courses and the users and the functionality will be very limited._

##### In order to run locally:

- inside the client folder:

  npm run dev
- inside the server folder:

  npm start
  
  *The backend will still try to access the database hosted on Heroku, the same disclaimer as above applies.*

#### Project description

The project is a web application for a fictional company called **Trainings**. It serves to display the available courses and let users create accounts, sign up and out of said trainings and display the ones they currently attend. An admin user can also create new courses and delete those that have been made by him.

#### Sample user data

- admin:

  username: admin
  
  password: test
- regular user:

  username: user
  
  password: test

More regular accounts can be created on the website

#### Technologies used

- JavaScript
- React
- Node.js
- Express
- MySQL
- Vite
- Vitest
- bcrypt
- Axios
- Figma [link to project](https://www.figma.com/community/file/1242498176864334128)

Hosting: Vercel, Heroku, ClearDB
