import Mali from "mali";

async function sayHello(ctx: any) {
  console.log("Server received sayHello", ctx.req)
  ctx.res = { message: `Hello ${ctx.req.name}!` };
}

const app = new Mali(__dirname + "/Hello.proto");
app.use({ sayHello });
app.start("localhost:50001");
console.log("Server ready at localhost:50001...");
