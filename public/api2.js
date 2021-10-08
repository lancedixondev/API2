const key = 'MGRmQiyG3DkATaOmEdsXJE0AZ6Fn6zXH8YjtzlR0';


function fetchresponse(date){
    let baseURL = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + date + '&end_date=' + date + '&api_key=';
    fetch(baseURL + key)
        .then(response => {
            return response.json();
        }).then(json => {
            display(json, date)
            console.log(document.getElementsByClassName('today')[0])
            document.getElementsByClassName("today")[0].innerHTML = json.near_earth_objects[date].length
        })
    
        
}


function display(json, date){ 
    
    for(x = 0; x <= 4; x++){
        let currentAsteroid = "ast" + x 
        document.getElementById(currentAsteroid).innerHTML = ""
        document.getElementById(currentAsteroid).innerHTML += "ID: " + json.near_earth_objects[date][x].id + " "
        document.getElementById(currentAsteroid).innerHTML += "Size(Miles): " + Math.round(json.near_earth_objects[date][x].estimated_diameter.miles.estimated_diameter_max * 1000) / 1000 + " "
        document.getElementById(currentAsteroid).innerHTML += "dangerous: " + json.near_earth_objects[date][x].is_potentially_hazardous_asteroid + " "

        let http = json.near_earth_objects[date][x].links.self;
        let https = http.substring(0,4) + 's' + http.substring(4);

        fetch(https)
        .then(response => {
            return response.json()
        })
        .then(json => {
            let filter = json.close_approach_data.filter(obj => obj.close_approach_date == date)
            let mph = filter[0].relative_velocity.miles_per_hour;
            document.getElementById(currentAsteroid).innerHTML += "MPH" + " " + Math.floor(mph)
        })
        }
}


function submit(){
    fetchresponse(document.getElementById("input").value)
}




