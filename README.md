# JSend Middleware for Express

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

**JSend Middleware** is a lightweight utility for Express.js applications that implements the [JSend specification](https://github.com/omniti-labs/jsend) to standardize JSON API responses. It provides a simple, consistent way to send `success`, `fail`, and `error` responses with customizable status labels and robust input validation.

## Features

- **Standardized Responses**: Adheres to the JSend specification with `success`, `fail`, and `error` response types.
- **Customizable Status Labels**: Allows custom status labels for flexible API designs.
- **Input Validation**: Ensures data is JSON-serializable and error messages are non-empty strings.
- **Type Safety**: Includes JSDoc annotations for TypeScript compatibility and better IDE support.
- **Express Integration**: Seamlessly integrates as middleware, attaching a `Jsend` instance to the Express response object.
- **Error Handling**: Validates the Express response object and input parameters to prevent runtime errors.

## Installation

Install the package via npm:

```bash
npm install jsend-middleware
```

Ensure you have Express.js installed in your project:

```bash
npm install express
```

## Usage

### Setup

Add the `jsendMiddleware` to your Express application:

```javascript
import express from "express";
import jsendMiddleware from "jsend-middleware";

const app = express();

// Apply JSend middleware
app.use(jsendMiddleware());

app.get("/example", (req, res) => {
  res.jsend.success({ message: "Hello, World!" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Response Types

The middleware attaches a `jsend` object to the Express `res` object, providing three methods:

#### 1. Success Response

Used for successful requests.

```javascript
res.jsend.success({ user: { id: 1, name: "John Doe" } });
// Response:
// {
//   "status": "success",
//   "data": { "user": { "id": 1, "name": "John Doe" } }
// }
```

With custom status label and HTTP code:

```javascript
res.jsend.success({ user: { id: 1, name: "John Doe" } }, 201, "ok");
// Response:
// {
//   "status": "ok",
//   "data": { "user": { "id": 1, "name": "John Doe" } }
// }
```

#### 2. Fail Response

Used for client-side errors (e.g., invalid input).

```javascript
res.jsend.fail({ error: "Invalid email format" }, 400);
// Response:
// {
//   "status": "fail",
//   "data": { "error": "Invalid email format" }
// }
```

#### 3. Error Response

Used for server-side or unexpected errors.

```javascript
res.jsend.error("Database connection failed", 500, {
  code: "DB_ERROR",
  details: { retryAfter: 60 },
  extra: { traceId: "abc123" },
});
// Response:
// {
//   "status": "error",
//   "message": "Database connection failed",
//   "code": "DB_ERROR",
//   "details": { "retryAfter": 60 },
//   "extra": { "traceId": "abc123" }
// }
```

### Configuration

The middleware supports configuration for default status labels:

```javascript
app.use(
  jsendMiddleware({
    successLabel: "ok",
    failLabel: "invalid",
    errorLabel: "exception",
  })
);

// Example success response with configured label
res.jsend.success({ message: "Configured!" });
// Response:
// {
//   "status": "ok",
//   "data": { "message": "Configured!" }
// }
```

## API Reference

### Jsend Class

#### Constructor

```javascript
new Jsend(res);
```

- `res`: Express response object (required).
- Throws an error if `res` is not a valid Express response object.

#### Methods

- `success(data, status, statusLabel)`

  - `data`: Optional object or null (default: `null`).
  - `status`: HTTP status code (default: `200`).
  - `statusLabel`: Custom status label (default: `"success"`).
  - Throws an error if `data` is not JSON-serializable.

- `fail(data, status, statusLabel)`

  - `data`: Optional object or null (default: `null`).
  - `status`: HTTP status code (default: `400`).
  - `statusLabel`: Custom status label (default: `"fail"`).
  - Throws an error if `data` is not JSON-serializable.

- `error(message, status, options, statusLabel)`
  - `message`: Error message (default: `"Internal Server Error"`).
  - `status`: HTTP status code (default: `500`).
  - `options`: Optional object with `code`, `details`, and `extra` fields.
  - `statusLabel`: Custom status label (default: `"error"`).
  - Throws an error if `message` is not a non-empty string or `options.extra` is not an object.

### jsendMiddleware

```javascript
jsendMiddleware(config);
```

- `config`: Optional configuration object.
  - `successLabel`: Default label for success responses (default: `"success"`).
  - `failLabel`: Default label for fail responses (default: `"fail"`).
  - `errorLabel`: Default label for error responses (default: `"error"`).

## Error Handling

The middleware includes robust validation:

- Ensures the Express `res` object has required methods (`status`, `json`).
- Validates that `data` in `success` and `fail` is an object or `null`.
- Ensures `message` in `error` is a non-empty string.
- Validates that `options.extra` in `error` is an object.

## Requirements

- Node.js >= 14.0.0
- Express.js >= 4.0.0

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please submit a pull request or open an issue on the [GitHub repository](https://github.com/ahmedredag/jsend-middleware).

## Acknowledgments

Inspired by the [JSend specification](https://github.com/omniti-labs/jsend) for standardized JSON responses.
