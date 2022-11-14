onload = () => {
    const game = document.querySelector('.game-wrapper');
    const ball = document.querySelector('.game-ball');
    const outOfBorderMsg = document.querySelector('.message-out-of-border');
    let timeoutId;

    const showOutOfBorderMsg = duration => {
        if (timeoutId)
            clearTimeout(timeoutId);
        
        outOfBorderMsg.classList.add('visible');
        timeoutId = setTimeout(() => outOfBorderMsg.classList.remove('visible'), duration);
    };

    window.addEventListener('click', e => {
        if (e.target !== game) {
            showOutOfBorderMsg(2000);
            return;
        }
        
        const rect = game.getBoundingClientRect();
        const x = e.clientX - rect.left - ball.offsetWidth / 2;
        const y = e.clientY - rect.top - ball.offsetHeight / 2;
        ball.style.transform = `translate(${x}px, ${y}px)`;
    });
};