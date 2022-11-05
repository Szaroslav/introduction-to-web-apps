onload = () => {
    const phonebook = document.querySelector('.phonebook-container');
    const form = document.querySelector('.add-new-item-form');

    const createElement = (tag, className = '', text = '', children = []) => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        children.forEach(child => el.append(child));

        return el;
    };

    const createItem = (name, phoneNumber) => {
        const itemDetails = createElement('div', 'item-details', '', [
            createElement('i', 'item-icon fa-solid fa-skull uk-text-primary'),
            createElement('p', 'item-name uk-text-bold uk-text-emphasis', name),
            createElement('p', 'item-phone-number', phoneNumber)
        ]);
        const button = createElement('button', 'delete-item-button uk-button uk-button-danger', '', [createElement('i', 'fa-solid fa-trash')]);
        const item = createElement('li', 'phonebook-item uk-card uk-card-default uk-card-body', '', [itemDetails, button]);
        button.addEventListener('click', () => item.remove());

        return item;
    };

    const parseFormData = (name, phoneNumber) => {
        phoneNumber = phoneNumber.replaceAll(/\s/g, '');
        phoneNumber = !phoneNumber.match(/\+[0-9]{3}/)
            ? phoneNumber.slice(0, 3) + ' ' + phoneNumber.slice(3, 6) + ' ' + phoneNumber.slice(6)
            : phoneNumber.slice(0, 4) + ' ' + phoneNumber.slice(4, 7) + ' ' + phoneNumber.slice(7, 10) + ' ' + phoneNumber.slice(10);

        return [name, phoneNumber];
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (form.reportValidity()) {
            phonebook.append(createItem(...parseFormData(form.elements.contactFullName.value, form.elements.contactPhoneNumber.value)));
            form.reset();
        }
    });

    phonebook.append(createItem('Jakub Nowak', '+048 666 332 137'));
    phonebook.append(createItem('Robert Kubica', '000 000 000'));
    phonebook.append(createItem('Jan-Krzysztof Duda', '+048 333 902 137'));
};