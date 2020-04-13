const booksList = document.querySelector("#books-list");

const form = document.querySelector("#add-book-form");
//create element and render books
function renderBook(doc) {
  let li = document.createElement("li");
  let title = document.createElement("span");
  let author = document.createElement("span");
  let isbn = document.createElement("span");
  let published_year = document.createElement("span");
  let genre = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  title.textContent = doc.data().title;
  author.textContent = doc.data().author;
  isbn.textContent = doc.data().isbn;
  published_year.textContent = doc.data().published_year;
  genre.textContent = doc.data().genre;

  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(genre);
  li.appendChild(published_year);
  li.appendChild(isbn);

  booksList.appendChild(li);
}

//saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("books").add({
    title: form.title.value,
    author: form.author.value,
    genre: form.genre.value,
    published_year: form.published_year.value,
    isbn: form.isbn.value,
  });
  db.collection("books")
    .where("title", "==", form.title.value)
    .where("author", "==", form.author.value)
    .where("genre", "==", form.genre.value)
    .where("published_year", "==", form.published_year.value)
    .where("isbn", "==", form.isbn.value)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => renderBook(doc));
    });

  var div = document.getElementById("added-info");
  div.innerHTML += "You have successfully added a book to database!";
  document.getElementById("add-book-form").style.display = "none";
  form.title.value = "";
  form.author.value = "";
  form.genre.value = "";
  form.published_year.value = "";
  form.isbn.value = "";
});
