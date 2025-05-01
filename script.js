const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🥝', '🍍'];
let cards = [...icons, ...icons].sort(() => Math.random() - 0.5);
const gameBoard = document.getElementById('gameBoard');
let firstCard, secondCard, lockBoard = false;

cards.forEach(icon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<div class="front">${icon}</div><div class="back">?</div>`;
    card.addEventListener('click', function() {
        if (lockBoard || this === firstCard) return;
        this.classList.add('flip');
        if (!firstCard) firstCard = this;
        else {
            secondCard = this;
            lockBoard = true;
            setTimeout(() => {
                if (firstCard.innerHTML === secondCard.innerHTML) {
                    firstCard.removeEventListener('click', arguments.callee);
                    secondCard.removeEventListener('click', arguments.callee);
                } else {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                }
                [firstCard, secondCard, lockBoard] = [null, null, false];
            }, 1000);
        }
    });
    gameBoard.appendChild(card);
});