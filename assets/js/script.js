
var charEl = document.getElementById("inputCharacter");
var submitEl = document.getElementById("submitBtn");

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(charEl.value);
  
    var character = charEl.value;
    if (character) {
        getCharacter(character);
    } else {
      alert('Please enter a character');
    }
  };

function getCharacter(charEl){
    const APIKey = 'b126ac6e701a5ae949732959194b1db6';
    // const timeStamp = Date.now();
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + charEl + "&ts=1"  + "&apikey=" + APIKey + "&hash=e2a858abc628bf93fb6ac66501d70db5" ;

    fetch(requestUrl)
    .then(function(response) {
        console.log(response);
        return response;
    })
}
submitEl.addEventListener("click", getCharacter);
