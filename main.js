
const myLibrary = {};

// Debug code

myLibrary[0] = {
    title: "Žiedų valdovas",
    author: "Vardenis Pavardenis",
    pages: "358",
    isRead: true
};

myLibrary[1] = {
    title: "Nevaldomasas",
    author: "Juris Jurgalavicius",
    pages: "301",
    isRead: false
};

function books() { // Show all books on a page
    document.querySelector("#library").innerHTML = "";

    let librarySize = Object.keys(myLibrary).length;

    for (let i = 0; i < librarySize; i++) {
        let bookArray = Object.values(myLibrary[i]);

        if (bookArray[3] == true) {
            bookArray[3] = "✅";
        } else { bookArray[3] = "❌"; }

        document.querySelector("#library").innerHTML += `
        <div class="book">
        <p class="title">${bookArray[0]}</p>
        <p class="author">${bookArray[1]}</p>
        <p class="pages">${bookArray[2]}</p>
        <p class="isRead">${bookArray[3]}</p>
        </div>
        `;
    }
}

function addBook() { // Add new book to object

    let bookTitle = document.querySelector("#bookTitle").value;
    let bookAuthor = document.querySelector("#bookAuthor").value;
    let bookPages = document.querySelector("#bookPages").value;
    let bookIsRead = document.querySelector("#bookIsRead").checked;

    let librarySize = Object.keys(myLibrary).length;

    let size;

    if (librarySize == 0) {
        size = librarySize;
    } else {
        size = librarySize++;
    }

    myLibrary[size] = {
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages,
        isRead: bookIsRead
    };

    console.log(myLibrary);


    books();
}

let addBtn = false;

document.querySelector(".addBook").addEventListener("click", () => {
    addBtn =! addBtn;

    if (addBtn) {
        document.querySelector(".addToLibrary").classList.remove("hide");
    } else {
        document.querySelector(".addToLibrary").classList.add("hide");
    }
});

books();