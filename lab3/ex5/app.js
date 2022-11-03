onload = () => {
    const msg = document.querySelector('.message');
    const counterText = document.querySelector('.counter');
    const buttons = document.querySelectorAll('div.button');
    const propagationButton = document.querySelector('.button-propagation');
    const switchButton = document.querySelector('.button-switch');
    const resetButton = document.querySelector('.button-reset');

    let counter = 0;
    let stopPropagation = false;
    let useCapture = false;

    const handleButtonClick = e => {
        const btn = e.currentTarget;

        if (stopPropagation)
            e.stopPropagation();
        
        if (btn.getAttribute('data-enabled') === 'true') {
            counter += parseInt(btn.getAttribute('data-value'));

            if (counter > 30)
                buttons[1].setAttribute('data-enabled', 'false');
            if (counter > 50)
                buttons[2].setAttribute('data-enabled', 'false');

            if (counter >= 100)
                counterText.textContent = '99+';
            else
                counterText.textContent = counter;
        }
        if (e.eventPhase === 2) {
            let buttonState = '';

            if (btn.getAttribute('data-enabled') === 'false')
                buttonState = 'disabled ';
            msg.textContent = `You have been pressed the ${buttonState}${btn.getAttribute('data-name')} button.`;
        }
    }

    const initListeners = useCapture => {
        buttons.forEach(btn => {
            btn.removeEventListener('click', handleButtonClick, !useCapture);
            btn.addEventListener('click', handleButtonClick, useCapture);
        });
    }

    propagationButton.addEventListener('click', () => {
        stopPropagation = !stopPropagation;
        if (stopPropagation)
            propagationButton.firstElementChild.textContent = 'Stop';
        else
            propagationButton.firstElementChild.textContent = 'Start';
    });

    resetButton.addEventListener('click', () => {
        counter = 0;
        counterText.textContent = counter;
        buttons.forEach(btn => btn.setAttribute('data-enabled', 'true'));
    });

    switchButton.addEventListener('click', () => {
        useCapture = !useCapture;
        initListeners(useCapture);
    });

    initListeners(useCapture);
}