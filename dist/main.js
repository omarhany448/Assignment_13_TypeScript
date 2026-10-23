"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        if (age < 18 || age > 60) {
            throw new Error("Age must be between 18 and 60.");
        }
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this._age = age;
    }
    displayInfo() {
        console.log(`ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`);
    }
    addNotebook(notebook) {
        this.notebooks.push(notebook);
        console.log(`Notebook added for ${this.name}.`);
    }
    listNotebooks() {
        console.log(`--- ${this.name}'s Notebooks ---`);
        this.notebooks.forEach((notebook, index) => {
            console.log(`Notebook ${index + 1}`);
            notebook.listNotes();
        });
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    manageNotes() {
        console.log(`Admin ${this.name} is managing the notes system.`);
    }
}
class Note {
    id;
    title;
    content;
    userId;
    constructor(id, title, content, userId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }
    preview() {
        return this.content.length > 50
            ? this.content.substring(0, 50) + "..."
            : this.content;
    }
}
class NoteBook {
    notes = [];
    addNote(id, title, content, user) {
        const note = new Note(id, title, content, user);
        this.notes.push(note);
        console.log(`Note "${note.title}" added successfully.`);
    }
    removeNote(noteId) {
        const index = this.notes.findIndex(note => note.id === noteId);
        if (index === -1) {
            console.log("Note not found.");
            return;
        }
        const note = this.notes[index];
        if (!note) {
            console.log("Note not found.");
            return;
        }
        console.log(`Note "${note.title}" removed.`);
        this.notes.splice(index, 1);
    }
    listNotes() {
        console.log("--- Notebook Notes ---");
        this.notes.forEach(note => {
            console.log(`- [${note.id}] ${note.title}: ${note.preview()}`);
            console.log(`Author: ${note.userId.name}`);
        });
    }
}
class Storage {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(item) {
        const index = this.items.indexOf(item);
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    }
    getAllItems() {
        return [...this.items];
    }
}
try {
    const user1 = new User(1, "Ahmed Ali", "ahmed@example.com", "pass123", "0123456789", 25);
    user1.displayInfo();
    const admin1 = new Admin(2, "Super Admin", "admin@example.com", "adminpass", "0987654321", 35);
    admin1.displayInfo();
    admin1.manageNotes();
    const notebook1 = new NoteBook();
    const notebook2 = new NoteBook();
    user1.addNotebook(notebook1);
    user1.addNotebook(notebook2);
    notebook1.addNote(101, "First Note", "This is the content of the first important note in the system.", user1);
    notebook1.addNote(102, "TypeScript OOP", "Object-Oriented Programming principles in TypeScript.", user1);
    notebook2.addNote(103, "Second Notebook", "This is a note inside the second notebook.", user1);
    user1.listNotebooks();
    notebook1.removeNote(101);
    notebook1.listNotes();
    const numberStorage = new Storage();
    numberStorage.addItem(10);
    numberStorage.addItem(20);
    numberStorage.addItem(30);
    console.log("Number Storage:", numberStorage.getAllItems());
    numberStorage.removeItem(20);
    console.log("Number Storage After Removal:", numberStorage.getAllItems());
    const stringStorage = new Storage();
    stringStorage.addItem("TypeScript");
    stringStorage.addItem("OOP");
    console.log("String Storage:", stringStorage.getAllItems());
    const noteStorage = new Storage();
    const storedNote = new Note(104, "Stored Note", "This note is stored using a generic storage class.", user1);
    noteStorage.addItem(storedNote);
    console.log("Note Storage:", noteStorage.getAllItems());
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}
