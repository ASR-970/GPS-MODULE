const colab_url = "https://9eb6-34-145-101-146.ngrok-free.app/";  // Use your new ngrok link

function sendLocation(latitude, longitude) {
    fetch(colab_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude: latitude, longitude: longitude })
    })
    .then(response => response.json())
    .then(data => {
        console.log("✅ Sent to Colab:", data);
        document.getElementById("status").innerText = "✅ Location Sent: " + latitude + ", " + longitude;
    })
    .catch(error => {
        console.error("❌ Error:", error);
        document.getElementById("status").innerText = "❌ Error sending data!";
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            document.getElementById("status").innerText = "📍 GPS: " + lat + ", " + lon;
            sendLocation(lat, lon);
        }, error => {
            document.getElementById("status").innerText = "❌ GPS Error: " + error.message;
        });
    } else {
        document.getElementById("status").innerText = "❌ Geolocation not supported!";
    }
}

// Get location on page load
setInterval(getLocation,5000);
