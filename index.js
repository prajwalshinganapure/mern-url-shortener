const express = require("express");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const urlRoutes = require("./routes/url");

const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => console.log("MongoDB connected"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (req, res) => {
 return res.send("<h1>Hello World!</h2>");
});



app.use("/url", urlRoutes);

app.get ('/:shortId', async(req, res) => {
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate({
shortId
}, { $push:{
    visitHistory:{
        timestamp: Date.now()
    }
}})
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => console.log(`Server running on port ${port}`));