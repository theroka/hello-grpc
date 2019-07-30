import Mali from "mali";
import * as yargs from "yargs";
import { getAll, getByTitle, getByAuthor, addBooks, deleteBooks } from "./books";

const DEFAULT_PORT = 50001;

const args = yargs
  .option("port", {
    alias: "p",
    description: "Port the server should run at.",
    default: DEFAULT_PORT
  })
  .option("protoDir", {
    alias: "d",
    description: "Base dir of protobuf files.",
    demand: true,
    default: __dirname
  }).argv;

const app = new Mali(args.protoDir + "/Books.proto");
app.use({ getAll, getByTitle, getByAuthor, addBooks, deleteBooks });
app.start(`localhost:${args.port}`);

console.log(`Server ready at localhost:${args.port}...`);
