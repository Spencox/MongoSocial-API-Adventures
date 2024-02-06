# MongoSocial-API-Adventures

## Description

The motivation behind the creation of MongoSocial-API-Adventures is to provide a robust backend system for a social networking platform. The project was built to address the need for a scalable and efficient API that can handle the complexities of a social network, including user management, thought sharing, reactions, and friend connections.

This project solves the problem of developing a backend infrastructure for a social networking platform by offering a comprehensive API that allows users to perform various actions, such as creating and updating profiles, sharing thoughts, and interacting with friends' content. It leverages MongoDB as a NoSQL database and Mongoose as an ODM library to efficiently store and retrieve data, which is crucial for managing large volumes of unstructured data commonly found in social networks.

Through the development of MongoSocial-API-Adventures, I gained valuable experience in building scalable web applications, managing complex data structures, and implementing CRUD operations efficiently. I also learned about the importance of error handling, data validation, and API design in ensuring the reliability and usability of such a system. Overall, this project demonstrates the capabilities of Node.js and MongoDB for creating powerful and flexible backend solutions for social networking platforms.

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Git hub repo location: https://github.com/spencox/MongoSocial-API-Adventures 

To run MongoSocial-API-Adventures locally, follow these installation steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/spencox/MongoSocial-API-Adventures.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MongoSocial-API-Adventures
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a MongoDB database and provide the connection URL in a `.env` file:

   ```env
   MONGODB_URI=your-mongodb-connection-uri
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. The application should now be running on `http://localhost:3000`.

## Usage

MongoSocial-API-Adventures provides a RESTful API with various endpoints for managing users, thoughts, and reactions. Here are some examples of how to use the API:

- **Users**:
  - Create a new user: `POST /api/users`
  - Get all users: `GET /api/users`
  - Get a single user by ID: `GET /api/users/:userId`
  - Update a user by ID: `PUT /api/users/:userId`
  - Delete a user by ID: `DELETE /api/users/:userId`

- **Thoughts**:
  - Create a new thought: `POST /api/thoughts`
  - Get all thoughts: `GET /api/thoughts`
  - Get a single thought by ID: `GET /api/thoughts/:thoughtId`
  - Update a thought by ID: `PUT /api/thoughts/:thoughtId`
  - Delete a thought by ID: `DELETE /api/thoughts/:thoughtId`

- **Reactions**:
  - Create a reaction for a thought: `POST /api/thoughts/:thoughtId/reactions`
  - Delete a reaction by ID: `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`

- **Friendships**:
  - Add a friend to a user's friend list: `POST /api/users/:userId/friends/:friendId`
  - Remove a friend from a user's friend list: `DELETE /api/users/:userId/friends/:friendId`

Refer to the API documentation for detailed information on request payloads and response formats.

## Credits

This project was built using the following resources:

Mongoose Documentation. Accessed [insert access date]. https://mongoosejs.com/docs/guide.html

"Mastering Email Validation in Mongoose: Syntax, Uniqueness, and Beyond." https://blog.bounceless.io/mastering-email-validation-in-mongoose-syntax-uniqueness-and-beyond/

## License

This project is licensed under the [MIT License](LICENSE).

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- User management (CRUD operations)
- Thought management (CRUD operations)
- Reaction management (CRUD operations)
- Friend list management
- Data validation and error handling
- MongoDB database integration
- RESTful API for social network functionality
