var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
        <html>
        <head>
        <title>Table</title>
            <style>
                table {
                    width: 70%; /* Triplica la larghezza della tabella */
                    border-collapse: collapse; /* Bordo semplice senza effetti */
                }
                th, td {
                    border: 1px solid black; /* Bordo semplice */
                    padding: 8px; /* Aggiunge un po' di spazio all'interno delle celle */
                    text-align: left; /* Allinea il testo a sinistra */
                }
            </style>
        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Matti meikalainen</td>
                        <td>Timotie 1 as 10</td>
                        <td>Tampere</td>
                    </tr>
                    <tr>
                        <td>Maija</td>
                        <td>Asematie 12</td>
                        <td>Kiljava</td>
                    </tr>
                </tbody>
            </table>
        </body>
        </html>
    `);
}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
