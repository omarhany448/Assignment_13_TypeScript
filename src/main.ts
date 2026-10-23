
class User {
    protected id: number;
    public name: string;
    public email: string;
    private password: string;
    public phone: string;
    private _age: number;
    public notebooks: NoteBook[] = [];

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
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

    public displayInfo(): void {
        console.log(
            `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Age: ${this._age}`
        );
    }

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
        console.log(`Notebook added for ${this.name}.`);
    }

    public listNotebooks(): void {
        console.log(`--- ${this.name}'s Notebooks ---`);

        this.notebooks.forEach((notebook, index) => {
            console.log(`Notebook ${index + 1}`);
            notebook.listNotes();
        });
    }
}

class Admin extends User {
    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        phone: string,
        age: number
    ) {
        super(id, name, email, password, phone, age);
    }

    public manageNotes(): void {
        console.log(`Admin ${this.name} is managing the notes system.`);
    }
}

class Note {
    public id: number;
    public title: string;
    public content: string;
    public userId: User;

    constructor(id: number, title: string, content: string, userId: User) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.userId = userId;
    }

    public preview(): string {
        return this.content.length > 50
            ? this.content.substring(0, 50) + "..."
            : this.content;
    }
}

class NoteBook {
    private notes: Note[] = [];

    public addNote(
        id: number,
        title: string,
        content: string,
        user: User
    ): void {
        const note = new Note(id, title, content, user);
        this.notes.push(note);
        console.log(`Note "${note.title}" added successfully.`);
    }

    public removeNote(noteId: number): void {
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

    public listNotes(): void {
        console.log("--- Notebook Notes ---");

        this.notes.forEach(note => {
            console.log(
                `- [${note.id}] ${note.title}: ${note.preview()}`
            );
            console.log(`Author: ${note.userId.name}`);
        });
    }
}

class Storage<T> {
    private items: T[] = [];

    public addItem(item: T): void {
        this.items.push(item);
    }

    public removeItem(item: T): boolean {
        const index = this.items.indexOf(item);

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        return true;
    }

    public getAllItems(): T[] {
        return [...this.items];
    }
}

try {
    const user1 = new User(
        1,
        "Ahmed Ali",
        "ahmed@example.com",
        "pass123",
        "0123456789",
        25
    );

    user1.displayInfo();

    const admin1 = new Admin(
        2,
        "Super Admin",
        "admin@example.com",
        "adminpass",
        "0987654321",
        35
    );

    admin1.displayInfo();
    admin1.manageNotes();

    const notebook1 = new NoteBook();
    const notebook2 = new NoteBook();

    user1.addNotebook(notebook1);
    user1.addNotebook(notebook2);

    notebook1.addNote(
        101,
        "First Note",
        "This is the content of the first important note in the system.",
        user1
    );

    notebook1.addNote(
        102,
        "TypeScript OOP",
        "Object-Oriented Programming principles in TypeScript.",
        user1
    );

    notebook2.addNote(
        103,
        "Second Notebook",
        "This is a note inside the second notebook.",
        user1
    );

    user1.listNotebooks();

    notebook1.removeNote(101);
    notebook1.listNotes();

    const numberStorage = new Storage<number>();

    numberStorage.addItem(10);
    numberStorage.addItem(20);
    numberStorage.addItem(30);

    console.log("Number Storage:", numberStorage.getAllItems());

    numberStorage.removeItem(20);

    console.log("Number Storage After Removal:", numberStorage.getAllItems());

    const stringStorage = new Storage<string>();

    stringStorage.addItem("TypeScript");
    stringStorage.addItem("OOP");

    console.log("String Storage:", stringStorage.getAllItems());

    const noteStorage = new Storage<Note>();

    const storedNote = new Note(
        104,
        "Stored Note",
        "This note is stored using a generic storage class.",
        user1
    );

    noteStorage.addItem(storedNote);

    console.log("Note Storage:", noteStorage.getAllItems());

} catch (error: unknown) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}