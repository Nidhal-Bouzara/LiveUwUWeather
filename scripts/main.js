const suggestionsList = document.querySelector('.app-suggestions ul');
const appSuggestions = document.querySelector('.app-suggestions')
const searchBox = document.querySelector('.app-search');
const displayCard = document.querySelector('.app-card');
const apikey = 'arHapOvYGT9zakNKqeGWjaOCSbcqCL3f';
const suggestFunction = (dataN) => {
  suggestionsList.addEventListener('click', (e) => {
    // removing the suggestions and co
    searchBox.classList.remove('app-startup__position');
    appSuggestions.classList.remove('app-suggestions--startup__position');
    suggestionsList.parentElement.style.display = 'none';
    searchBox.classList.remove('app-search--applied');
    form.reset();
    const itemArray = Array.from(e.target.parentElement.children);
    // a filter function to find out the order of the clicked <li>
    // the indexOf the <li> is then used to find out the location key to send with the fetch api request
    itemArray.filter((item) => {
      if (item === e.target) {
        // calling the function that calls the api and gets the data
        getWeather(dataN[itemArray.indexOf(item)].Key, apikey)
          .then(data => {
            // setting the source of the main card image
            let imgsrc;
            if (data[0].IsDayTime) {
              imgsrc = "img/day.svg";
            } else {
              imgsrc = "img/night.svg";
            }
            // changing the HTML of the card
            displayCard.innerHTML =
              `<div class="app-card">
                <img src=${imgsrc} alt="placeholder image">
                <div class="app-card__symbol">
                  <img src="/img/icons/${data[0].WeatherIcon}.svg" alt="icon of weather">
                </div>
                <h1 class="app-card__cityname">${dataN[itemArray.indexOf(item)].LocalizedName}</h1>
                <p class="app-card__weather">${data[0].WeatherText}</p>
                <p class="app-card__temperature">${data[0].Temperature.Metric.Value} °C</p>
              </div>`
          }).then(() => {suggestionsList.innerHTML = ''})
        return true;
      } else {
        return false;
      }})})}
// first function that gets called
const getSuggestions = async e => {
  // console.log(form.search.value);
  e.preventDefault();
  autocomplete(form.search.value, apikey)
    .then(data => {
      if (data.length) {
        let max;
        if (data.length < 5) {
          max = data.length;
        } else { max = 5; }
        for (var i = 0; i < max; i++) {
          suggestionsList.innerHTML += `<li>${data[i].LocalizedName}</li>`
        }
        return data;
      }
    }).then((data) => {
      suggestionsList.parentElement.style.display = 'block';
      searchBox.classList.add('app-search--applied');
      suggestFunction(data);
    })
      .catch(err => console.log(err));
}

const clrsc = async () => {
  suggestionsList.innerHTML = '';
  suggestionsList.style.height = '155px';
}
// all starts here :)
const form = document.querySelector('.app-search__form');
form.addEventListener('keyup', e => {
  clrsc().then(() => getSuggestions(e))
});
