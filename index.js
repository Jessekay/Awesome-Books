// A collection of books defined as an array of objects
let bookCollection = [];

// Get HTML elements
const bookList = document.getElementById("book-list");
const addBookForm = document.getElementById("add-book-form");

// Function to remove a book from the collection
function removeBook(index) {
  bookCollection.splice(index, 1);
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  renderBookList();
}

// Function to render the book collection
function renderBookList() {
  bookList.innerHTML = "";
  bookCollection.forEach((book, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${book.title} by ${book.author} <br> <hr>`;
    bookList.appendChild(li);

    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'Remove';
    li.appendChild(removeButton);
    
    removeButton.addEventListener('click', () => {
      removeBook(index);
    });
  });
}

// Function to add a new book to the collection with title and author
function addBook(title, author) {
  bookCollection.push({ title, author });
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  renderBookList();
}

// Example usage of adding a book
addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = addBookForm.elements['title'].value;
  const author = addBookForm.elements['author'].value;
  addBook(title, author);
  addBookForm.reset();
});

// Initial rendering of the book list
renderBookList();
