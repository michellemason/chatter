const express = require("express");  // import express
const path = require("path");
const axios = require("axios");  // import axios
const app = express();  // create application

app.set("view engine", "ejs"); // allows for using EJS
app.use(express.static(path.join(__dirname, "public"))); // allows for loading files with absolute path

// save URL and headers to easy to use variables
const url = "https://welovechatter.com/devtest.php?format=json";
const token = "AAAAAAAAAAAAAAAAAAAAAMLheAAAAAAA0%2BuSeid%2BULvsea4JtiGRiSDSJSI%3DEUifiRBkKG5E2XzMDjRfl76ZC9Ub0wnz4XsNiRVBChTYbJcE3F";
const hdrs = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json",
}

// method to run when get request at / route (http get)
app.get('/', async (req, res) => {
    try {
        const result = await axios.get(url, {  // await response with req body
            headers: hdrs
        });
        const jobs = result.data.jobs; // save response data to variable
        res.render("index", { // allow render of data to html page
          jobs
        });
      } catch (error) { // simple handle running into an error
        console.log(error);
        res.status(400).send("Oops we had an error.");
      }
});

app.listen(process.env.PORT || 3000); // server running on localhost:3000