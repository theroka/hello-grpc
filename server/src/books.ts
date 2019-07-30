import intoStream from "into-stream";
import { data, IBook } from "./data";

// @see: https://github.com/malijs/mali/issues/85#issuecomment-479572232
export async function getAll(ctx: any) {
  let src = data.books.map(({ title, author }: IBook) => ({ title, author }));
  ctx.res = intoStream.object(src);
}

export async function getByTitle(ctx: any) {
  const { title } = ctx.req;
  let src = data.books.filter(
    (book: IBook) =>
      book.title.toLowerCase().trim() === title.toLowerCase().trim()
  );
  ctx.res = intoStream.object(src);
}

export async function getByAuthor(ctx: any) {
  const { author } = ctx.req;
  let src = data.books.filter(
    (book: IBook) =>
      book.author.toLowerCase().trim() === author.toLowerCase().trim()
  );
  ctx.res = intoStream.object(src);
}

export async function addBooks(ctx: any) {
  ctx.res = await ((input: any) => {
    let addedBooks: Array<IBook> = [];

    return new Promise((resolve, reject) => {
      input.on("data", (book: any) => {
        console.log("add book", book);
        addedBooks.push(book);
        data.books.push(book);
      });

      input.on("end", () => resolve({ books: addedBooks }));
    });
  })(ctx.req);
}

export async function deleteBooks(ctx: any) {
  ctx.res = await ((input: any) => {
    let deletedBooks: Array<IBook> = [];

    return new Promise((resolve, reject) => {
      input.on("data", (toDelete: IBook) => {
        console.log("delete book", toDelete);
        deletedBooks.push(toDelete);
        let filtered = data.books.filter((book: IBook) => {
          let t1 = book.title.toLowerCase().trim();
          let t2 = toDelete.title.toLowerCase().trim();
          let a1 = book.author.toLowerCase().trim();
          let a2 = toDelete.author.toLowerCase().trim();
          return !(a1 === a2 && t1 === t2);
        });
        data.books = filtered;
      });

      input.on("end", () => resolve({ books: deletedBooks }));
    });
  })(ctx.req);
}
