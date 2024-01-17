import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.breakingbadquotes.xyz/v1/quotes";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let dialog;
let charecter

app.get("/", async(req, res) =>{
    try{
        const response = await axios.get(API_URL);
        const result = response.data;
        dialog = result[0].quote;
        charecter = result[0].author;
        res.render("index.ejs", {  
            Dialog: dialog, 
            Character: charecter,  
        });
        console.log(result)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });