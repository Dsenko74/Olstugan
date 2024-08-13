// Підключення функціоналу "Чертоги Фрілансера"
//import { name } from "file-loader";
import { createElement } from "react";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
import { Loader } from "@googlemaps/js-api-loader";

let city = "Göteborg";
let currentPub = null;
let markers = {};
const barsContainer = document.getElementById('bars-container');
const cityData = {
  "Göteborg": {
    coordinates: { lat: 57.71921336256073, lng: 11.928407077968197},
    bars: [
      {bar: "Ölstugan_Tullen_Johanneberg", lat: 57.72921336256073, lng: 11.928407077968197, image: "img/lunch/1.jpg", location: "Friggagatan 27, 416 64 Göteborg, Sweden", phone: "+46 76 313 05 96", calendar: "15:00 – 00:00"},
      {bar: "Ölstugan_Tullen_Andra_Lång", lat: 57.73821336256073, lng: 11.938407077968197, image: "img/lunch/2.jpg", location: "Herkulesgatan 3A, 417 01 Göteborg, Sweden", phone: "+46 31 16 56 16", calendar: "16:00 – 01:00"},
      {bar: "Ölstugan_Tullen_Majorna", lat: 57.74621336256073, lng: 11.928407077968197, image: "img/lunch/3.jpg", location: "Ölstugan Tullen Gamlestaden", phone: "+46 76 313 85 96", calendar: "17:00 – 01:00"},
      {bar: "Ölstugan_Tullen_Lejonet", lat: 57.71521336256073, lng: 11.918407077968197, image: "img/lunch/1.jpg", location: "Friggagatan 27, 416 64 Göteborg, Sweden", phone: "+46 76 313 05 96", calendar: "15:00 – 00:00"},
      {bar: "Ölstugan_Tullen_Kville", lat: 57.71421336256073, lng: 11.928407077968197, image: "img/lunch/2.jpg", location: "Ölstugan Tullen Gamlestaden", phone: "+46 76 313 85 96", calendar: "17:00 – 01:00"},
    ]
  },
  "Stockholm": {
    coordinates: { lat: 59.32456559685972, lng: 18.058270146732614},
    bars: [
      {bar: "Stockholm_Tullen_Johanneberg", lat: 59.32866559685971, lng: 18.058270146732614, image: "img/lunch/1.jpg", location: "Friggagatan 27, 416 64 Stockholm, Sweden", phone: "+46 76 313 05 96", calendar: "15:00 – 00:00"},
      {bar: "Stockholm_Tullen_Andra_Lång", lat: 59.32766559685971, lng: 18.02270146732614, image: "img/lunch/2.jpg", location: "Herkulesgatan 3A, 417 01 Stockholm, Sweden", phone: "+46 31 16 56 16", calendar: "16:00 – 01:00"},
      {bar: "Stockholm_Tullen_Majorna", lat: 59.36666559685971, lng: 18.058270146732614, image: "img/lunch/3.jpg", location: "Ölstugan Tullen Gamlestaden", phone: "+46 76 313 85 96", calendar: "17:00 – 01:00"},
      {bar: "Stockholm_Tullen_Lejonet", lat: 59.39566559685971, lng: 18.078270146732614, image: "img/lunch/1.jpg", location: "Friggagatan 27, 416 64 Stockholm, Sweden", phone: "+46 76 313 05 96", calendar: "15:00 – 00:00"},
      {bar: "Stockholm_Tullen_Kville", lat: 59.31466559685971, lng: 18.078270146732614, image: "img/lunch/2.jpg", location: "Ölstugan Tullen Gamlestaden", phone: "+46 76 313 85 96", calendar: "17:00 – 01:00"},
    ]
  },
  "Norrköping": {
    coordinates: { lat: 58.59504694714969, lng: 16.18459565436626},
    bars: [
      {bar: "Norrköping_Tullen_Johanneberg", lat: 58.59504694714969, lng: 16.18459565436626, image: "img/lunch/1.jpg", location: "Friggagatan 27, 416 64 Norrköping, Sweden", phone: "+46 76 313 48 96", calendar: "15:00 – 00:00"},
      {bar: "Norrköping_Tullen_Andra_Lång", lat: 58.60504694714969, lng: 16.18459565436626, image: "img/lunch/2.jpg", location: "Herkulesgatan 3A, 417 01 Norrköping, Sweden", phone: "+46 98 16 56 36", calendar: "16:00 – 01:00"},
    ]
  }
};
const handleCityClick = city => {
  if (city) { barsContainer.innerHTML = `<>`;
    let barInfo = cityData[city].bars;
    let barsList = barInfo.map(bar => `<li class="pubs__bar" data-pub=${bar.bar}>${bar.bar}</li>`).join('');
    barsContainer.innerHTML = `<ul class= "pubs__menu">${barsList}</ul>`;
  } else {
    barsContainer.innerHTML = `<p> </p>`;
  }
};

