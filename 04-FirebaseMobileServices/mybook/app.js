const booksList = document.querySelector("#books-list");

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

db.collection("books")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => renderBook(doc));
  });
