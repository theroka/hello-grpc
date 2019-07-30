import caller from "grpc-caller";

interface IBook {
  title: string;
  author: string;
}

const books = caller("localhost:50001", __dirname + "/Books.proto", "Books");

function getAllBooks() {
  const call = books.getAll();
  call.on("data", (d: any) => console.log("get book", d));
  call.on("end", () => console.log("all books received."));
}

function getBooksByAuthor(author: string) {
  const call = books.getByAuthor({ author });
  call.on("data", (d: any) => console.log("get book by author", d));
  call.on("end", () => console.log("books by author received."));
}

function getBooksByTitle(title: string) {
  const call = books.getByTitle({ title });
  call.on("data", (d: any) => console.log("get book by title", d));
  call.on("end", () => console.log("books by title received."));
}

function addBooks(newBooks: Array<IBook>) {
  const { call, res } = books.addBooks();
  res
    .then((res: any) => console.log("added books", res))
    .catch((err: Error) => console.error(err));
  newBooks.forEach(({ title, author }: IBook) => call.write({ title, author }));
  call.end();
}

function deleteBooks(deleteBooks: Array<IBook>) {
  const { call, res } = books.deleteBooks();
  res
    .then((res: any) => console.log("deleted books", res))
    .catch((err: Error) => console.error(err));
  deleteBooks.forEach(({ title, author }: IBook) =>
    call.write({ title, author })
  );
  call.end();
}

// getAllBooks();

// getBooksByAuthor("Leo Tolstoy");
// getBooksByTitle("Hamlet");

// addBooks([
//   { title: "foo", author: "Robin" },
//   { title: "bar", author: "Robin" }
// ]);

// getBooksByAuthor("Robin");

deleteBooks([{ title: "War and Peace", author: "Leo Tolstoy" }]);
getBooksByAuthor("Leo Tolstoy");
// setTimeout(() => getBooksByAuthor("Leo Tolstoy"), 5000);

// getAllBooks();
