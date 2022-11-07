onload = async () => {
    const getDataJSON = url => {
        return fetch(url).then(res => res.json());
    };

    let data = await getDataJSON('https://restcountries.com/v3.1/all');
    data = data.map(c => ({
        name: c.name,
        capital: c.capital,
        population: c.population,
        area: c.area,
        subregion: (c.subregion === undefined ? c.region : c.subregion)
    }));
    console.log(data);

    const groupedData = {};
    data.forEach(country =>
        groupedData.hasOwnProperty(country.subregion)
        ? groupedData[country.subregion].push(country)
        : groupedData[country.subregion] = [country]
    );
    
    for (const prop in groupedData) {
        console.log(prop);
    }
};