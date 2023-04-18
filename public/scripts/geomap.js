const countries = document.querySelectorAll('.geomap-container path');

countries.forEach(function(country){
    const name = country.getAttribute('name');

    if(name){
        console.log(name);
        if(name.length > 6){
            country.style.fill = '#37b2ffb0';
        }else{
            country.style.fill = '#1c7cb88b';
        }
    }else{
        country.style.fill = '#124b6f8a';
    }
})