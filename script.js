const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function renderLibrary() {
    const libraryContainer = document.getElementById("library");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <p><strong>Title:</strong> ${book.title}</p>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
            <button class="toggle-read" data-index="${index}">Toggle Read</button>
            <button class="remove-book" data-index="${index}">Remove</button>
        `;

        libraryContainer.appendChild(bookCard);
    });

    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll(".remove-book").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            myLibrary.splice(index, 1);
            renderLibrary();
        });
    });

    document.querySelectorAll(".toggle-read").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            myLibrary[index].toggleRead();
            renderLibrary();
        });
    });
}

document.getElementById("book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    document.getElementById("book-form").reset();
    document.getElementById("book-modal").close();
});

document.getElementById("add-new-book").addEventListener("click", () => {
    document.getElementById("book-modal").showModal();
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("book-modal").close();
})