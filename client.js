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
const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService("localhost:50051", grpc.credentials.createInsecure());

module.exports = client
