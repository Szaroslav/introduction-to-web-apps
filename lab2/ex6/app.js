addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nav-button').addEventListener('click', () => {
        document.querySelector('.nav-button').classList.toggle('clicked');
        document.querySelector('.nav-list').classList.toggle('open');
    });
})