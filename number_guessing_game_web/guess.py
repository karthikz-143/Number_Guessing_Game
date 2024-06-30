from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)
random_number = random.randint(1, 100)
attempts = 0
guesses = []

@app.route('/')
def index():
    global attempts, guesses
    attempts = 0
    guesses = []
    return render_template('index.html')

@app.route('/guess', methods=['POST'])
def guess():
    global random_number, attempts, guesses
    guess = int(request.json['guess'])
    attempts += 1
    guesses.append(guess)
    
    if guess < random_number:
        return jsonify(message="Too low! Try again.", attempts=attempts, guesses=guesses)
    elif guess > random_number:
        return jsonify(message="Too high! Try again.", attempts=attempts, guesses=guesses)
    else:
        random_number = random.randint(1, 100)  # Reset for a new game
        attempt_summary = f"Congratulations! You guessed the correct number: {guess}. It took you {attempts} attempts."
        return jsonify(message=attempt_summary, attempts=attempts, guesses=guesses, won=True)

if __name__ == '__main__':
    app.run(debug=True)
