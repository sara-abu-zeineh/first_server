const http = require('http');
const fs = require('fs');
const hostName = '127.0.0.1';
const port = process.env.PORT || 4000;
const querystring = require('querystring');
const url = require('url');
const {getHashes} = require('crypto');


const server = http.createServer((req, res) => {
    // const parsed = url.parse(req.url);
    // const query  = querystring.parse(parsed.query);
    // const queryString = req.url.slice(2, req.url.length);
    // // const t = querystring.parse(queryString)
    // console.log(t, query, queryString)

    // if (req.url === '/') {
    //     fs.readFile('./index.html', (err, data) => {
    //         if (err) {
    //             console.log('server error');
    //             res.statusCode = 500;
    //             res.end('File Does not Exist')
    //         } else {
    //             res.writeHead(200, {'Content-Type': 'text/html'})
    //             res.write(data)
    //             // res.end(data);
    //         }
    //     });
    // } else if (query.user_name && query.password) {
    //     res.writeHead(200, {'Content-Type': 'text/html'});
    //     res.write(`Welcome ${query.user_name}`);
    //     res.end();
    // } else {
    //     res.statusCode = 404;
    //     res.end('Not Found!');
    // }
    const reqMethod = req.method;
    console.log(reqMethod)
    switch (reqMethod) {
        case "POST":
            {
                postHandler(req, res);
            }
            break;
        case "GET":
            {
                getHandler(req, res);
            }
            break;
        default:
            {
                defaultHandler(req, res)
            }
    }
});

server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
});

const defaultHandler = (request, response) => {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify({
            message: `API not found at ${
            request.url
        }`
    }));
    response.end();
};

const postHandler = (request, response) => {
    let chunks = '';
    request.on("data", (chunk) => {
        chunks += chunk.toString();
    });
    request.on("end", () => {
        const parsedData = querystring.parse(chunks);
        response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        console.log(parsedData)
        response.write(`🦄 يسعد صباحك يا ${
            parsedData.user_name
        } 🦄`);
        response.end();
    });
};
const getHandler = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    const file = fs.readFileSync('./index.html');
    response.write(file);
}
