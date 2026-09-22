const addNewBook = document.querySelector("#addBook");
const Form = document.querySelector("#theForm");
const Cancel = document.querySelector("#cancel");
const form = document.querySelector("#form");
const title = document.querySelector("#title")
const author = document.querySelector("#author")
const number = document.querySelector("#nump")
const about = document.querySelector("#about");
const check = document.querySelector("#check")
const container = document.querySelector("#lib-container");
class Book {
    constructor(title, author, pages, about, isRead) {
        if (!new.target)
            throw new Error("You must use the 'new' keyword");
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author
        this.pages = pages;
        this.about = about
        this.isRead = isRead;
    }
    changeStatus() {
        this.isRead = !this.isRead
    }


}

const myLibrary = []
function addBook(title, author, pages, about, isRead) {
    const newBook = new Book(title, author, pages, about, isRead);
    myLibrary.push(newBook);
}





function saveLocal() {
    localStorage.setItem("mylibrary", JSON.stringify(myLibrary));
}
function loadLocal() {
    let library = localStorage.getItem("mylibrary");
    if (library != null) {
        let books = JSON.parse(library);

        myLibrary.length = 0;
        books.forEach(function (b) {
            addBook(b.title, b.author, b.pages, b.about, b.isRead)
        });


    }
    else {
        addBook("الليالي البيضاء", "دويستفيسكي", 150, "كتاب جميل", true);
        saveLocal()
    }
}
function openModal() {
    Form.showModal();
}
addNewBook.addEventListener("click", openModal)
function closeModal() {
    Form.close();
}
Cancel.addEventListener("click", closeModal)

function readForm(e) {
    e.preventDefault();
    const nTitle = title.value;
    const nAuthor = author.value;
    const nNumber = number.value;
    const nAbout = about.value;
    const nCheck = check.checked;
    addBook(nTitle, nAuthor, nNumber, nAbout, nCheck);
    saveLocal();
    form.reset();
    Form.close();
    displayBooks();
}
form.addEventListener("submit", readForm);




function displayBooks() {
    container.textContent = "";
    myLibrary.forEach(function (book, index) {
        const card = document.createElement("div");
        card.classList.add("stylecard");
        const title = document.createElement("h3");
        const author = document.createElement("p");
        const pages = document.createElement("p");
        const about = document.createElement("p");
        const status = document.createElement("button");
        const delet = document.createElement("button");
        delet.textContent = "Delete";
        status.textContent = book.isRead ? "Read" : "Not Read";
        if (status.textContent === "Read")
            status.classList.add("read");
        else status.classList.add("nread")
        delet.classList.add("delete");
        function fStatus() {
            book.changeStatus();
            saveLocal();
            displayBooks();
        }
        function deleteBook() {
            myLibrary.splice(index, 1);
            saveLocal();
            displayBooks();
        }
        delet.addEventListener("click", deleteBook);
        status.addEventListener("click", fStatus)
        title.textContent = book.title;
        author.textContent = book.author;
        pages.textContent = book.pages;
        about.textContent = book.about;
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(about);
        card.appendChild(status);
        card.appendChild(delet);
        container.appendChild(card);

    })
}








loadLocal()
displayBooks();






