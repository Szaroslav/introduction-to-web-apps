onload = () => {
    const messageContainer = document.querySelector('.message-container');
    const counterText = document.querySelector('.counter');
    const buttons = document.querySelectorAll('div.button');
    const propagationButton = document.querySelector('.button-propagation');
    const switchButton = document.querySelector('.button-switch');
    const resetButton = document.querySelector('.button-reset');

    let counter = 0;
    let stopPropagation = false;
    let reversed = false;

    const createElement = (tag, className = '', text = '') => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;

        return el;
    };

    const showMessages = buttons => {
        messageContainer.querySelectorAll('.message-row').forEach(row => row.remove());
        if (reversed)
            buttons.reverse();

        buttons.forEach(btn => {
            const row = createElement('div', `message-row-${btn.classList[0]} message-row`);
            row.append(createElement('p', `message-label ${btn.getAttribute('data-name')}`, btn.getAttribute('data-name')));
            row.append(createElement('p', 'message', `Gained ${btn.getAttribute('data-value')} point${btn.getAttribute('data-value') !== '1' ? 's' : ''}`));

            messageContainer.append(row);
        });
    };

    const handleButtonClick = e => {
        if (stopPropagation)
            e.stopPropagation();

        const btn = e.currentTarget;
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

            if (!stopPropagation) {
                showMessages(
                    e.composedPath()
                        .filter(el => el instanceof HTMLElement)
                        .filter(el => el.classList.contains('button'))
                        .filter(el => el.getAttribute('data-enabled') === 'true')
                );
            }
            else {
                showMessages([btn]);
            }
        }
    };

    const initListeners = useCapture => {
        buttons.forEach(btn => {
            btn.removeEventListener('click', handleButtonClick, !useCapture);
            btn.addEventListener('click', handleButtonClick, useCapture);
        });
    };

    propagationButton.addEventListener('click', () => {
        stopPropagation = !stopPropagation;
        propagationButton.firstElementChild.textContent = stopPropagation ? 'stop' : 'start';
    });

    resetButton.addEventListener('click', () => {
        counter = 0;
        counterText.textContent = counter;
        buttons.forEach((btn, i) => {
            btn.setAttribute('data-enabled', 'true');
        });
    });

    switchButton.addEventListener('click', () => {
        reversed = !reversed;
        switchButton.firstElementChild.textContent = reversed ? 'reversed' : 'default';
        initListeners(reversed);
    });

    initListeners(reversed);
}