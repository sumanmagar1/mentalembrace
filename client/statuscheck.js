function checkStatus() {
    const question1 = parseInt(document.getElementById('question1').value);
    const question2 = parseInt(document.getElementById('question2').value);
    const question3 = parseInt(document.getElementById('question3').value);
    const mood = document.getElementById('mood').value;
    
    const statusResult = document.getElementById('status-result');
    const statusMessage = document.getElementById('status-message');
    const moodMessage = document.getElementById('mood-message');
    const videoLink = document.getElementById('video-link');

    statusResult.classList.remove('hidden');

    // Calculate total score
    const totalScore = question1 + question2 + question3;

    // Determine status message based on total score
    let statusRecommendation = '';
    if (totalScore <= 4) {
        statusRecommendation = "Your mental health seems to be in a good state. Keep up the good work and continue practicing self-care!";
    } else if (totalScore <= 8) {
        statusRecommendation = "You may be experiencing mild stress. Consider incorporating relaxation techniques into your daily routine.";
    } else if (totalScore <= 11) {
        statusRecommendation = "You might be dealing with moderate stress levels. It may be helpful to talk to a friend or consider professional support.";
    } else {
        statusRecommendation = "Your responses indicate high stress levels. We strongly recommend reaching out to a mental health professional for support.";
    }

    statusMessage.textContent = statusRecommendation;

    // Determine mood message and video link
    const moodResponses = {
        happy: {
            message: "That's wonderful! Your positive energy can brighten someone else's day too. Keep spreading joy!",
            video: "https://www.youtube.com/watch?v=ZbZSe6N_BXs"
        },
        sad: {
            message: "I'm sorry you're feeling down. Remember, it's okay to have bad days. This feeling will pass, and there are people who care about you.",
            video: "https://www.youtube.com/watch?v=STdJ__8ORyE"
        },
        anxious: {
            message: "Anxiety can be challenging, but you're stronger than you think. Take deep breaths and remember that you've overcome difficult times before.",
            video: "https://www.youtube.com/watch?v=O-6f5wQXSu8"
        },
        excited: {
            message: "Your enthusiasm is contagious! Embrace this positive energy and let it fuel your day.",
            video: "https://www.youtube.com/watch?v=ru0K8uYEZWw"
        },
        tired: {
            message: "It's important to listen to your body. Take some time to rest and recharge. Your well-being comes first.",
            video: "https://www.youtube.com/watch?v=5f5N6YFjvVc"
        }
    };

    const response = moodResponses[mood];
    moodMessage.textContent = response.message;
    videoLink.href = response.video;
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('status-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        checkStatus();
    });

    // Add animation to the submit button
    const submitButton = document.querySelector('.btn');
    submitButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    submitButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // Add animation to all select elements
    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(select => {
        select.addEventListener('change', function() {
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
});