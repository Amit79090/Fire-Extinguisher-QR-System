// Get Extinguisher ID from URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// Load JSON file
fetch("extinguishers.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Unable to load extinguisher data.");
        }
        return response.json();
    })
    .then(data => {

        // Find matching extinguisher
        const ext = data.find(item => item.id === extinguisherId);

        // If extinguisher not found
        if (!ext) {

            document.body.innerHTML = `
            <div style="
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                font-family:Poppins,sans-serif;
                background:#f4f6f9;
            ">
                <div style="
                    background:white;
                    width:420px;
                    padding:40px;
                    border-radius:20px;
                    box-shadow:0 10px 30px rgba(0,0,0,.15);
                    text-align:center;
                ">

                    <div style="font-size:70px;">🧯</div>

                    <h2 style="color:#c62828;">
                        Fire Extinguisher Not Found
                    </h2>

                    <p>
                        Invalid QR Code or Extinguisher ID.
                    </p>

                </div>
            </div>
            `;

            return;
        }

        // Display Information
        document.getElementById("number").textContent = ext.number;
        document.getElementById("id").textContent = ext.id;
        document.getElementById("location").textContent = ext.location;
        document.getElementById("type").textContent = ext.type;
        document.getElementById("capacity").textContent = ext.capacity;
        document.getElementById("lastInspection").textContent = ext.lastInspection;
        document.getElementById("nextInspection").textContent = ext.nextInspection;

        // Clickable Fire Contact
        document.getElementById("fireContact").innerHTML =
            `<a href="tel:${ext.fireContact}">${ext.fireContact}</a>`;

        // Call Button
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
            font-family:Poppins,sans-serif;
            background:#f4f6f9;
        ">

            <div style="
                background:white;
                width:420px;
                padding:40px;
                border-radius:20px;
                box-shadow:0 10px 30px rgba(0,0,0,.15);
                text-align:center;
            ">

                <div style="font-size:70px;">⚠️</div>

                <h2 style="color:#c62828;">
                    Error Loading Data
                </h2>

                <p>
                    Unable to load extinguisher information.
                </p>

                <p>
                    Please contact the administrator.
                </p>

            </div>

        </div>
        `;

    });
