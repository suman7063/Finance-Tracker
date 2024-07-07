// netlify/functions/json-server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = async (event, context) => {
    const res = await new Promise((resolve, reject) => {
        server.use((req, res) => {
            req.method = req.httpMethod;
            res.statusCode = 200;
            server(req, res);
        });
        server.listen(0, () => {
            const port = server.address().port;
            const url = `http://localhost:${port}`;
            fetch(`${url}${event.path}`)
                .then(response => response.text())
                .then(text => resolve({ statusCode: 200, body: text }))
                .catch(err => reject({ statusCode: 500, body: err.message }));
        });
    });

    return res;
};