const toggleMarkerAndHighlight = (markerView, property)  => {
  const markerElement = markerView.content.querySelector(".pubs__marker");
  const itemElement = markerView.content.querySelector(".pubs__item");

  // Toggle display of marker and item elements
  if (markerElement.style.display === "none") {
    markerElement.style.display = "block";
    itemElement.style.display = "none";
  } else {
    markerElement.style.display = "none";
    itemElement.style.display = "block";
  }

  // Close current marker if it exists
  if (currentPub && currentPub !== property) {
    const currentMarker = markers[currentPub].content.querySelector(".pubs__marker");
    const currentItem = markers[currentPub].content.querySelector(".pubs__item");
    currentMarker.style.display = "block";
    currentItem.style.display = "none";
  }

  // Toggle currentPub value
  if (currentPub === property) {
    currentPub = null;
  } else {
    currentPub = property;
  }
}

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
  key: "AIzaSyACU8mhn7YHX-VVjkJY98LEjWlHqtylUMk",
  v: "weekly",
  // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
  // Add other bootstrap parameters as needed, using camel case.
});

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );
  const map = new Map(document.getElementById("map"), {
    center: { lat: cityData[city].coordinates.lat, lng: cityData[city].coordinates.lng },
    zoom: 12,
    mapId: "4504f8b37365c3d0",
  });

  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();
 
  // Create the markers.
  // A marker with a with a URL pointing to a PNG.

  cityData[city].bars.forEach((bar, i) => {
        // set standart marker
    // const pin = new PinElement({
    //   glyph: `${i + 1}`,
    //   scale: 1.5,
    //   background: "#FBBC04",
    //   glyphColor: "green",
      
    // });

    const marker = new AdvancedMarkerElement({
      position: { lat: bar.lat, lng: bar.lng },
      map,
      title: "якась хуйня",
      //content: pin.element,
      content: buildContent(bar),
      gmpClickable: true,
    });

    marker.addListener("click", () => {
      toggleMarkerAndHighlight(marker, bar.bar);
    });
      markers[bar.bar] = marker;
    });
    
  function buildContent (property) {
  const content = document.createElement("div");

  content.classList.add("property", "highlight");

  content.innerHTML = `
              <div class="pubs__marker">
              	<img src="img/pubs/location.svg" alt="image">
              </div>

          		<div class="pubs__item item--pubs" data-bar=${property.bar}>
								<div class="item--pubs__image">
									<img src=${property.image} alt="image">
								</div>
								<h3 class="item--pubs__title">
									${property.bar}
								</h3>
								<div class="item--pubs__info">
									<div class="item--pubs__location">
										<img src="img/lunch/location.svg" alt="location">
										${property.location}</div>
									<a href="tel:+46763087810" class="item--pubs__tel">
										<img src="img/lunch/tel.svg" alt="phone"> 
										${property.phone}</a>
									<div class="item--pubs__calendar">
										<img src="img/lunch/calendar.svg" alt="calendar">
										${property.calendar}</div>
								</div>

								<button class="item--pubs__arrow">
									<img src="img/lunch/arrow_forward.svg" alt="arrow">
								</button>
							</div>
    `;
  return content;
  }
}
handleCityClick(city);

initMap();

document.querySelector('.pubs__location').addEventListener('click', function (e) {
  if(e.target.closest('.select__option')) {
    city = e.target.dataset.value;
    const barsContainer = document.getElementById('bars-container');
    initMap();
    handleCityClick(city);
  }
});
document.querySelector('.pubs__bars').addEventListener('click', function (e) {
  if(e.target.closest('.pubs__bar')) {
    const pub = e.target.dataset.pub;
    toggleMarkerAndHighlight(markers[pub], pub);
  }
});
//========================================================================================================================================================
// пагінація section instagram
const instaItems = document.querySelector('.instagram__items');
let data;
let startItem = 0;
let endItem = 4;
  if (instaItems) {
    loadInstaItems();
  }

  async function loadInstaItems (){
    const response = await fetch("files/insta.json", {
      method: "GET",
    });
    if (response.ok){
      const responseResult = await response.json();
      data = responseResult;
      initInsta(responseResult, startItem, endItem);
    } else{
      alert("Error");
    }
  }

const initInsta = (data, countstartItem, endItemer) => {
  const dataPart = data.items.slice(startItem, endItem);
  dataPart.forEach(item => {
    buildInsta(item);
  });
  viewMore();
}

const buildInsta = item => {
  let instaItemTemplate = ``;
  instaItemTemplate +=`<div data-id='${item.id}' class="instagram__item item--instagram">`;
  item.image ? instaItemTemplate += 
    `<div class="item--instagram__image">
      <img src="${item.image}" alt="pub">
    </div>
    `
  : null;
  instaItemTemplate += `</div>`;

  instaItems.insertAdjacentHTML("beforeend", instaItemTemplate);
}

document.addEventListener('click', documentActions);

const viewMore= () => {
  const dataItemLength = data.items.length;
  const currentItems = document.querySelectorAll('.instagram__item').length;
  const viewMore = document.querySelector('.instagram__button');
  currentItems < dataItemLength ? viewMore.style.display = "flex" : viewMore.style.display = "none";
}

function documentActions(e){
  const targetElement = e.target;
  if (targetElement.closest('.instagram__button')) {
    e.preventDefault();
    startItem = document.querySelectorAll('.instagram__item').length;
    endItem = endItem + 4;
    initInsta(data, startItem, endItem);
  }
}

//========================================================================================================================================================

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const placeholderAfter = document.getElementById('placeholder-after');
  const placeholderText = input.getAttribute('placeholder');
  
  function updatePlaceholder() {
      const inputValue = input.value;
      if (inputValue === '') {
          let lastChar = placeholderText.slice(-1);
          let beforeLastChar = placeholderText.slice(0, -1);
          placeholderAfter.setAttribute('data-after', lastChar);
          placeholderAfter.textContent = beforeLastChar;
          placeholderAfter.style.visibility = 'visible';
          //console.log(placeholderAfter.textContent);
          //input.setAttribute('placeholder', '');
          //input.style.visibility = 'hidden';
      } else {
          placeholderAfter.style.visibility = 'hidden';
      }
  }

  input.addEventListener('input', updatePlaceholder);
  updatePlaceholder();
});




