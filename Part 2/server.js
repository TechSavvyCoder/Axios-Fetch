import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { PORT, API_KEY } from './env.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "imageGallery2.html"));
});

app.post("/search", async (req, res) => {
    const { input1, input2 } = req.body;

    if (!input1 || input2 <= 2) {
        return res.status(400).send("<center><h2>Invalid input: Please provide a keyword and at least 2 images.</h2></center>");
    }

    try {
        const url = `https://pixabay.com/api/?key=${API_KEY}&q=${input1}&per_page=${input2}&image_type=photo&orientation=horizontal`;

        // =============================== START AXIOS ===============================
        const axiosResponse = await axios.get(url);
        const data = axiosResponse.data.hits;
        // =============================== END AXIOS =================================



        // =============================== START FETCH ===============================
        // const fetchResponse = await fetch(url);
        // const fetchData = await fetchResponse.json();
        // const data = fetchData.hits;
        // =============================== END FETCH =================================

        res.render("imageGallery3", { items: data });
    } catch (error) {
        // console.error(error);
        res.status(500).send("Failed to fetch images from the Pixabay API.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
