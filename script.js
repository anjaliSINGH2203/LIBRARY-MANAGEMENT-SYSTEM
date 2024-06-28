

// JavaScript code for Library Management System functionality

const MAX_BOOKS = 100;
let library = [];
let bookCount = 0;

// Book constructor function
function Book(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isIssued = false;
}

// Add a new book to the library
function addBook(id, title, author) {
    if (bookCount >= MAX_BOOKS) {
        alert("Library is full, cannot add more books.");
        return;
    }
    library.push(new Book(id, title, author));
    bookCount++;
    console.log("Book added: " + title + " by " + author);
}

// Search for a book by title or ID
function searchBook(title = "", id = -1) {
    let foundBooks = [];
    for (let i = 0; i < bookCount; ++i) {
        if (library[i].title.toLowerCase().includes(title.toLowerCase()) || library[i].id === id) {
            foundBooks.push(library[i]);
        }
    }
    return foundBooks;
}

// List all books in the library
function listBooks() {
    let output = document.getElementById('output');
    output.innerHTML = ''; // Clear previous results
    if (bookCount === 0) {
        output.textContent = "No books in the library.";
    } else {
        for (let i = 0; i < bookCount; ++i) {
            let status = library[i].isIssued ? "(Issued)" : "(Available)";
            let bookInfo = `${library[i].id} ${library[i].title} by ${library[i].author} ${status}`;
            let bookItem = document.createElement('p');
            bookItem.textContent = bookInfo;
            output.appendChild(bookItem);
        }
    }
}

// Delete a book from the library
function deleteBook(id) {
    for (let i = 0; i < bookCount; ++i) {
        if (library[i].id === id) {
            library.splice(i, 1); // Remove book from array
            bookCount--;
            console.log("Book deleted");
            listBooks();  // Update the book list after deleting a book
            return;
        }
    }
    console.log("Book not found");
}

// Issue a book
function issueBook(id) {
    for (let i = 0; i < bookCount; ++i) {
        if (library[i].id === id) {
            if (!library[i].isIssued) {
                library[i].isIssued = true;
                console.log("Book issued: " + library[i].title);
                listBooks();  // Update the book list after issuing a book
            } else {
                console.log("Book already issued");
            }
            return;
        }
    }
    console.log("Book not found");
}

// Return a book
function returnBook(id) {
    for (let i = 0; i < bookCount; ++i) {
        if (library[i].id === id) {
            if (library[i].isIssued) {
                library[i].isIssued = false;
                console.log("Book returned: " + library[i].title);
                listBooks();  // Update the book list after returning a book
            } else {
                console.log("Book was not issued");
            }
            return;
        }
    }
    console.log("Book not found");
}

// Functions to navigate between pages
function openDetailsPage() {
    window.location.href = "details.html";
}

function openOperationsPage() {
    window.location.href = "operations.html";
}

function openIndexPage() {
    window.location.href = "index.html";
}

// Functions to handle operation buttons
function openAddBookForm() {
    let id = parseInt(prompt("Enter book ID:"));
    let title = prompt("Enter book title:");
    let author = prompt("Enter book author:");
    addBook(id, title, author);
}

function openSearchBookForm() {
    let title = prompt("Enter book title to search:");
    let id = parseInt(prompt("Enter book ID to search:"));
    let foundBooks = searchBook(title, id);
    let output = document.getElementById('output');
    output.innerHTML = ''; // Clear previous results
    if (foundBooks.length === 0) {
        output.textContent = "Book not found.";
    } else {
        foundBooks.forEach(book => {
            let status = book.isIssued ? "(Issued)" : "(Available)";
            let bookInfo = `${book.id} ${book.title} by ${book.author} ${status}`;
            let bookItem = document.createElement('p');
            bookItem.textContent = bookInfo;
            output.appendChild(bookItem);
        });
    }
}

function openListBooks() {
    listBooks();
}

function openDeleteBookForm() {
    let id = parseInt(prompt("Enter book ID to delete:"));
    deleteBook(id);
}

function openIssueBookForm() {
    let id = parseInt(prompt("Enter book ID to issue:"));
    issueBook(id);
}

function openReturnBookForm() {
    let id = parseInt(prompt("Enter book ID to return:"));
    returnBook(id);
}
