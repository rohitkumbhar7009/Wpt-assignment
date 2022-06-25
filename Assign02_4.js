const express = require('express');
const app = express();

const mysql = require('mysql2');

app.use(express.static("sf"));

app.listen(900);

app.get('/getareaname', (req, resp) => {
    console.log("ajax function called");
    const dbobject = {
        host: 'localhost',
        user: 'root',
        password: 'cdac',
        database: 'nashik',
        port: 3306
    }
    const conn = mysql.createConnection(dbobject);

    let output = { status: false, detail: { pin: 0, areaname: "" } }
    let pin = req.query.pin;
    console.log(pin);
    conn.query('select pin, areaname from location where pin = ?', [pin],
        (error, rows) => {
            if (error) {
                console.log(error);
            }
            else {
                if (rows.length > 0) {
                    output.status = true;
                    output.detail = rows[0];
                }
                else {
                    console.log("No area with this pin");
                }
            }
            console.log(output);
            resp.send(output);
        });

});

   
