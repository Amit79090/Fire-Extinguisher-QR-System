// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// If no ID in URL
if (!id) {

    document.querySelector(".card").innerHTML = `
        <div class="header">
            <h1>🧯</h1>
            <h2>Fire Extinguisher QR System</h2>
            <p>Scan a Fire Extinguisher QR Code</p>
        </div>

        <div style="padding:30px;text-align:center;">
            <h3>Welcome</h3>

            <p>
                Scan the QR Code attached to the fire extinguisher
                to view its information.
            </p>

            <br>

            <p><b>Example:</b></p>

            <p>...?id=FE-CHP-001</p>

        </div>
    `;

} else {

    // Load JSON
    fetch("extinguishers.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to load JSON.");
            }

            return response.json();

        })

        .then(data => {

            const ext = data.find(e => e.id === id);

            if (!ext) {

                document.querySelector(".card").innerHTML = `
                    <div class="header">
                        <h1>❌</h1>
                        <h2>Fire Extinguisher Not Found</h2>
                    </div>

                    <div style="padding:30px;text-align:center;">
                        <p>No extinguisher exists with ID:</p>

                        <h3>${id}</h3>
                    </div>
                `;

                return;

            }

            // Fill Data
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

            document.querySelector(".card").innerHTML = `
                <div class="header">
                    <h1>⚠️</h1>
                    <h2>Error</h2>
                </div>

                <div style="padding:30px;text-align:center;">
                    <p>Unable to load extinguisher data.</p>
                </div>
            `;

        });

}
