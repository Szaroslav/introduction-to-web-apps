onload = async () => {
    const PAGE_NUMBER = 10;

    const list = document.querySelector('.countries-list');
    const pagination = document.querySelector('.list-pagination');
    const filterForm = document.querySelector('.filter-form');
    const edgeValues = {
        population: {min: Number.MAX_VALUE, max: 0},
        area: {min: Number.MAX_VALUE, max: 0}
    };
    let activeSubregions = {};
    let currentData;
    let sortedColumn = list.querySelector('.list-header .item-name > span');
    let index = 0;

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
        isItem && item.querySelector('.item-content').addEventListener('click', () => {
            item.classList.toggle('active');
            activeSubregions[item.querySelector('.item-name').textContent] = true;
        });
        isItem && item.append(createElement('ul', 'item-list'));
        return item;
    };

    const setEdgeValues = data => {
        data.forEach(country => {
            edgeValues.population.min = Math.min(edgeValues.population.min, country.population);
            edgeValues.population.max = Math.max(edgeValues.population.max, country.population);
            edgeValues.area.min = Math.min(edgeValues.area.min, country.area);
            edgeValues.area.max = Math.max(edgeValues.area.max, country.area);
        });
    };

    const filterData = data => {
        let filteredData = data;
            
        Array.prototype.slice.call(filterForm.elements).forEach(el => {
            if (!el.classList.contains('filter-input') || el.value === '')
                return;
            
            filteredData = filteredData.filter(row => {
                const name = el.getAttribute('data-name');
                const type = el.getAttribute('data-type');

                if (type === 'min')
                    return row[name] >= parseFloat(el.value);
                else if (type === 'max')
                    return row[name] <= parseFloat(el.value);
                else if (type === 'text')
                    return new RegExp(`.*${el.value}.*`, 'ig').test(row[name]);
            });
        });

        index = 0;
        currentData = filteredData;
        activeSubregions = {};

        return filteredData;
    };

    const sortData = (data, sortBy, ascending) => {
        const compareFn = (a, b) => {
            if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') 
                return (a[sortBy] - b[sortBy]) * (ascending ? 1 : -1);
            else if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string')
                return a[sortBy].localeCompare(b[sortBy]) * (ascending ? 1 : -1);
            else
                return 0;
        };
        
        data.sort(compareFn);
    };

    const splitData = (data, n) => {
        const splittedData = [];
        for (let i = 0; i < data.length; i += n)
            splittedData.push(data.slice(i, i + n));

        return splittedData;
    };

    const groupData = data => {
        const groupedData = {};
        data.forEach(row => groupedData[row.subregion] ? groupedData[row.subregion].push(row) : groupedData[row.subregion] = [row]);

        return Object.entries(groupedData)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(a => groupedData[a[0]]);
    };

    const initSorting = () => {
        list.querySelectorAll('.list-header .item-content span').forEach(el => el.addEventListener('click', () => {
            if (el.classList.contains('sorted-ascending')) {
                el.className = 'sorted sorted-descending';
                sortData(currentData, el.getAttribute('data-name'), false);
            }
            else if (el.classList.contains('sorted-descending')) {
                el.className = 'sorted sorted-ascending';
                sortData(currentData, el.getAttribute('data-name'), true);
            }
            else {
                el.className = 'sorted sorted-ascending';
                sortData(currentData, el.getAttribute('data-name'), true);
            }

            sortedColumn && sortedColumn !== el && (sortedColumn.className = '');
            sortedColumn = el;
            
            const parsedData = splitData(groupData(currentData), PAGE_NUMBER);
            render(parsedData, parsedData.length);
        }));
    };

    const updateFilters = data => {
        setEdgeValues(data);

        filterForm.querySelectorAll('.filter-input').forEach(input => {
            const name = input.getAttribute('data-name');
            const type = input.getAttribute('data-type');
            if (edgeValues[name] && edgeValues[name][type] !== undefined)
                input.value = edgeValues[name][type];
        });
    };

    const initFilter = data => {
        updateFilters(data);

        filterForm.addEventListener('submit', async e => {
            e.preventDefault();

            const filteredData = filterData(data);
            updateFilters(filteredData);
            sortData(filteredData, list.querySelector('.sorted').getAttribute('data-name'), list.querySelector('.sorted').classList.contains('sorted-ascending'));
            const parsedData = splitData(groupData(filteredData), PAGE_NUMBER);
            render(parsedData, parsedData.length);
        });
    };

    const renderPagination = (data, i, n) => {
        Array.prototype.slice.call(pagination.children).forEach(child => child.remove());

        for (let j = 0; j < n; j++) {
            const item = createElement('a', 'list-pagination-item' + (j == i ? ' active' : ''), j + 1);
            item.addEventListener('click', () => {
                if (item.classList.contains('active'))
                    return;
                
                index = j;
                render(data, data.length);
            });
            pagination.append(item);
        }
    };

    const render = (data, pageNumber) => {
        renderPagination(data, index, pageNumber);

        Array.prototype.slice.call(list.children).forEach((child, i) => i > 1 && child.remove());
        data[index].forEach(subregion => {
            const item = createItem(subregion, true);
            const sublist = item.querySelector('.item-list');

            let population = 0, area = 0;
            subregion.forEach(row => {
                sublist.append(createItem(row, false));
                population += row.population;
                area += row.area;
            });
            
            activeSubregions[subregion[0].subregion] && item.classList.add('active');
            item.querySelector('.item-name').textContent = subregion[0].subregion;
            item.querySelector('.item-population').textContent = parseNumber(population);
            item.querySelector('.item-area').textContent = parseNumber(area);

            list.append(item);
        });
    };

    let data = await getDataJSON('https://restcountries.com/v3.1/all')
    const dataTemplate = data.map(c => ({
        name: c.name.official,
        capital: c.capital,
        population: c.population,
        area: c.area ? c.area : 0,
        subregion: (c.subregion === undefined ? c.region : c.subregion)
    }));;

    currentData = dataTemplate;
    initSorting(currentData);
    initFilter(currentData);
    sortData(currentData, 'name', true);
    const parsedData = splitData(groupData(currentData), PAGE_NUMBER);
    render(parsedData, parsedData.length);
};