## Credits
Created by **Luke Mileski**  
University of San Diego — Lab 7: *COMP 305 - Fall 2025 - Model View Controller*  

# Eliza Chat Engine (MVC CRUD Chat Application)

## Overview
This project is a refactored version of the Lab 6 Eliza chatbot, rebuilt using the **Model-View-Controller (MVC)** architecture to demonstrate separation of concerns, client-side persistence, and full CRUD functionality.  
The app simulates an Eliza-style conversational assistant where users can chat, edit, delete, import/export messages, and view saved timestamps — all stored locally in the browser.

---

## Publishing
This project was published on **Netlify**
Access it here: 
---

## Learning Objectives
- Apply the **MVC architectural pattern** to separate logic, presentation, and data management.  
- Implement **CRUD operations** (Create, Read, Update, Delete) for persistent chat data.  
- Use **localStorage and JSON** for client-side data storage.  
- Provide **import/export capabilities** for portability.  
- Include **keyboard shortcuts**, timestamps, and message statistics for improved usability.

---

## Architecture

### Model (`model.js`)
- Handles data storage, validation, and persistence via `localStorage`.  
- Implements CRUD operations:
  - Create: Add new user/bot messages.
  - Read: Load stored messages on app start.
  - Update: Edit user messages with an “(edited)” label.
  - Delete: Remove one or all messages.
- Uses an observer pattern so the View updates automatically when data changes.
- Can be swapped with another storage provider (e.g., IndexedDB or REST API adapter).

### View (`view.js`)
- Owns all DOM rendering and user interface updates.  
- Dynamically renders message bubbles, timestamps, and metadata (message count and last saved).  
- Uses event delegation for message actions (edit/delete).  
- Handles keyboard shortcuts:
  - `Ctrl/Cmd + K` → clear input  
  - `Esc` → cancel editing  
  - `↑` → edit last message  
- Keeps the UI responsive, scrolls to the newest message, and confirms destructive actions.

### Controller (`controller.js`)
- Connects user input from the View to Model updates.  
- Coordinates message flow, including bot responses from `eliza.js`.  
- Ensures the View never manipulates data and the Model never touches the DOM.  
- Handles import/export of chat data and resets editing state cleanly.

---

## Data Persistence
- Chat history automatically saves to `localStorage` with timestamps.  
- Data reloads on refresh and remains persistent until cleared.  
- Import/export functions allow full chat history backup or sharing.  
- Gracefully handles corrupted or invalid JSON during import.

---

## Statistics
- Displays total messages, and number of user, bot, and edited messages.  
- Shows the last saved timestamp (time and date).  
- Updates dynamically whenever the model changes.

---

## Bot Logic
- Uses Eliza-style pattern matching (`eliza.js`) to respond contextually to keywords and phrases.  
- Supports generic fallback responses when no pattern matches.  
- Keeps conversation logic separate from MVC layers.

---

## User Experience
- Minimal, professional UI following a consistent color scheme.  
- Message bubbles distinguish between user and bot.  
- Confirmation prompts before deletions or clearing chat.  
- Responsive design with fixed viewport layout and intuitive labels.  
- Subtle “start a conversation…” hint for empty state.  
- Clean typography and readable spacing for accessibility.

---

## How to Use
1. Open `index.html` in your browser.  
2. Type a message and press **Enter** to send.  
3. Edit or delete user messages via buttons.  
4. Export chat to a `.json` file, or import a saved conversation.  
5. Use shortcuts (`Ctrl/Cmd + K`, `Esc`, `↑`) for faster control.  
6. View the “Saved:” timestamp and message count in the top bar.

---

## Technical Decisions
- Used the observer pattern instead of direct coupling between components.  
- Abstracted localStorage access to allow easy replacement with future REST or IndexedDB layers.  
- Maintained modular ES6 imports for clarity and maintainability.  
- Eliza pattern logic remains separate from core MVC architecture.  
- CSS follows one-rule-per-line readability and uses a responsive grid layout.

## Reflections
- The MVC paradigm seemed straightforward in terms of what file was responsible for what tasks.
- I previously completed an MVC app in Python but using HTML/CSS/JS proved more challenging as there were more tooling and components to learn.
- MVC is focused on the separation of concerns principle. Other paradigms may focus less on this but offer improved -ilities in other places.