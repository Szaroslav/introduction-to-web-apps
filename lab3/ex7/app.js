onload = () => {
    const lesserList = document.querySelector('.lesser-poland-container .data-list');
    const doubleAList = document.querySelector('.double-a-container .data-list');
    const nthDensityList = document.querySelector('.nth-density-container .data-list');
    const populationList = document.querySelector('.population-container .data-list');
    const aboveOrUnderList = document.querySelector('.above-or-under-container .data-list');
    const averageAreaList = document.querySelector('.average-area-container .data-list');
    const greaterThanList = document.querySelector('.greater-than-container .data-list');

    const getData = () => {
        return fetch('http://localhost:3000/cities')
            .then(res => res.json());
    };

    const createElement = (tag, className = '', text = '', children = []) => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        children.forEach(child => el.append(child));

        return el;
    };

    const createItem = contentText => {
        return createElement('li', 'data-item uk-card uk-card-default uk-card-body uk-card-small', contentText);
    };

    const renderLesserCities = data => {
        data
            .filter(row => row.province === 'małopolskie')
            .forEach(row => lesserList.append(createItem(row.name)));
    };

    const renderDoubleACities = data => {
        data
            .filter(row => (row.name.match(/[Aa]/g) ?? []).length === 2)
            .forEach(row => doubleAList.append(createItem(row.name)));
    };

    const renderNthDensityCity = (data, n) => {
        nthDensityList.append(
            createItem(data.sort((a, b) => b.dentensity - a.dentensity)[n - 1].name)
        );
    };

    const renderAbovePopulationCities = (data, n) => {
        data
            .filter(row => row.people > n)
            .forEach(row => {
                row.name += ' City';
                populationList.append(createItem(row.name));
        });
    };

    const renderAboveOrUnderCities = (data, n) => {
        let counterAbove = 0, counterUnder = 0;
        data.forEach(row => {
                if (row.people > n) counterAbove++;
                else if (row.people < n) counterUnder++;
        });

        aboveOrUnderList.append(createItem(counterAbove >= counterUnder ? `Above, ${counterAbove}` : `Under, ${counterUnder}`));
    };

    const renderAverageArea = (data, letter) => {
        let sum = 0;
        const filteredData = data.filter(row => row.name[0] === letter);
        filteredData.forEach(row => sum += row.area);

        averageAreaList.append(createItem(`${Math.round(sum / filteredData.length * 100) / 100} km^2`));
    };

    const renderGreaterThan = (data, province, n) => {
        let counter = 0;
        const filteredData = data.filter(row => row.province === province);
        filteredData.forEach(row => row.people > n && counter++);

        greaterThanList.append(createItem((counter === filteredData.length ? 'Yes' : 'No') + `, ${counter}` ));
    };

    getData().then(data => {
        renderLesserCities(data);
        renderDoubleACities(data);
        renderNthDensityCity(data, 5);
        renderAbovePopulationCities(data, 100000);
        renderAboveOrUnderCities(data, 80000);
        renderAverageArea(data, 'P');
        renderGreaterThan(data, 'pomorskie', 5000);
    });
};