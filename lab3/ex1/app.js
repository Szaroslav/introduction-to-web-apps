onload = () => {
    const name = prompt('Enter your name:');
    document.querySelector('.message').textContent = `Hello, ${name[name.length - 1] === 'a' ? 'mrs' : 'mr'}. ${name}!`;
}