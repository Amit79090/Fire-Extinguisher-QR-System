// Get Extinguisher ID from URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// Load Fire Extinguisher Data
fetch("extinguishers.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load JSON file.");
        }
        return response.json();
    })
    .then(data => {

        // Find matching extinguisher
        const ext = data.find(item => item.id === extinguisherId);

        // If not found
        if (!ext) {

            document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:#eef2f7;
                font-family:Poppins,sans-serif;
            ">

                <div style="
                    background:white;
                    padding:40px;
                    border-radius:20px;
                    box-shadow:0 10px 25px rgba(0,0,0,.15);
                    width:420px;
                    text-align:center;
                ">

                    <h1 style="font-size:60px;">🧯</h1>

                    <h2 style="color:#c62828;">
                        Fire Extinguisher Not Found
                    </h2>

                    <p>
                        Please check the QR Code or Extinguisher ID.
                    </p>

                </div>

            </div>
            `;

            return;
        }

        // Display Extinguisher Details
        document.getElementById("number").textContent = ext.number;
        document.getElementById("id").textContent = ext.id;
        document.getElementById("location").textContent = ext.location;
        document.getElementById("type").textContent = ext.type;
        document.getElementById("capacity").textContent = ext.capacity;
        document.getElementById("lastInspection").textContent = ext.lastInspection;
        document.getElementById("nextInspection").textContent = ext.nextInspection;

        document.getElementById("fireContact").innerHTML =
            `<a href="tel:${ext.fireContact}">${ext.fireContact}</a>`;

    })
    .catch(error => {

        console.error(error);

        document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            background:#eef2f7;
            font-family:Poppins,sans-serif;
        ">

            <div style="
                background:white;
                padding:40px;
                border-radius:20px;
                box-shadow:0 10px 25px rgba(0,0,0,.15);
                width:420px;
                text-align:center;
            ">

                <h1 style="font-size:60px;">⚠️</h1>

                <h2 style="color:#c62828;">
                    Error Loading Data
                </h2>

                <p>
                    Unable to load extinguisher information.
                </p>

                <p>
                    Please contact the system administrator.
                </p>

            </div>

        </div>
        `;

    });
