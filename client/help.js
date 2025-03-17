document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("help-form");

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile_number = document.getElementById('number').value;
        const message = document.getElementById('message').value;

        const formData = { name, email, mobile_number, message };

        try {
            const response = await fetch('http://localhost:5000/submit-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you for reaching out. We will get back to you soon!');
                form.reset();
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    });
});
