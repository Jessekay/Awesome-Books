// book classes
class BookCollection {
  constructor() {
    this.books = []; // initialize an empty array to store books
    this.bookList = document.getElementById('book-list'); // get the booklist elements from the DOM
    this.addBookForm = document.getElementById('add-book-form'); // get the add book form element from DOM
    this.titleInput = document.getElementById('title-input'); // get the title element from the DOM
    this.authorInput = document.getElementById('author-input'); // get the author element from the DOM

    // Add an event listener to the form to handle form submissions
    this.addBookForm.addEventListener('submit', this.handleAddBook.bind(this));

    // Load books from local storage
    this.getFromLocalStorage();

    // Render the list of books on the page
    this.renderBookList();
  }

  handleAddBook(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const title = this.titleInput.value; // Get the title value from the input
    const author = this.authorInput.value; // Get the author value from the input
    this.addBook(title, author); // Add the new book to the collection
    this.renderBookList(); // Re-render the list of books
    this.resetForm(); // Reset the form inputs
  }

  addBook(title, author) {
    this.books.push({ title, author }); // Add the new book to the books array
    this.updateLocalStorage(); // Update local storage with the new list of books
  }

  removeBook(index) {
    // Remove the book at the specified index from the books array
    this.books = this.books.filter((book, i) => i !== index);
    this.updateLocalStorage(); // Update local storage with the new list of books
  }

  renderBookList() {
    this.bookList.innerHTML = ''; // Clear the current book list
    this.books.forEach((book, index) => {
      const li = document.createElement('p'); // Create a new paragraph element for each book
      li.innerHTML = `"${book.title}" by ${book.author} <br> `; // Set the inner HTML of the paragraph
      this.bookList.appendChild(li); // Append the paragraph to the book list
      li.dataset.index = index; // Set a data attribute with the book's index

      const removeButton = document.createElement('button'); // Create a remove button
      removeButton.innerHTML = 'Remove'; // Set the button's text
      // Add an event listener to the remove button to handle clicks
      removeButton.addEventListener('click', () => {
        const index = parseInt(li.dataset.index, 10); // Get the index of the book to remove
        this.removeBook(index); // Remove the book
        this.renderBookList(); // Re-render the list of books
      });
      li.appendChild(removeButton); // Append the remove button to the paragraph

      // Add a class to alternate the background color of the list items
      if (index % 2 === 1) {
        li.classList.add('white');
      }
    });
  }

  resetForm() {
    this.addBookForm.reset();// Reset the form inputs
  }

  updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books)); // Store the books array in local storage
  }

  getFromLocalStorage() {
    const storedBooks = localStorage.getItem('books'); // Get the stored books from local storage
    if (storedBooks !== null) {
      this.books = JSON.parse(storedBooks); // Parse and set the books array
    }
  }
}
// Create a new instance of the BookCollection class
const bookCollection = new BookCollection();
bookCollection.resetForm(); // Reset the form inputs on initialization
