// Get the ID from the URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// If no ID is provided
if (!extinguisherId) {
    document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Poppins,sans-serif;">
            <div style="background:white;padding:40px;border-radius:20px;text-align:center;box-shadow:0 10px 25px rgba(0,0,0,.2);">
                <h2>🧯 Fire Extinguisher QR System</h2>
                <p>Please scan a valid QR Code.</p>
            </div>
        </div>
    `;
} else {

    fetch("extinguishers.json")
        .then(response => response.json())
        .then(data => {

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

}
