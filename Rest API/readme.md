# Project API with MongoDB and Express.js

This project is a RESTful API built with Node.js, Express.js, and MongoDB to manage project-related data.

## Features

- Add a new project (via body or query parameters)
- Retrieve all projects
- Retrieve a project by ID
- Update a project by ID
- Delete a project by ID

## Prerequisites

- Node.js installed on your machine
- MongoDB Atlas or a local MongoDB instance
- Postman or any HTTP client for testing the API

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a .env file in the root directory and add the following**:
   ```
   MONGO_URI=<your-mongodb-connection-string>
   PORT=<your-desired-port>
   ```

4. **Start the server:**:
   ```
   node server.js
   ``` 

Your server should now be running on ```bash http://localhost:<PORT>```

## API Endpoints

### Base URL
   ```bash
   http://localhost:<PORT> 
   ```

## Endpoints

1. *Add a New Project (via Request Body)*
### POST ```/api/add```
- **Body**: JSON
  ```bash
    {
        "name": "Project Name",
        "description": "Project Description",
        "status": "ongoing"
    }
   ```
2. *Add a New Project (via Query Parameters)*
### POST ```/api/addProjectWithQuery?name=<name>&description=<description>&status=<status>```
- **Query parameters**
    - ```name``` (required): Name of the project
    - ```description``` (required): Description of the project
    - ```status``` (optional): Status of the project (default: ongoing)     


3. *Retrieve All Projects*
### GET ```/api/getall```

4. *Retrieve a Project by ID*
### GET ```/api/:id```
- **Path Parameters**:
    - ```id```: The ID of the project 

5. *Update a Project by ID*
### POST ```/api/update/:id```
-  **Path Parameters**:
    - ```id```: The ID of the project to update
-  **Body**: JSON
   ```bash
    {
        "name": "Updated Name",
        "description": "Updated Description",
        "status": "completed"
    }
   ``` 
6. *Delete a Project by ID*
### POST ```/api/delete:id```
- **Path Parameters**:
    - ```id```: The ID of the project to delete

## Example Usage 
### Testin with Postman
1. Use the **GET** ```/api/add endpoint to add a project.```
2. Use the **POST** ```/api/getall endpoint to retrieve all projects.```
3. Use the **PATCH** ```/api/update/:id endpoint to update a specific project.```
4. Use the **DELETE** ```/api/delete/:id endpoint to delete a project.```
   
## Technologies Used
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB   


