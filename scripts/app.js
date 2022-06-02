const cityForm = document.querySelector('form');
const details = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');



cityForm.addEventListener('submit', e =>{
    e.preventDefault(); //preveny default action

    const city = cityForm.city.value.trim(); //taking value from input
    cityForm.reset();

    // updating city using fucntion and form input 
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});

// updating city information function
const updateCity = async(city) =>{
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    return { //we use it to return city deatils and weather details together in object
        cityDets : cityDets,
        weather : weather
    }
};
// update UI function
const updateUI =(data)=> {
    const {cityDets, weather} = data; //destructuring data object into cityDets and weather (they have same property name)
    console.log(cityDets)
    console.log(weather)
   details.innerHTML = `
    <div class="text-muted text-center text-uppercase details"> <!--This div used for weather deatils-->
                <h5 class="my-3">${cityDets.LocalizedName}</h5> <!--city name-->
                <div class="my-3">${weather.WeatherText}</div> <!-- weather condition-->
                <div class="display-4 my-4"> <!-- shwoing degree and temp meaurement type-->
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
            </div>`
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };

    let timeSrc = null;
    weather.IsDayTime ? timeSrc = './src/day.svg': timeSrc = './src/night.svg';;
    time.setAttribute('src', timeSrc);

    const weatherIconNumber = weather.WeatherIcon;
    icon.setAttribute('src',`./src/icons/${weatherIconNumber}.svg`);
};
