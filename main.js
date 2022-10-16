
let myLibrary = [];

if (localStorage.getItem('library') === null) {
    localStorage.setItem('library', JSON.stringify(myLibrary));
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}

function books() { // Show all books on a page
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
                    <p class="title">📖 ${myLibrary[i].title}</p>
                    <p class="author">👤 ${myLibrary[i].author}</p>
                    <p class="pages">📄 ${myLibrary[i].pages} pages</p>
                    
                </div>
                <div class="options">
                    <button class="deleteBtn" onclick=removeBook(${i})>X</button>
                    <button class="isRead" data-readStatusId="${i}" onclick=readStatusChange(${i})>${isReadIcon}</button>
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

function addBook() { // Add new book to object

    let bookTitle = document.querySelector("#bookTitle").value;
    let bookAuthor = document.querySelector("#bookAuthor").value;
    let bookPages = document.querySelector("#bookPages").value;
    let bookIsRead = document.querySelector("#bookIsRead").checked;

    if (bookTitle == "" || bookAuthor === ""|| bookPages === "") {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Missing information!";
        return;
    } else if (isNaN(bookPages) || bookPages < 1) {
        document.querySelector("#successMsg").innerHTML = "<b>Error!</b> Invalid number of pages!";
        return;
    } else {
        document.querySelector("#successMsg").innerHTML = "<b>Success!</b> Book added!";
    }

    let librarySize = Object.keys(myLibrary).length;

    let size;

    if (librarySize == 0) {
        size = librarySize;
    } else {
        size = librarySize++;
    }

    myLibrary.push({
        id: size,
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages,
        isRead: bookIsRead
    });

    localStorage.removeItem('library');
    localStorage.setItem('library', JSON.stringify(myLibrary));

    books();
}

function clearStorage() {
    if (confirm("Ar you sure you want to clear local storage? This action will remove all your books!")) {
    myLibrary = [];
    myLibrary = localStorage.setItem('library', JSON.stringify(myLibrary));
    }
    books();
}

function removeBook(id) {
    if (confirm("Ar you sure you want to remove this book?")) {
        myLibrary.splice(id, 1);
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
    books();
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

document.querySelector("#addBook").addEventListener("click", () => {
        document.querySelector(".popup").classList.add("unhide");
        document.querySelector("#successMsg").innerHTML = "";
});

document.querySelector("#closePopup").addEventListener("click", () => {

        document.querySelector(".popup").classList.remove("unhide");
});

document.addEventListener("keydown", () => {
    if (event.key === 'Escape') {
        document.querySelector(".popup").classList.remove("unhide");
    }
});

books();