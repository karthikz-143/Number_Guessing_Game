function makeGuess() {
    const guess = document.getElementById('guessInput').value;
    fetch('/guess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guess: guess })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('feedback').textContent = data.message;
        if (data.won) {
            displayAttempts(data.attempts, data.guesses);
        } else {
            updateAttempts(data.attempts, data.guesses);
        }
    })
    .catch(error => console.error('Error:', error));
}

function updateAttempts(attempts, guesses) {
    document.getElementById('attempts').textContent = `Attempts: ${attempts}`;
    document.getElementById('guesses').textContent = `Guesses: ${guesses.join(', ')}`;
}

function displayAttempts(attempts, guesses) {
    updateAttempts(attempts, guesses);
}

// Add event listener for Enter key press
document.getElementById('guessInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('guessButton').click();
    }
});
