document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("admin-login-form");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const adminEmail = document.getElementById("admin-email").value.trim();
        const adminPassword = document.getElementById("admin-password").value.trim();

        try {
            const response = await fetch('http://localhost:5000/admin-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: adminEmail, password: adminPassword })
            });

            const result = await response.json();

            if (result.success) {
                console.log("Login successful! Token:", result.token);
                localStorage.setItem("adminToken", result.token); // Store token
                window.location.href = "admin-dashboard.html"; // Redirect
            } else {
                errorMessage.textContent = "Invalid Credentials!";
                errorMessage.style.color = "red";
            }
        } catch (error) {
            console.error('Error:', error);
            errorMessage.textContent = "Server error. Please try again.";
            errorMessage.style.color = "red";
        }
    });
});
