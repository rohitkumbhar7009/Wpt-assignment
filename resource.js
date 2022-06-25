let dbparams =
{
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'kolhapur',
    port: 3306
};
const mysql = require('mysql2'); //fate
const con = mysql.createConnection(dbparams);//fate  

const express = require('express');
const app = express();

app.use(express.static("sf"));


app.get("/getItem", (req, resp) => {
    let input = req.query.x;
    console.log(input);
    let output = { itemnofoundstatus: false, itemdetails: { resourceid: 33, resourcename: 'wheat', status: false } };

    con.query('select * from resource where resourceid =?', [input], (error, rows) => {

        if (rows.length > 0) {
            output.itemnofoundstatus = true;
            output.itemdetails = rows[0];

        }
        resp.send(output);


    }
    );

});

app.get("/addItem", (req, resp) => {

    //temporary
    //later on we will see how to read the complete item object itself from http request
    let input = { resourceid: req.query.x, resourcename: req.query.y, status: req.query.z };
    console.log(input);
    let output = true;

    con.query('insert into resource(resourceid,resourcename,status) values (?,?,?)',
        [input.resourceid, input.resourcename, input.status],
        (error, whathappenedtoinsert) => {
            if (error) {

            }

            else if (whathappenedtoinsert.affectedRows > 0) {
                output = true;

            }

            resp.send(output);

        }
    );
});


app.get("/updateitem", (req, resp) => {

    let output = false;
    let input = {
        resourceid: req.query.resourceid,
        resourcename: req.query.resourcename, status: req.query.status
    };


    con.query('update resource set resourcename = ?,status =? where resourceid=?',
        [input.resourcename, input.status, input.resourceid],
        (error, whathappenedtoinsert) => {
            if (error) {
                //when you dont have data why problem is there collect data first.

            }

            else if (whathappenedtoinsert.affectedRows > 0)
                output = true;


            resp.send(output);

        }


    );

});

app.get("/getAllItems", (req, resp) => {

    con.query('select * from resource', [], (error, rows) => {


        resp.send(rows);

    }
    );
});

app.listen(900, function () {
    console.log("server listening at port 900...");
});