const  body = document.querySelector(".body");
const input =document.querySelector(".input");
const searchBtn = document.querySelector(".searchBtn");
const  footer = document.querySelector(".footer");



function setUrl(inputValue){
       const apiKey = "39bc3b8ec527dbe3b2ad1d615e2e4c64";
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}`;
     fetchData(url);
       
}

async function fetchData(url){
     const response = await fetch(url);
     const data = await response.json();
     if(data !=="400"){
          console.log("Something went wrong");
          showData(data);
     }
     else{
          console.log(data);
          showData(data);
     }
     
}
let  weatherImage
async function showData(data){
     input.value ="";
     body.innerHTML ="";
     footer.innerHTML = "";

     
     // Adding weather image 
    
     weatherImage= document.createElement("img");
     weatherImage.classList.add("weather_img");
     body.appendChild(weatherImage); 

     if(data.cod =="404"){
          const notFound =document.createElement("h2");
          notFound.classList.add("not-found");
          notFound.innerHTML="Not Found Please try again";
          body.insertBefore(notFound,weatherImage);
          weatherImage.src = "images/error_404.png";
          
     }
     else{

          
          
          const weather =data.weather[0];
          const dis = weather.main;
          swichCase(dis);
         

// adding temperature element
     const temperature = document.createElement("p");
     temperature.classList.add("temp");
     temp = Math.round(data.main.temp-273)
     temperature.innerHTML =`${temp}<sup>°C</sup>`;
     body.appendChild(temperature);

//     adding p for discription 
     const discription = document.createElement("p");
     discription.classList.add("discription");
     discription.innerHTML =`${weather.description}`;
     console.log(discription.innerHTML)
     body.appendChild(discription);

     

     const  humdityBox = document.createElement("div");
     humdityBox.classList.add("humdiy_box");
     humdityBox.innerHTML =`<span class="humdity">${data.main.humidity}%</span>
     <p>humdity</p>`

     footer.appendChild(humdityBox);

     const  windBox = document.createElement("div");
     windBox.classList.add("wind_box");
     windBox.innerHTML =`<span class="wind">${data.wind.speed}%</span>
     <p>Wind Speed</p>`

     footer.appendChild(windBox);
     }
     
     

     
}


 function swichCase(dis){
     switch(dis)
     {
          
          case dis.value ="Clouds":
               weatherImage.src ="images/cloud.png";
          break;

          case dis.value ="Clear":
               weatherImage.src ="images/clear.png";
          break;
          case dis.value ="Rain":
               weatherImage.src ="images/rain.png";
          break;
          case dis.value ="Snow":
               weatherImage.src ="images/snow.png";
          break;

     }
}


input.addEventListener("keypress",(e)=>{
   
   if (e.key ==="Enter") {
     setUrl(input.value);
     
     // input.click();
   }

  
})
searchBtn.addEventListener("click", ()=>{
     setUrl(input.value);
     
})