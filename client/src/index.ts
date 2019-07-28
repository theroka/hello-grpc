import caller from "grpc-caller";

const client = caller("localhost:50001", __dirname + "/Hello.proto", "Hello");

console.log("Send sayHello from client");
client.sayHello({ name: "Robin" }, (err: Error, res: Response) => {
  console.log("Client received", err || res);
});

const call = client.getGreetings();
call.on("data", (d: any) => console.log(d));
call.on("end", () => console.log("all data received."));


function sayHellos() {
  const { call, res } = client.sayHellos();
  res.then((res: any) => console.log("foob", res)).catch((err: Error) => console.error(err));

  call.write({ name: "robin"})
  call.write({ name: "flo"})
  call.write({ name: "thomas"})
  call.end()
}

sayHellos();
