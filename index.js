// Book class
class book {
  // constructor to initialize the book object with title and author
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  // static method to display books from localstorage
  static displayBooks() {
    // get books from localstorage, or set to an empty array if none found
    const books = JSON.parse(localStorage.getItem('books')) || [];
    // get the book elements from the dom
    const bookList = document.getElementById(book-list);
    // clear any existing content in the book list
    bookList.innerHTML = '';

    // iterate over each book and create HTML elements to display it
    books.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.classList.add('book');
      bookElement.innerHTML = `
        <div>
          <span><strong>Title:</strong> ${book.title}</span>
          <span><strong>Author:</strong> ${book.author}</span>
        </div>
        <button class="delete">Remove</button>
      `;
      // Append the book element to the book list
      bookList.appendChild(bookElement);
    });
  }

  // Static method to add a book to localstorage
  static addBook() {
    // Get title and author input elements from the DOM
    const titleInput = document.getElementById('titleInput');
    const authorInput = document.getElementById('authorInput');
    // trim and retrieve values from the input elements
     const title = titleInput.value.trim();
     const author = authorInput.value.trim();
  }
}
