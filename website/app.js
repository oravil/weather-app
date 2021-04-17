/* Global Variables */
const baseUrl = '//api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=9e8efc5b34d1da40d9f12ac93ce1263a';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '-' + d.getDate() + '-' + d.getFullYear();
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEvent);
/* Function called by event listener */
function generateEvent(e) {
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    const inputs = { date: newDate, feeling: feel };
    getWeatherData(baseUrl, zipCode, apiKey, inputs).then(async () => {
        await updateUi();
    })
}

/* Function to GET Web API Data & post data */
const getWeatherData = async (url, zip, api, inputs) => {
    await fetch(url + zip + api).then(async res => {
        const data = await res.json()
        postProjectData(data, inputs);
    }).catch(err => {
        console.log('Error, => ' + error)
    })
}
/* Function to POST data */
const postProjectData = async (data, inputs) => {
    await fetch('/weather', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            date:inputs.date,
            temp:data.main.temp,
            content:inputs.feeling,
        })
    })
}

/* Function to GET Project Data */
const updateUi = async () => {
    await fetch('/all').then(async res => {
        const all = await res.json();
        document.getElementById('date').innerHTML = `Date : ${all.date}`;
        document.getElementById('temp').innerHTML = `Temp : ${all.temp}`;
        document.getElementById('content').innerHTML = `Feelings : ${all.feeling}`;
    })
}