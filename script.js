// Get Extinguisher ID from URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// If no ID is present, show Search Page
if (!extinguisherId) {

    document.getElementById("searchPage").style.display = "flex";
    document.getElementById("card").style.display = "none";

    document.getElementById("searchBtn").addEventListener("click", function () {

        const id = document.getElementById("searchBox").value.trim();

        if (id !== "") {
            window.location.href = "?id=" + encodeURIComponent(id);
        } else {
            alert("Please enter an Extinguisher ID.");
        }

    });

} else {

    // Hide Search Page and Show Card
    document.getElementById("searchPage").style.display = "none";
    document.getElementById("card").style.display = "block";

    // Load JSON
    fetch("extinguishers.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load extinguisher data.");
            }

            return response.json();

        })

        .then(data => {

            const ext = data.find(item => item.id === extinguisherId);

            // If Extinguisher Not Found
            if (!ext) {

                document.body.innerHTML = `

                <div style="
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    height:100vh;
                    background:#f4f6f9;
                    font-family:Poppins,sans-serif;
                ">

                    <div style="
                        background:white;
                        width:420px;
                        padding:40px;
                        border-radius:20px;
                        text-align:center;
                        box-shadow:0 10px 30px rgba(0,0,0,.15);
                    ">

                        <div style="font-size:80px;">🧯</div>

                        <h2 style="color:#c62828;">
                            Fire Extinguisher Not Found
                        </h2>

                        <p>
                            Invalid QR Code or Extinguisher ID.
                        </p>

                        <br>

                        <a href="./"
                        style="
                        background:#c62828;
                        color:white;
                        text-decoration:none;
                        padding:12px 25px;
                        border-radius:8px;
                        display:inline-block;
                        ">
                        Home
                        </a>

                    </div>

                </div>

                `;

                return;
            }

            // Populate Data
            document.getElementById("number").textContent = ext.number;
            document.getElementById("id").textContent = ext.id;
            document.getElementById("location").textContent = ext.location;
            document.getElementById("type").textContent = ext.type;
            document.getElementById("capacity").textContent = ext.capacity;
            document.getElementById("lastInspection").textContent = ext.lastInspection;
            document.getElementById("nextInspection").textContent = ext.nextInspection;

            document.getElementById("fireContact").innerHTML =
                `<a href="tel:${ext.fireContact}">${ext.fireContact}</a>`;

            document.getElementById("callButton").href =
                `tel:${ext.fireContact}`;

        })

        .catch(error => {

            console.error(error);

            document.body.innerHTML = `

            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:#f4f6f9;
                font-family:Poppins,sans-serif;
            ">

                <div style="
                    background:white;
                    width:420px;
                    padding:40px;
                    border-radius:20px;
                    text-align:center;
                    box-shadow:0 10px 30px rgba(0,0,0,.15);
                ">

                    <div style="font-size:80px;">⚠️</div>

                    <h2 style="color:#c62828;">
                        Error Loading Data
                    </h2>

                    <p>
                        Unable to load extinguisher information.
                    </p>

                </div>

            </div>

            `;

        });

}
