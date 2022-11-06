onload = () => {
    const sliderList = document.querySelector('.slider-list');
    const sliderButtons = document.querySelectorAll('.slider-button');
    const randomizeButton = document.querySelector('.randomize-button');
    let index = 0;

    const slide = i => {
        const x = i * (sliderList.offsetWidth + parseInt(getComputedStyle(sliderList).gap));
        sliderList.style.transform = `translateX(-${x}px)`;
    };

    handleClick = e => {
        if (e.target.className.includes('right'))
            index = Math.min(index + 1, sliderList.childElementCount - 1);
        else if (e.target.className.includes('left'))
            index = Math.max(index - 1, 0);
        
        slide(index);
    };

    sliderButtons.forEach(b => b.addEventListener('click', handleClick));
    randomizeButton.addEventListener('click', () => {
        let i = index;
        while (i === index)
            i = Math.floor(Math.random() * sliderList.childElementCount);
        index = i;
        
        slide(index);
    });
};