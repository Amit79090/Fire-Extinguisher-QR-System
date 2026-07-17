// Get ID from URL
const params = new URLSearchParams(window.location.search);
const extinguisherId = params.get("id");

// Load JSON
fetch("extinguishers.json")
.then(response => response.json())
.then(data => {

    // ===========================
    // HOME PAGE
    // ===========================

    if (!extinguisherId) {

        document.getElementById("homePage").style.display = "block";
        document.getElementById("detailPage").style.display = "none";

        const list = document.getElementById("extinguisherList");

        function displayItems(items){

            list.innerHTML = "";

            items.forEach(ext => {

                list.innerHTML += `
                <div class="ext-card">

                    <h3>${ext.id}</h3>

                    <p><strong>No:</strong> ${ext.number}</p>

                    <p><strong>Location:</strong> ${ext.location}</p>

                    <p><strong>Type:</strong> ${ext.type}</p>

                    <a class="view-btn"
                       href="?id=${ext.id}">
                       View Details
                    </a>

                </div>
                `;

            });

        }

        displayItems(data);

        document.getElementById("searchBox")
        .addEventListener("input", function(){

            const keyword =
            this.value.toLowerCase();

            const filtered =
            data.filter(ext =>

                ext.id.toLowerCase().includes(keyword) ||

                ext.location.toLowerCase().includes(keyword) ||

                ext.type.toLowerCase().includes(keyword) ||

                ext.number.toLowerCase().includes(keyword)

            );

            displayItems(filtered);

        });

        return;

    }

    // ===========================
    // DETAIL PAGE
    // ===========================

    document.getElementById("homePage").style.display = "none";
    document.getElementById("detailPage").style.display = "block";

    const ext = data.find(item =>
        item.id.trim().toUpperCase() ===
        extinguisherId.trim().toUpperCase()
    );

    if(!ext){

        document.body.innerHTML=`
        <div style="display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        font-family:Poppins;">

        <div style="
        background:#fff;
        padding:40px;
        border-radius:20px;
        text-align:center;
        box-shadow:0 10px 20px rgba(0,0,0,.2);">

        <h2 style="color:red;">
        ❌ Fire Extinguisher Not Found
        </h2>

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

    alert("Unable to load extinguisher information.");

});
