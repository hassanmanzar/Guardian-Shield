# Misinformation Detector

This is a web application designed to help users identify potential misinformation in news articles. It provides a trust score for a given URL and article text based on the source's reputation and the content's language.

## Features

*   **Article Analysis:** Get a trust score for any news article.
*   **User Reports:** Registered users can report misinformation to help improve the system.
*   **User Authentication:** Secure user registration and login system.
*   **Admin Panel:** Admins can manage users and reported feedback.

## Getting Started

### Prerequisites

*   Node.js and npm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/your-username/misinformation-detector.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd misinformation-detector
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Application

1.  Start the server:
    ```sh
    npm start
    ```
2.  Open your browser and navigate to `http://localhost:8081`.

## Project Structure

```
.env
├── database.js
├── package.json
├── server.js
├── config/
│   └── lists.js
├── controllers/
│   ├── analyze.js
│   ├── auth.js
│   ├── feedback.js
│   └── users.js
├── frontend/
│   ├── admin.html
│   ├── analyzer.html
│   ├── auth.html
│   ├── feedback.html
│   ├── index.html
│   ├── profile.html
│   ├── reporter.html
│   ├── style.css
│   └── js/
│       ├── admin.js
│       ├── api.js
│       ├── analyzer.js
│       ├── auth.js
│       ├── feedback.js
│       ├── profile.js
│       └── reporter.js
├── middleware/
│   └── auth.js
└── routes/
    ├── analyze.js
    ├── auth.js
    ├── feedback.js
    └── users.js
```

## API Endpoints

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Login a user.
*   `POST /api/analyze`: Analyze an article.
*   `GET /api/feedback`: Get all feedback.
*   `GET /api/feedback/user`: Get feedback for the logged-in user.
*   `POST /api/feedback/report`: Report misinformation.
*   `DELETE /api/feedback/:id`: Delete feedback (admin only).
*   `GET /api/users`: Get all users (admin only).
*   `DELETE /api/users/:id`: Delete a user (admin only).
