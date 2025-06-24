### Do npm i
### use ` npm run dev ` to start to project locally

## Steps used to create the Chat application

### 1. Create vite react project 
  - ` npm create vite@latest`

### 2. Proper Folder structure   
### 3. Added Routes - 
  - ` / ` : This is default  Public route - redirecting to login page
  - ` /dashboard ` - This is Protected route - redirecting to Dashboard of chat app

### 4. Protect route based on Auth token present in localstorage
- ` PublicRoute ` for  ` / ` and 
- ` ProtectedRoute ` for ` /dashboard ` 

### 5. Implementing Redux for state management.
- ` npm install @reduxjs/toolkit react-redux `
- Create Redux Store
- Create AuthSlice for storing state of logged in user
- register AuthSlice reducer in store
- Wrap App/main with Provider
- use Redux in Login Component
