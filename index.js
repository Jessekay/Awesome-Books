// book classes
class BookCollection {
  constructor() {
    this.books = [];
    this.bookList = document.getElementById('book-list');
    this.addBookForm = document.getElementById('add-book-form');
    this.titleInput = document.getElementById('title-input');
    this.authorInput = document.getElementById('author-input');

    this.addBookForm.addEventListener('submit', this.handleAddBook.bind(this));
    this.getFromLocalStorage();
    this.renderBookList();
  }

  handleAddBook(event) {
    event.preventDefault();
    const title = this.titleInput.value;
    const author = this.authorInput.value;
    this.addBook(title, author);
    this.renderBookList();
    this.resetForm();
  }

  addBook(title, author) {
    this.books.push({ title, author });
    this.updateLocalStorage();
  }

  removeBook(index) {
    this.books = this.books.filter((book, i) => i !== index);
    this.updateLocalStorage();
  }

  renderBookList() {
    this.bookList.innerHTML = '';
    this.books.forEach((book, index) => {
      const li = document.createElement('p');
      li.innerHTML = `"${book.title}" by ${book.author} <br> `;
      this.bookList.appendChild(li);
      li.dataset.index = index;

      const removeButton = document.createElement('button');
      removeButton.innerHTML = 'Remove';
      removeButton.addEventListener('click', () => {
        const index = parseInt(li.dataset.index, 10);
        this.removeBook(index);
        this.renderBookList();
      });
      li.appendChild(removeButton);
      if (index % 2 === 1) {
        li.classList.add('white');
      }
    });
  }

  resetForm() {
    this.addBookForm.reset();
  }

  updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  getFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks !== null) {
      this.books = JSON.parse(storedBooks);
    }
  }
}
const bookCollection = new BookCollection();
bookCollection.resetForm();
