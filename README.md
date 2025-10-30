Book Finder

Name: Alex  
Occupation: College Student  
Need: Alex wants a simple, fast way to search for computer science and coding-related books online. He prefers an app that instantly shows book details — such as author names, publish years, and cover images — without browsing multiple sites.

---

Project Description
Book Finder- is a React-based web application that allows users to search for books using the **Open Library Search API**.  
The app fetches book data in real time and displays it in a clean, vibrant interface.  

This project is built keeping **college students (especially BTech Computer Science)** in mind who frequently need to look for **coding and academic books**.  

It demonstrates **API integration**, **state management**, and **front-end design** using React and CSS.

---

 Tech Stack
- Frontend: React.js  
- Styling: (custom vibrant warm theme)  
- API: [Open Library Search API](https://openlibrary.org/dev/docs/api/search)  
- State Management: React Hooks (`useState`, `useEffect`)  
- Deployment: CodeSandbox 

---

 Features
Search books by title using Open Library API  
View cover image, author name, and publication year  
Real-time search with dynamic rendering  
Vibrant, responsive design using warm gradient colors  
Easy to deploy and run directly in browser  

---

How It Works
1. User types a book title in the search bar.  
2. The app sends a GET request to:  
https://openlibrary.org/search.json?title={bookTitle}yaml
Copy code
3. The API returns book data (title, author, cover ID, etc.).  
4. The results are displayed dynamically with smooth styling and hover effects.  
