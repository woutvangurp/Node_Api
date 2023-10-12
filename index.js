const express = require('express');
const mysql = require('mysql');
// const app = express();
// const port = 2023;
const http = require("http");
const app = require("./app");
const server = http.createServer(app); // of gebruik express

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
console.log(`Server running on port ${port}`);
});

app.listen(port, () => {
    console.log(`deze app is te bereiken op: https:localost:${port}`);
});
// app.use(express.urlencoded({ extended: true, })); //parses all the urlencoded bodies

// set up database connection MySQL

// const con = mysql.createConnection(
//     {
//         host: "localhost", 
//         user: "root", 
//         password: "", 
//         database: "bier"
//     }
// );

// con.connect(function (err) {
//     if (err) throw err;
//     //console.log("Database connected!");
//     res.json ({  data: result, hello: "hallo"})
// });
    
    // endpoints
// app.get("/getBeers", (req, res) => {
//     // gebruik con (connection met jouw database) om query te kunnen schrijven
//     con.query("SELECT * FROM b__bier LIMIT 5", function (err, result, fields) {
//     if (err) throw err;
//     console.log("result", result)
//     res.json({ message: result }); // geef json out put op endpoint "/api/customers"
//     });
// });

// app.get("/", (req, res) => {
//     res.send('Dit is voorbeeld van <br> - een simpele rest-API (via Express) <br> - met mysql database connectie');
// }); // hier werkten de enters niet dus ik heb een nieuwe regel toegevoegd maar ik heb een onderbuikgevoel dat dit niet gaat werken, of dit is dat ik nog moet eten.
// // en waar haald dit gedeelte code de res vandaan? want deze is nog niet aangeroepen in deze app.