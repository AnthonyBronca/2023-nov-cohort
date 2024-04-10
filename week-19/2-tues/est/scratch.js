const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Splash Page');
    }
    if (req.method === 'POST' && req.url === '/cat') {
        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Created a Cat!');
    }
});

const port = 8000;

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
