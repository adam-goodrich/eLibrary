let myLibrary = [];
let books;
let toggleRead;
const green = "rgb(59, 180, 75)"
const red =  "#ed1c25"
for (let i = 0; i < localStorage.length; i++) {
    myLibrary.push(JSON.parse(window.localStorage.getItem(`item${i}`)));
}
build();

const submit = document.querySelector('#submit');
submit.addEventListener('click', function(e) {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pageNumber").value;
    let read;
    let image = document.getElementById("image").value;
    let ele = document.getElementsByName('read'); 
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) {
            read = ele[i].value; 
            if (read == "unread") {
                read = false
            } else {
                read = true
            }
        }
    } 
    addBookToLibrary(title, author, pages, read, image);  
    build();
    submitClear();
});

const coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
};

function submitClear() { 
    document.getElementById('title').value = ''; 
    document.getElementById('author').value = ''; 
    document.getElementById('pageNumber').value = ''; 
    document.getElementById('image').value = '';
};

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

function Book(title, author, pages, read, image) {
    this.image = image
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(title, author, pages, read, image) {
    if (title == "") {
        title = "Unknown"
    }
    if (author == "") {
        author = "Unknown"
    }
    if (pages == "") {
        pages = "Unknown"
    }
    if (image == "") {
        image = "https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-book-icon-png-image_926280.jpg"
    }
    let newBook = new Book(title, author, pages, read, image);
    myLibrary.push(newBook);
};

function build() {
    const container = document.querySelector(".container");
    removeAllChildNodes(container)
    window.localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
        window.localStorage.setItem(`item${i}`, JSON.stringify(myLibrary[i]));

        const books = document.createElement('div');
        books.classList.add("grid-item")
        container.appendChild(books)

        books.id = `${i}`

        if (myLibrary[i].read) {
            books.style.backgroundColor = green;
        } else {
            books.style.backgroundColor = red;
        }

        if (myLibrary[i].read == true) {
            toggleRead = "un-read"
        } else {
            toggleRead = "read"
        }

        books.innerHTML = 
        `
        <button type="button" id="remove" name="${i}" class="remove">X</button>
        <div class="bookNum">#${i+1}</div>
        <br>
        <br>
        <img src="${myLibrary[i].image}" style="width:9em;height:15em;" onerror="this.src='https://png.pngtree.com/png-vector/20190411/ourlarge/pngtree-vector-book-icon-png-image_926280.jpg'">
        <div>${myLibrary[i].title}</div>
        <div>By: ${myLibrary[i].author}</div>
        <div>Page Count: ${myLibrary[i].pages}</div>
        <button type="button" value="toggle" id="toggle" name="${i}">Click to mark as ${toggleRead}</button>
        <br>
        <br>
        `
        container.appendChild(books)
    }
    const remove = Array.from(document.querySelectorAll('#remove'));
    remove.forEach(button => button.addEventListener('click', function(e) {
        myLibrary.splice(this.name, 1)
        console.log(myLibrary)
        build();
    }));

    const toggle = Array.from(document.querySelectorAll(`#toggle`));
    toggle.forEach(button => button.addEventListener('click', function(e) {
        if (myLibrary[`${this.name}`].read == true) {
            myLibrary[`${this.name}`].read = false
            build();
        } else {
            myLibrary[`${this.name}`].read = true
            build();
        }
    }));
};