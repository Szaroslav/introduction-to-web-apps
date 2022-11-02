onload = () => {
    const list = document.querySelector('.dynamic-list');

    document.querySelector('.btn-append').addEventListener('click', () => {
        const item = document.createElement('li');
        item.classList.add('list-item');
        item.textContent = 'Item ' + (list.childElementCount + 1);
        
        list.append(item);
    });

    document.querySelector('.btn-remove').addEventListener('click', () => {
        if (list.childElementCount > 0)
            list.firstElementChild.remove();
    });
}