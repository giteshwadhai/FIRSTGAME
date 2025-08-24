# How to Upload This Project to GitHub

Follow these steps to upload your Rock-Paper-Scissors game with Django and React to GitHub:

## Prerequisites

1. Install Git on your computer if you haven't already:
   - Download from [git-scm.com](https://git-scm.com/downloads)
   - Follow the installation instructions for your operating system

2. Create a GitHub account if you don't have one at [github.com](https://github.com/)

## Steps to Upload

### 1. Initialize Git Repository

Open a terminal or command prompt in your project directory and run:

```bash
git init
```

### 2. Add Your Files to Git

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Rock-Paper-Scissors game with Django and React"
```

### 4. Create a New Repository on GitHub

1. Go to [github.com](https://github.com/) and log in
2. Click the '+' icon in the top right and select 'New repository'
3. Name your repository (e.g., "django-rps-arena")
4. Add a description (optional)
5. Choose public or private visibility
6. Do NOT initialize with README, .gitignore, or license (since you're pushing an existing repository)
7. Click 'Create repository'

### 5. Link Your Local Repository to GitHub

GitHub will show commands after repository creation. Run these in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

## Additional Recommendations

### Create a .gitignore File

Before pushing, create a `.gitignore` file to exclude unnecessary files:

```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg

# Django
*.log
local_settings.py
db.sqlite3
db.sqlite3-journal
media

# Node
node_modules/
npm-debug.log
yarn-error.log
yarn-debug.log
.pnpm-debug.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE specific files
.idea/
.vscode/
*.swp
*.swo

# OS specific files
.DS_Store
Thumbs.db
```

### Update README.md

Ensure your README.md includes:

1. Project description
2. Setup instructions for both frontend and backend
3. API documentation
4. Screenshots (optional)

## Troubleshooting

- If you encounter authentication issues, you may need to set up a personal access token in GitHub:
  1. Go to GitHub Settings > Developer settings > Personal access tokens
  2. Generate a new token with appropriate permissions
  3. Use this token instead of your password when pushing

- For large files (>100MB), consider using Git LFS or excluding them from your repository