import caller from "grpc-caller";

const client = caller("localhost:50001", __dirname + "/Hello.proto", "Hello");

console.log("Send sayHello from client")
client.sayHello({ name: "Robin" }, (err: Error, res: Response) => {
  console.log("Client received", err || res);
})
