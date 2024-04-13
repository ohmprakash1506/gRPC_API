const client = require('./client')

client.getAllNews({}, (error, response) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(response);
    }
});