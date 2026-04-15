# Inventory Management App

## Overview
This is a full-stack Inventory Management application built with Express and PostgreSQL and still under construction.  
The app allows users to manage an inventory for a fictional store using categories (Elements), items, and item attributes. Users can create, read, update, and delete data across these entities.

The project was built as part of a learning exercise focused on backend development, database design, and CRUD operations.

---

## Features

- Elements (Categories) management
- Items management
- Item Attribute management
- Partial CRUD functionality for all entities
- Relational PostgreSQL database structure
- RESTful routing with Express
- Dynamic data rendering

---

## Database Structure

The application is built around three main entities:

- **Elements** (Categories)
- **Items**
- **Item Attribute**

### Relationships:
- One Element can contain many Items
- Each Item has exactly one Item Attribute

This design allows each item to store a single set of specific properties via its attribute record.

---

## Current Limitations

- The frontend is not fully completed yet and is still under development.
- There is currently no separate edit functionality.
  - Instead, when creating an item with the same name as an existing item, the existing entry is automatically updated.
- Delete functionality is not implemented yet.

---

## Planned Improvements

- Complete and improve frontend UI
- Implement proper edit functionality for items
- Implement delete functionality for items, elements, and item attributes
- Improve validation and user experience
- Add authentication for admin actions (future enhancement)

---

## Deployment

The project is deployed using Railway.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- HTML / CSS / JavaScript (frontend in progress)
