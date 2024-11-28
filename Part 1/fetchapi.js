document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const results = document.querySelector("#results");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const input1 = document.querySelector("#input1").value.trim();
        const input2 = document.querySelector("#input2").value;

        if (!input1) {
            alert("Please enter choice!");
            return;
        }
        if (input2 <= 2) {
            alert("Number of images must be more 2!");
            return;
        }

        results.innerHTML = "";
        try {
            const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${input1}&per_page=${input2}&image_type=photo&orientation=horizontal`);
            const data = await response.json();

            if (data.hits && data.hits.length > 0) {
                data.hits.forEach(item => {
                    const itemElement = document.createElement("section");
                    itemElement.classList.add("item");
                    itemElement.innerHTML = `
                        <figure class="item__image-container">
                            <img class="item__image" src="${item.largeImageURL}" alt="${item.tags}" />
                        </figure>
                        <div class="item__main-container">
                            <h2>Image Details:</h2>
                            <p><strong>Downloads:</strong> ${item.downloads}</p>
                            <p><strong>LargeImageURL:</strong> <a href="${item.largeImageURL}">${item.largeImageURL}</a></p>
                            <p><strong>Image Likes:</strong> ${item.likes}</p>
                            <p><strong>Tags:</strong> ${item.tags}</p>
                            <p><strong>Image Type:</strong> ${item.type}</p>
                            <p><strong>User Name:</strong> ${item.user}</p>
                            <p><strong>URL:</strong></p>
                            <a href="${item.pageURL}" target="_new">${item.pageURL}</a>
                        </div>
                    `;
                    results.appendChild(itemElement);
                });
            } else {
                results.innerHTML = "<p>No data found!</p>";
            }
        } catch (error) {
            alert("Failed to fetch data. Please try again later.");
            console.error(error);
        }
    });
});
