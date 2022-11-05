
let myLibrary = [];

if (localStorage.getItem('library') === null) {
    localStorage.setItem('library', JSON.stringify(myLibrary));
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}

class Book {
    constructor(title, author, year, pages, isRead) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function clearPopupSubmit() {
    document.querySelector("#popupSubmit").removeEventListener("click", editBook);
    document.querySelector("#popupSubmit").removeEventListener("click", addBook);
}

function removePopup() {
    document.querySelector(".popup").classList.remove("unhide");

    clearPopupSubmit();
}

function renderBooks() { // Render all books on a page
    myLibrary = JSON.parse(localStorage.getItem('library'));

    document.querySelector("#library").innerHTML = "";

    let librarySize = Object.keys(myLibrary).length;
    if (myLibrary.length > 0) {
        for (let i = 0; i < librarySize; i++) {
            
            let isReadIcon;

            if (myLibrary[i].isRead == true) {
                isReadIcon = "READ";
            } else { isReadIcon = "NOT READ"; }
    
            document.querySelector("#library").innerHTML += `
            <div class="book">
                <div class="info">
                    <p>📖 ${myLibrary[i].title}</p>
                    <p>👤 ${myLibrary[i].author}</p>
                    <p>📅 ${myLibrary[i].year}<p>
                    <p>📄 ${myLibrary[i].pages} pages</p>
                </div>
                <div class="options">
                    <button class="btn delete" onclick=removeBook(${i})>X</button>
                    <button class="btn edit" onclick=editBookPopup(${i})>📝</button>
                    <button class="btn isread" data-readStatusId="${i}" onclick=readStatusChange(${i})>${isReadIcon}</button>
                </div>
            </div>
            `;
        }
    } else {
        document.querySelector("#library").innerHTML = `
                Empty :(
            `;
    }
}

function addBookPopup() {
    document.querySelector("#popupTitle").innerHTML = "Add book to library";
    document.querySelector("#popupSubmit").innerHTML = "Submit book";
    document.querySelector(".popup").classList.add("unhide");
    document.querySelector("#successMsg").innerHTML = "";

    clearPopupSubmit();

    document.querySelector("#popupSubmit").addEventListener("click", addBook);
}

function addBook() { // Add new book to object

    let bookTitle = document.querySelector("#bookTitle").value;
    let bookAuthor = document.querySelector("#bookAuthor").value;
    let bookYear = document.querySelector("#bookYear").value;
    let bookPages = document.querySelector("#bookPages").value;
    let bookIsRead = document.querySelector("#bookIsRead").checked;

    if (bookTitle === "" || bookAuthor === "" || bookPages === "" || bookYear === "") {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Missing information!";
        return;
    }
    if (isNaN(bookPages) || bookPages < 1) {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Invalid number of pages!";
        return;
    }

    myLibrary.push(new Book(bookTitle, bookAuthor, bookYear, bookPages, bookIsRead));

    localStorage.removeItem('library');
    localStorage.setItem('library', JSON.stringify(myLibrary));

    document.querySelector("#successMsg").innerHTML = "<b>Success!</b> Book added to the library!";

    renderBooks();
}

function editBookPopup(id) {
    document.querySelector(".popup").classList.add("unhide");
    document.querySelector("#successMsg").innerHTML = "";

    document.querySelector("#popupTitle").innerHTML = "Edit book";
    document.querySelector("#popupSubmit").innerHTML = "Submit edit";

    document.querySelector("#bookTitle").value = myLibrary[id].title;
    document.querySelector("#bookAuthor").value = myLibrary[id].author;
    document.querySelector("#bookYear").value = myLibrary[id].year;
    document.querySelector("#bookPages").value = myLibrary[id].pages;
    document.querySelector("#bookIsRead").checked = myLibrary[id].isRead;

    document.querySelector(".popup").setAttribute("data-id", `${id}`);

    clearPopupSubmit();

    document.querySelector("#popupSubmit").addEventListener("click", editBook)
}

function editBook() {
    let bookTitle = document.querySelector("#bookTitle").value;
    let bookAuthor = document.querySelector("#bookAuthor").value;
    let bookYear = document.querySelector("#bookYear").value;
    let bookPages = document.querySelector("#bookPages").value;
    let bookIsRead = document.querySelector("#bookIsRead").checked;

    const id = document.querySelector(".popup").dataset.id;

    if (bookTitle === "" || bookAuthor === "" || bookPages === "" || bookYear === "") {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Missing information!";
        return;
    }
    if (isNaN(bookPages) || bookPages < 1) {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Invalid number of pages!";
        return;
    }

    myLibrary[id] = new Book(bookTitle, bookAuthor, bookYear, bookPages, bookIsRead);

    localStorage.removeItem('library');
    localStorage.setItem('library', JSON.stringify(myLibrary));

    document.querySelector("#successMsg").innerHTML = "<b>Success!</b> Book successfully edited!";

    renderBooks();
}

function clearStorage() {
    if (confirm("Ar you sure you want to clear local storage? This action will remove all your books!")) {
    myLibrary = [];
    myLibrary = localStorage.setItem('library', JSON.stringify(myLibrary));
    }
    renderBooks();
}

function removeBook(id) {
    if (confirm("Ar you sure you want to remove this book?")) {
        myLibrary.splice(id, 1);
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
    renderBooks();
}

function readStatusChange(id) {

    let bookStatus = document.querySelector(`[data-readStatusId='${id}']`);

    if (myLibrary[id].isRead) {
        myLibrary[id].isRead = false;
        bookStatus.innerHTML = "NOT READ";
    } else { 
        myLibrary[id].isRead = true;
        bookStatus.innerHTML = "READ";
    }
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

document.querySelector("#closePopup").addEventListener("click", removePopup);

document.addEventListener("keydown", () => {
    if (event.key === 'Escape') {
        removePopup();
    }
});

renderBooks();