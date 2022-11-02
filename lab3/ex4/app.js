onload = () => {
    const button = document.querySelector('.button-click');
    const attachButton = document.querySelector('.button-attach');
    const detachButton = document.querySelector('.button-detach');
    const message = document.querySelector('.message');
    let counter = 0;

    const count = () => {
        counter++;
        message.textContent = `Counter: ${counter}`;
    }

    button.disabled = true;
    detachButton.disabled = true;

    attachButton.addEventListener('click', e => {
        counter = 0;
        message.textContent = 'Button listener has been attached.';
        button.addEventListener('click', count);
        button.disabled = false;
        attachButton.disabled = true;
        detachButton.disabled = false;
    });

    detachButton.addEventListener('click', () => {
        message.textContent = 'Button listener has been detached.';
        button.removeEventListener('click', count);
        button.disabled = true;
        attachButton.disabled = false;
        detachButton.disabled = true;
    });
}