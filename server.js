// ===============================
// CONTACT FORM SUBMISSION SCRIPT
// ===============================

const form = document.getElementById("userForm");
const API_BASE_URL = "https://portfolio-ramya.onrender.com"; // your backend URL

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !email || !phone || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Send data to backend
        fetch(`${API_BASE_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                message,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to send message");
                }
                return res.json();
            })
            .then(() => {
                alert("✅ Message sent successfully!");
                form.reset();
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("❌ Something went wrong. Please try again later.");
            });
    });
}
