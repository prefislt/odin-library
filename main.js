
let myLibrary = [];

if (localStorage.getItem('library') === null) {
    localStorage.setItem('library', JSON.stringify(myLibrary));
} else {
    myLibrary = JSON.parse(localStorage.getItem('library'));
}

console.log(myLibrary);

function books() { // Show all books on a page
    myLibrary = JSON.parse(localStorage.getItem('library'));

    console.log(myLibrary);
    // Debug code

    // myLibrary[0] = {
    //     id: 0,
    //     title: "Žiedų valdovas",
    //     author: "Vardenis Pavardenis",
    //     pages: "358",
    //     isRead: true
    // };

    // myLibrary[1] = {
    //     id: 1,
    //     title: "Nevaldomasas",
    //     author: "Juris Jurgalavicius",
    //     pages: "301",
    //     isRead: false
    // };

    document.querySelector("#library").innerHTML = "";

    let librarySize = Object.keys(myLibrary).length;
    console.log(myLibrary.length);
    if (myLibrary.length > 0) {
        for (let i = 0; i < librarySize; i++) {
            
            let isReadIcon;

            if (myLibrary[i].isRead == true) {
                isReadIcon = "✅";
            } else { isReadIcon = "❌"; }
    
            document.querySelector("#library").innerHTML += `
            <div class="book">
                <div class="info">
                    <p class="title">${myLibrary[i].title}</p>
                    <p class="author">${myLibrary[i].author}</p>
                    <p class="pages">${myLibrary[i].pages}</p>
                    <button class="isRead" data-readStatusId="${i}" onclick=readStatusChange(${i})>${isReadIcon}</button>
                </div>
                <button class="deleteBtn" onclick=removeBook(${i})>X</button>
            </div>
            `;
        }
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

    myLibrary.push({
        id: size,
        title: bookTitle,
        author: bookAuthor,
        pages: bookPages,
        isRead: bookIsRead
    });

    console.log("ID: " + size);
    console.log("Title: " + bookTitle);
    console.log("Is read: " + bookIsRead);

    localStorage.removeItem('library');
    localStorage.setItem('library', JSON.stringify(myLibrary));

    books();
}

function clearStorage() {
    myLibrary = [];
    myLibrary = localStorage.setItem('library', JSON.stringify(myLibrary));
    books();
}

function removeBook(id) {
    console.log(id);
    myLibrary.splice(id, 1);
    localStorage.setItem('library', JSON.stringify(myLibrary));
    books();
}

function readStatusChange(id) {

    let bookStatus = document.querySelector(`[data-readStatusId='${id}']`);

    if (myLibrary[id].isRead) {
        myLibrary[id].isRead = false;
        bookStatus.innerHTML = "❌";
    } else { 
        myLibrary[id].isRead = true;
        bookStatus.innerHTML = "✅";
    }
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

let addBtn = false;
document.querySelector("#addBook").addEventListener("click", () => {
    addBtn =! addBtn;

    if (addBtn) {
        document.querySelector(".addToLibrary").classList.remove("hide");
    } else {
        document.querySelector(".addToLibrary").classList.add("hide");
    }
});

books();