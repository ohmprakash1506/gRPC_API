const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './news.proto';
const option = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, option);
const newsProto = grpc.loadPackageDefinition(packageDefinition);
const server = new grpc.Server();

const news = [
    { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
    { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" }
];

server.addService(newsProto.NewsService.service, {
    getAllNews: (_, callback) => {
        callback(null, { news: news });
    }
});

server.bindAsync("127.0.0.1:50051", grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(`Error starting server: ${error}`);
    } else {
        console.log(`Server is running at port : ${port}`);
    }
});
