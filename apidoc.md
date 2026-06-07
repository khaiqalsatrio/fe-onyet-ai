# onyetAI API Documentation

This document describes the available API endpoints for the onyetAI backend service.

## Base URL
`http://localhost:3000` (or your configured `PORT`)

## Swagger UI
Interactive API documentation is available via Swagger UI at:
`http://localhost:3000/api/docs`

---

## 1. General Endpoints

### 1.1 Check Health / Welcome
- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns a simple greeting message to verify the server is running.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `Hello World!` (or similar string from AppService)

---

## 2. Commands Endpoints

All commands endpoints are prefixed with `/api/commands`.

### 2.1 Generate Command
Generates a command using the AI model based on the provided prompt and saves it to the history log.

- **URL**: `/api/commands/generate`
- **Method**: `POST`
- **Description**: Generate a command using AI based on a prompt.
- **Request Body**:
  ```json
  {
    "prompt": "buatkan query sql sederhana" // string, required
  }
  ```
- **Success Response**:
  - **Code**: `201 Created`
  - **Content**: 
    ```json
    {
      "id": "uuid-string",
      "prompt": "buatkan query sql sederhana",
      "result": "SELECT * FROM users;",
      "modelUsed": "gemini-1.5-flash",
      "tokensUsed": 15,
      "createdAt": "2026-06-08T07:17:33Z"
    }
    ```

### 2.2 Get All Command History
Retrieves all generated command history logs from the database.

- **URL**: `/api/commands/history`
- **Method**: `GET`
- **Description**: Get all generated command history logs.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: Array of RequestLog objects.
    ```json
    [
      {
        "id": "uuid-string-1",
        "prompt": "prompt text",
        "result": "generated text",
        "modelUsed": "model-name",
        "tokensUsed": 10,
        "createdAt": "timestamp"
      },
      ...
    ]
    ```

### 2.3 Get Specific Command History
Retrieves a specific command history log by its ID.

- **URL**: `/api/commands/history/:id`
- **Method**: `GET`
- **Description**: Get a specific command history log by ID.
- **URL Parameters**: 
  - `id` (string): The UUID of the request log.
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: Single RequestLog object.
    ```json
    {
      "id": "uuid-string",
      "prompt": "prompt text",
      "result": "generated text",
      "modelUsed": "model-name",
      "tokensUsed": 10,
      "createdAt": "timestamp"
    }
    ```
- **Error Response**:
  - **Code**: `404 Not Found` (if ID does not exist)

### 2.4 Delete Specific Command History
Deletes a specific command history log from the database by its ID.

- **URL**: `/api/commands/history/:id`
- **Method**: `DELETE`
- **Description**: Delete a specific command history log by ID.
- **URL Parameters**: 
  - `id` (string): The UUID of the request log.
- **Success Response**:
  - **Code**: `204 No Content`
  - **Content**: `(empty body)`
- **Error Response**:
  - **Code**: `404 Not Found` (if ID does not exist)

---

## Data Models

### `RequestLog`
| Field | Type | Description |
|---|---|---|
| `id` | `uuid` | Primary Key. Unique identifier for the log. |
| `prompt` | `text` | The input prompt provided by the user. |
| `result` | `text` | The generated response from the AI model. |
| `modelUsed` | `string` | The name of the AI model used (e.g., gemini-1.5-flash). |
| `tokensUsed` | `int` | (Optional) Number of tokens used for the generation. |
| `createdAt` | `timestamp` | The timestamp when the log was created. |

### `GenerateCommandDto`
| Field | Type | Validation | Description |
|---|---|---|---|
| `prompt` | `string` | Required, Must be string | Prompt or command from the user. |
