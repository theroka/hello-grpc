# hello-grpc

Small sample project to echo "hellos" with GRPC. Composed of:

  + *server*, GRPC server to echoing a "hello" message
  + *client*, GRPC client to call RPC methods from server

## Server

To install dependencies
```
cd server/
yarn install
```

To build project
```
yarn gulp
```
Runs gulp default task through node_modules/.bin/gulp.
Output is written to ./server/build

Run server with
```
cs server/
node build/index.js
```

## Client

To install dependencies
```
cd client/
yarn install
```

To build project
```
yarn gulp
```
Runs gulp default task through node_modules/.bin/gulp.
Output is written to ./client/build

Start client with
```
cs client/
node build/index.js
```
