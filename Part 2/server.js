import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;
const apikey = "47273673-549ed5aaf33177036baf753af";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "imageGallery2.html"));
});

app.post("/search", async (req, res) => {
    const { input1, input2 } = req.body;

    if (!input1 || input2 < 2) {
        return res.status(400).send("Invalid input: Please provide a keyword and at least 2 images.");
    }

    try {
        const url = `https://pixabay.com/api/?key=${apikey}&q=${input1}&per_page=${input2}&image_type=photo&orientation=horizontal`;
        const response = await axios.get(url);

        res.render("imageGallery3", { items: response.data.hits });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to fetch images from the Pixabay API.");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
