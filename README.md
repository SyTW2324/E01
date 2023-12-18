# ShareTheCost 💶
Split bills and manage shared expenses with friends, family, or colleagues.

## 📝 Description
**ShareTheCost** is a simple, open-source, and self-hosted solution for splitting bills and managing shared expenses with friends, family, or colleagues. Designed with transparency and user control in mind, it allows you to take charge of your shared finances in a secure and customizable environment.

## 🏗️ Project Structure
- **datatypes:** This directory contains the abstract data types shared across the application.
- **public:** The frontend code resides here, providing an intuitive and user-friendly interface for interacting with the application.
- **server:**
  - **auth:** The authentication service, responsible for user authentication and authorization. Ensures secure access to the application.
  - **db:** The database service manages the storage and retrieval of shared expense data.
- **apidoc.md:** This file contains detailed information about the API structure, endpoints, and usage.

## 🚀 Installation
To set up **ShareTheCost**, follow these installation steps for each module:

### auth
```bash
# Go to module directory
cd server/auth

# Install dependencies and build module
yarn
yarn run build

# Execute module
node dist/index.js
```

### db
```bash
# Go to module directory
cd server/db

# Install dependencies and build module
yarn
yarn run build

# Execute module
node dist/index.js
```

### public
```bash
# Go to module directory
cd public

# Install dependencies and build module
yarn
yarn run build

# To deploy the frontend move the content of the
# directory build/ to your web server directory.
# Example:
mv build/* /var/www
```
