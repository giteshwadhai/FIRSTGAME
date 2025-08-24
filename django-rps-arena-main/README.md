# Rock Paper Scissors Arena

## Project info

This is a Rock Paper Scissors game application with a Django backend and React frontend. The application allows users to register as players, play games against the computer, and view their game history.

## How can I edit this code?

There are several ways of editing your application.



**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

### Frontend
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend
- Django
- Django REST Framework
- Django CORS Headers

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install Python dependencies:
   ```sh
   pip install -r ../requirements.txt
   ```

3. Run migrations:
   ```sh
   python manage.py migrate
   ```

4. Start the Django server:
   ```sh
   python manage.py runserver 8000
   ```

### Frontend Setup

1. Install Node.js dependencies:
   ```sh
   npm install
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

3. Access the application at http://localhost:8080
