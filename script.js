// Read Extinguisher ID from URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// Load JSON Data
fetch("extinguishers.json")
.then(response => response.json())
.then(data => {

    // Find the matching extinguisher
    const ext = data.find(e => e.id == extinguisherId);

    // If not found
    if (!ext) {

        document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            font-family:Poppins,sans-serif;
            background:#eef2f7;
        ">

            <div style="
                background:white;
                padding:40px;
                border-radius:20px;
                box-shadow:0 10px 25px rgba(0,0,0,.15);
                text-align:center;
                width:420px;
            ">

                <h1 style="color:#c62828;">
                    🧯
                </h1>

                <h2>Fire Extinguisher Not Found</h2>

                <p>Please check the QR Code.</p>

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
        font-family:Poppins,sans-serif;
        background:#eef2f7;
    ">

        <div style="
            background:white;
            padding:40px;
            border-radius:20px;
            box-shadow:0 10px 25px rgba(0,0,0,.15);
            text-align:center;
            width:420px;
        ">

            <h2>Error Loading Data</h2>

            <p>Please contact the administrator.</p>

        </div>

    </div>
    `;

});
