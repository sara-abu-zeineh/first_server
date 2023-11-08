const http = require('http');
const fs = require('fs');
const hostName = '127.0.0.1';
const port = process.env.PORT || 4000;
const querystring = require('querystring');
const url = require('url');


const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url);
    const query  = querystring.parse(parsed.query);
    const queryString = req.url.slice(2, req.url.length);
    const t = querystring.parse(queryString)
    console.log(t, query, queryString)

    if (req.url === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                console.log('server error');
                res.statusCode = 500;
                res.end('File Does not Exist')
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                // res.end(data);
            }
        });
    } else if (t.id) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`Hello ${query.id}`);
        res.end();
    } else {
        res.statusCode = 404;
        res.end('Not Found!');
    }
});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});
