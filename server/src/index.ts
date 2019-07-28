import Mali from "mali";
import intoStream from "into-stream";

// greetings array works as database, temporary solution
const greetings = ["hello", "hi", "by", "cya"];

async function sayHello(ctx: any) {
  console.log("Server received sayHello", ctx.req);
  ctx.res = { message: `Hello ${ctx.req.name}!` };
}

// @see: https://github.com/malijs/mali/issues/85#issuecomment-479572232
async function getGreetings(ctx: any) {
  let src = greetings.map(title => ({ title }));
  ctx.res = intoStream.object(src);
}

async function doWork(inputStream: any) {
  let messages: Array<{ message: string }> = [];
  return new Promise((resolve, reject) => {
    inputStream.on("data", (d: any) => {
      console.log("inputStream get data", messages);
      messages.push(d);
    });

    inputStream.on("end", () => {
      console.log("inputStream ended", messages);
      resolve({ hellos: messages });
    });
  });
}

async function sayHellos(ctx: any) {
  ctx.res = await doWork(ctx.req);
}

const app = new Mali(__dirname + "/Hello.proto");
app.use({ sayHello, getGreetings, sayHellos });
app.start("localhost:50001");

console.log("Server ready at localhost:50001...");
