const key = 'ITp1MPmHPs5iOIldvAK7RV5YyW6tEhsq';


// getting weather information
const getWeather  = async cityId => {            //it uses city id from getCity function 
const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
const query = `${cityId}?apikey=${key}`;

const response = await fetch(base + query);
const data = await response.json();
return data[0]
};

// getting city information
const getCity = async city =>{
    const base ='http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query); //waiting for promise
    const data = await response.json(); //waiting for response
    return data[0];  
}
