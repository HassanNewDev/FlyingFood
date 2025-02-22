const emojis = ['🍎', '🍕', '⭐', '🍦', '🎾'];
        const gameContainer = document.getElementById('game-container');
        const scoreElement = document.getElementById('score');
        const timerElement = document.getElementById('timer');
        const startBtn = document.getElementById('start-btn');
        
        let score = 0;
        let timeLeft = 30;
        let gameInterval;
        let timerInterval;

        function createEmoji() {
            const emoji = document.createElement('div');
            emoji.className = 'emoji';
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            const startPosition = Math.random() * (window.innerWidth - 50);
            emoji.style.left = `${startPosition}px`;
            emoji.style.top = '-50px';
            
            emoji.addEventListener('click', () => {
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
                emoji.remove();
            });

            gameContainer.appendChild(emoji);

            // Move emoji down
            const fallInterval = setInterval(() => {
                const currentTop = parseFloat(emoji.style.top);
                emoji.style.top = `${currentTop + 2}px`;

                if (currentTop > window.innerHeight) {
                    emoji.remove();
                    clearInterval(fallInterval);
                }
            }, 16);
        }

        function startGame() {
            // Reset game state
            score = 0;
            timeLeft = 30;
            scoreElement.textContent = `Score: ${score}`;
            timerElement.textContent = `Time: ${timeLeft}`;
            startBtn.style.display = 'none';
            
            // Remove existing emojis
            document.querySelectorAll('.emoji').forEach(emoji => emoji.remove());

            // Start game loops
            gameInterval = setInterval(createEmoji, 1000);
            
            timerInterval = setInterval(() => {
                timeLeft--;
                timerElement.textContent = `Time: ${timeLeft}`;

                if (timeLeft <= 0) {
                    endGame();
                }
            }, 1000);
        }

        function endGame() {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            startBtn.style.display = 'block';
            alert(`Game Over! Final Score: ${score}`);
        }

        startBtn.addEventListener('click', startGame);