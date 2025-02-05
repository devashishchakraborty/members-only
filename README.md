# Members Only

## Description

- "Members Only" is a basic microblogging application built as part of The Odin Project's curriculum. The project focuses on implementing authentication and authorization features, allowing users to create posts and view posts from other users. Only authenticated users can see the authors of the posts, while unauthenticated users can only view the content without knowing who wrote it.
- Live Link -> [Here]()

This project was built using **Express.js** and incorporates concepts such as:
- User authentication (using `passport.js` or custom authentication)
- Authorization (restricting access to certain features based on user roles)
- Database associations (e.g., users and posts)
- MVC architecture


## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Post Creation**: Authenticated users can create new posts.
- **Post Visibility**:
  - Authenticated users can see the author of each post.
  - Unauthenticated users can only see the post content without the author's name.
- **Authorization**: Only authenticated users can create posts.
- **Responsive Design**: The application is designed to work on both desktop and mobile devices.

## Technologies Used

- **Node.js**: Runtime environment for running JavaScript on the server.
- **Express.js**: Web framework for handling requests and routing.
- **Postgres**: Database for storing users and posts.
- **Passport.js**: Authentication middleware for handling user login and session management.
- **EJS/Pug/Handlebars**: Templating engine for rendering views (specify which one you used).
- **Bcrypt**: For hashing user passwords.
- **Express Session**: For managing user sessions.
