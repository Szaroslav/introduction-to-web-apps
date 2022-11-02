onload = () => {
    const sliderOptions = [
        {bgImage: 'slider-img-1.jpg', borderColor: 'orange'},
        {bgImage: 'slider-img-2.jpg', borderColor: 'cyan'},
        {bgImage: 'slider-img-3.jpg', borderColor: 'purple'},
    ];
    const slider = document.querySelector('.slider');
    let counter = 0;

    document.querySelector('.slider-button').addEventListener('click', () => {
        counter++;
        slider.style.backgroundImage = `url('./images/${sliderOptions[counter % 3].bgImage}')`;
        slider.style.borderColor = sliderOptions[counter % 3].borderColor;
    });
};