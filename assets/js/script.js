
var charEl = document.getElementById("inputCharacter");
var submitEl = document.getElementById("submitBtn");
let movieBtnEl = document.getElementById("movieBtn");
// var key = cryptedKey(secretKey);
secretKey = prompt("Please enter the secret key");


var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(charEl.value);
  
    var character = charEl.value;
    var movieInputEl = $("#inputMovie").val();
    console.log(movieInputEl);
    if (character) {
        getCharacter(character);
    } else if (movieInputEl){
      window.location.assign('./index2.html?repo=' + movieInputEl + "?key=" + secretKey);
    }
    else{
      alert('Please enter a character');
    }
  };

function getCharacter(charEl){
    var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + charEl + "&ts=1"  + "&apikey=" + key + "&hash=e2a858abc628bf93fb6ac66501d70db5" ;
    let charInfo = $(".char-info");
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    }).then(function(data){
      console.log(data);
      //Getting the character name
      let charName = data.data.results[0].name;
      //Getting the character description
      let charDesc = data.data.results[0].description;
      //Getting the image path from results
      let charImage = data.data.results[0].thumbnail.path;
      //Getting the image extension from results
      let charImageExt = data.data.results[0].thumbnail.extension;
      //Constructing the image path
      let image = charImage + "/portrait_medium." + charImageExt
       //setting the character name, description and image
       $("#charName").text(charName);
       $("#charDesc").text(charDesc);
       $(".char-image").attr("src",image);
        let x = data.data.results[0].urls;
        $.each(x,function (i, item){
          $("<li/>").html($("<a>").attr("href",item.url).text(charName + " " + item.type)).appendTo(charInfo);
        });
      
    })
}
submitEl.addEventListener("click", formSubmitHandler);

var key = function cryptedKey(secretKey){
  var bytes = CryptoJS.AES.decrypt("U2FsdGVkX1+e5165l/K6go5vrvAMZlD+BURW1Nj4RUlmkl8sNkj4IiODCzBkJlniNHUdQNjfyVfBCPeyh/isAQ==", secretKey.toString());
  plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}


movieBtnEl.addEventListener("click", formSubmitHandler);
