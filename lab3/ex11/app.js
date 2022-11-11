onload = async () => {
    const list = document.querySelector('.countries-list');
    const filterForm = document.querySelector('.filter-form');
    const edgeValues = {
        population: {min: Number.MAX_VALUE, max: 0},
        area: {min: Number.MAX_VALUE, max: 0}
    };
    let subregions, data;
    let sortedColumn = list.querySelector('.list-header .item-name > span');

    const getDataJSON = url => {
        return fetch(url).then(res => res.json());
    };

    const createElement = (tag, className = '', text = '', children = []) => {
        const el = document.createElement(tag);
        el.className = className;
        el.textContent = text;
        children.forEach(child => el.append(child));

        return el;
    };

    const parseNumber = n => {
        if (typeof n === 'number')
            n = n.toString();

        return n.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const createItem = (content, isItem) => {
        const item = createElement('li', (isItem ? 'list-item' : 'list-subitem'));

        const contentChildren = [
            createElement('p', 'item-name', content.name !== undefined ? content.name : (isItem ? '' : '-')),
            createElement('p', 'item-capital', content.capital !== undefined ? content.capital[0] : (isItem ? '' : '-')),
            createElement('p', 'item-population', content.population !== undefined ? parseNumber(content.population) : ''),
            createElement('p', 'item-area', content.area !== undefined ? parseNumber(content.area) : '')
        ];

        let element;
        if (isItem) {
            element = createElement('button', 'item-show-button', '', [
                createElement('i', 'icon-show fa-solid fa-chevron-down'),
                createElement('i', 'icon-hide fa-solid fa-chevron-up')
            ]);      
        }
        else {
            element = createElement('div', 'dummy-container item-show-button');
        }
        contentChildren.push(element);

        item.append(createElement('div', 'item-content', '', contentChildren));
        isItem && item.querySelector('.item-content').addEventListener('click', () => item.classList.toggle('active'));
        isItem && item.append(createElement('ul', 'item-list'));
        return item;
    };

    const parseData = data => {
        const dataTemplate = {};
        data.forEach(country =>
            dataTemplate.hasOwnProperty(country.subregion)
            ? dataTemplate[country.subregion].push(country)
            : dataTemplate[country.subregion] = [country]
        );

        data.forEach(country => {
            edgeValues.population.min = Math.min(edgeValues.population.min, country.population);
            edgeValues.population.max = Math.max(edgeValues.population.max, country.population);
            edgeValues.area.min = Math.min(edgeValues.area.min, country.area);
            edgeValues.area.max = Math.max(edgeValues.area.max, country.area);
        });
        
        return dataTemplate;
    };

    const recapSubregions = (subregions, data) => {
        for (const prop in data) {
            const subregion = subregions.filter(subregion => subregion.name === prop)[0];
            if (!subregion)
                continue;
            subregion.population = subregion.area = 0;

            data[prop].forEach(country => {
                subregion.population += country.population;
                subregion.area += country.area;
            });
        }

        subregions.forEach(subregion => {
            subregion.population = Math.round(subregion.population);
            subregion.area = Math.round(subregion.area);
        });
    };

    const parseSubregions = data => {
        const subregions = Object.keys(data).map(key => ({name: key, population: 0, area: 0}));
        recapSubregions(subregions, data);

        return subregions;
    };

    const sortData = (subregions, data, sortBy, ascending) => {
        const compareFn = (a, b) => {
            if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') 
                return (a[sortBy] - b[sortBy]) * (ascending ? 1 : -1);
            else if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string')
                return a[sortBy].localeCompare(b[sortBy]) * (ascending ? 1 : -1);
            else
                return 0;
        };

        subregions.sort(compareFn);
        Object.keys(data).forEach(key => data[key].sort(compareFn));
    };

    const initSorting = () => {
        list.querySelectorAll('.list-header .item-content span').forEach(el => el.addEventListener('click', () => {
            if (el.classList.contains('sorted-ascending')) {
                el.className = 'sorted sorted-descending';
                sortData(subregions, data, el.getAttribute('data-name'), false);
            }
            else if (el.classList.contains('sorted-descending')) {
                el.className = 'sorted sorted-ascending';
                sortData(subregions, data, el.getAttribute('data-name'), true);
            }
            else {
                el.className = 'sorted sorted-ascending';
                sortData(subregions, data, el.getAttribute('data-name'), true);
            }

            sortedColumn && sortedColumn !== el && (sortedColumn.className = '');
            sortedColumn = el;
            render(subregions, data);
        }));
    }

    const initFilter = () => {
        filterForm.querySelectorAll('.filter-input').forEach(input => {
            const name = input.getAttribute('data-name');
            const type = input.getAttribute('data-type');
            if (edgeValues[name] && edgeValues[name][type])
                input.value = edgeValues[name][type];
        });

        filterForm.addEventListener('submit', async e => {
            e.preventDefault();
            data = {};
            Object.assign(data, dataTemplate);
            
            Array.prototype.slice.call(filterForm.elements).forEach(el => {
                if (!el.classList.contains('filter-input') || el.value === '')
                    return;
                
                for (const prop in dataTemplate) {
                    data[prop] = data[prop].filter(row => {
                        const name = el.getAttribute('data-name');
                        const type = el.getAttribute('data-type');

                        if (type === 'min')
                            return row[name] >= parseFloat(el.value);
                        else if (type === 'max')
                            return row[name] <= parseFloat(el.value);
                        else if (type === 'text')
                            return new RegExp(`.*${el.value}.*`, 'ig').test(row[name]);
                    });
                }
            });

            subregions = subregionsTemplate.filter(subregion => data[subregion.name].length > 0);

            recapSubregions(subregions, data);
            sortData(subregions, data, list.querySelector('.sorted').getAttribute('data-name'), list.querySelector('.sorted').classList.contains('sorted-ascending'));
            render(subregions, data);
        });
    };

    const render = (subregions, data) => {
        Array.prototype.slice.call(list.children).forEach((child, i) => i > 0 && child.remove());

        subregions.forEach(subregion => {
            const item = createItem(subregion, true);
            const sublist = item.querySelector('.item-list');
            data[subregion.name].forEach(row => sublist.append(createItem(row, false)));
    
            list.append(item);
        });
    };

    data = await getDataJSON('https://restcountries.com/v3.1/all');
    data = data.map(c => ({
        name: c.name.official,
        capital: c.capital,
        population: c.population,
        area: c.area ? c.area : 0,
        subregion: (c.subregion === undefined ? c.region : c.subregion)
    }));

    const dataTemplate = parseData(data);
    const subregionsTemplate = parseSubregions(dataTemplate);

    initSorting();
    initFilter();
    sortData(subregionsTemplate, dataTemplate, 'name', true);
    render(subregionsTemplate, dataTemplate);
};