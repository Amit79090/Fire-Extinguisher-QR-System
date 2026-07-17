// Get the ID from the URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// Load extinguisher data
fetch("extinguishers.json")
    .then(response => response.json())
    .then(data => {

        // ==========================
        // HOME PAGE (NO ID)
        // ==========================
        if (!extinguisherId) {

            let html = `
                <div style="max-width:900px;margin:30px auto;font-family:Poppins,sans-serif;padding:15px;">
                    <h2 style="text-align:center;color:#d32f2f;">
                        🧯 Fire Extinguisher List
                    </h2>

                    <p style="text-align:center;">
                        Select an extinguisher to view complete details.
                    </p>
            `;

            data.forEach(ext => {

                html += `
                    <div style="
                        background:#fff;
                        border-radius:15px;
                        padding:20px;
                        margin-bottom:15px;
                        box-shadow:0 4px 12px rgba(0,0,0,0.15);
                    ">

                        <h3 style="margin:0;color:#d32f2f;">
                            ${ext.id}
                        </h3>

                        <p><strong>Extinguisher No:</strong> ${ext.number}</p>

                        <p><strong>Location:</strong> ${ext.location}</p>

                        <p><strong>Type:</strong> ${ext.type}</p>

                        <a href="?id=${ext.id}"
                           style="
                            display:inline-block;
                            margin-top:10px;
                            background:#d32f2f;
                            color:white;
                            text-decoration:none;
                            padding:10px 18px;
                            border-radius:8px;
                            font-weight:bold;">
                            View Details
                        </a>

                    </div>
                `;
            });

            html += "</div>";

            document.body.innerHTML = html;
            return;
        }

        // ==========================
        // DETAIL PAGE
        // ==========================

        const ext = data.find(item =>
            item.id.trim().toUpperCase() === extinguisherId.trim().toUpperCase()
        );

        if (!ext) {

            document.body.innerHTML = `
                <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Poppins,sans-serif;">
                    <div style="background:white;padding:40px;border-radius:20px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,.2);">
                        <h2 style="color:red;">❌ Fire Extinguisher Not Found</h2>
                        <p>Invalid QR Code.</p>
                    </div>
                </div>
            `;

            return;
        }

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
            <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Poppins,sans-serif;">
                <div style="background:white;padding:40px;border-radius:20px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,.2);">
                    <h2 style="color:red;">⚠ Error</h2>
                    <p>Unable to load extinguisher information.</p>
                </div>
            </div>
        `;

    });
