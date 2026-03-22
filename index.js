const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");


const urlRoutes = require("./routes/url");
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
const { restrictToLogginUserOnly, checkAuth } = require("./middleware/auth");



const app = express();
const port = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener")
  .then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "/views"));
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLogginUserOnly, urlRoutes);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );

    if (!entry) {
        return res.send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
});

app.listen(port, () => console.log(`Server running on port ${port}`));