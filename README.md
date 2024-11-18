# NotesApp Project Description

Notes App Management System

# NotesApp Project Setup

1. Clone the repository
2. cd `root-directory`
3. run `npm install` - all libraries should be downloaded
4. run `ng serve`

# Features

1. Authentication: Implement a login page using Firebase Authentication that allows 
users to sign in with their email and password. 
2. Note creation: Once authenticated, users should be able to create a simple note 
with a title and content. 
3. Viewing notes: Users should be able to view the list of notes they have created. 
4. Logout: Implement a logout button that logs the user out and redirects to the 
login page. 
5. Persistence: Users should remain logged in even after refreshing the page or 
revisiting it later. 
6. Security: Configure Firestore security rules to ensure that users can only access 
and modify their own notes. 
7. Route guards: Implement Angular route guards to protect authenticated routes, 
preventing unauthorized users from accessing restricted pages. 
8. Hosting: Deploy your application to Firebase Hosting. 
9. Expand CRUD operations: add functionality to edit and delete notes. 
10. Search and filter: add search bar that allows users to search their notes by title or 
content.

# Hosting

You can access the live version of the application at: `https://notes-dbd8d.web.app/`