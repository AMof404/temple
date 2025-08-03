// Global variables
let map;
let markers = [];
let temples = [];
let currentYear = 1836;
let isPlaying = false;
let playInterval;
let showUndedicated = false;

// Embedded temple data
const templeData = [
  
  {
    "name": "Aba Nigeria Temple",
    "lat": 5.1477438,
    "lng": 7.3566278,
    "year": 2005,
    "country": "Nigeria"
  },
  {
    "name": "Kirtland Temple",
    "lat": 41.6283,
    "lng": -81.3614,
    "year": 1836,
    "country": "United States",
    
  },
  {
    "name": "Nauvoo Temple",
    "lat": 40.5503,
    "lng": -91.3804,
    "year": 1846,
    "country": "United States",
    
  },
  {
    "name": "Abidjan Ivory Coast Temple",
    "lat": "5.3623",
    "lng": "3.9768",
    "year": 2025,
    "country": "Côte d'Ivoire"
  },
  {
    "name": "Abuja Nigeria Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "Accra Ghana Temple",
    "lat": 5.5674454,
    "lng": -0.1937317,
    "year": 2004,
    "country": "Ghana"
  },
  {
    "name": "Adelaide Australia Temple",
    "lat": -34.8925054,
    "lng": 138.6350847,
    "year": 2000,
    "country": "Australia"
  },
  {
    "name": "Alabang Philippines Temple",
    "lat": 14.4128734,
    "lng": 121.0384242,
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Albuquerque New Mexico Temple",
    "lat": "35.1676768",
    "lng": "-106.5260634",
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Anchorage Alaska Temple",
    "lat": 61.1016582,
    "lng": -149.8403673,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Antananarivo Madagascar Temple",
    "lat": 18.8539,
    "lng": 47.4785,
    "year": null,
    "country": "Madagascar"
  },
  {
    "name": "Antofagasta Chile Temple",
    "lat": -23.5718,
    "lng": -70.3945,
    "year": 2025,
    "country": "Chile"
  },
  {
    "name": "Apia Samoa Temple",
    "lat": -13.83806,
    "lng": -171.78306,
    "year": 1983,
    "country": "Samoa"
  },
  {
    "name": "Arequipa Peru Temple",
    "lat": -16.3752336,
    "lng": -71.5384063,
    "year": 2019,
    "country": "Peru"
  },
  {
    "name": "Asunción Paraguay Temple",
    "lat": -25.28792,
    "lng": -57.60287,
    "year": 2002,
    "country": "Paraguay"
  },
  {
    "name": "Atlanta Georgia Temple",
    "lat": 33.9317325,
    "lng": -84.3624468,
    "year": 1983,
    "country": "United States"
  },
  {
    "name": "Auckland New Zealand Temple",
    "lat": -36.9932107,
    "lng": 174.8902024,
    "year": 2025,
    "country": "New Zealand"
  },
  {
    "name": "Austin Texas Temple",
    "lat": 31.0781568,
    "lng": -97.4007815,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Bacolod Philippines Temple",
    "lat": 10.696810625522579,
    "lng": 122.9894129760167,
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Bahía Blanca Argentina Temple",
    "lat": -38.6912466,
    "lng": -62.2359717,
    "year": null,
    "country": "Argentina"
  },
  {
    "name": "Bakersfield California Temple",
    "lat": 35.35498442985919,
    "lng": -119.13774064463784,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Bangkok Thailand Temple",
    "lat": 13.7495165,
    "lng": 100.5625004,
    "year": 2023,
    "country": "Thailand"
  },
  {
    "name": "Barcelona Spain Temple",
    "lat": "41.48746553",
    "lng": "2.06931235",
    "year": null,
    "country": "Spain"
  },
  {
    "name": "Barranquilla Colombia Temple",
    "lat": "11.017192973484615",
    "lng": "-74.8617454416917",
    "year": 2018,
    "country": "Colombia"
  },
  {
    "name": "Baton Rouge Louisiana Temple",
    "lat": 30.3627265,
    "lng": -91.1084058,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Beira Mozambique Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mozambique"
  },
  {
    "name": "Belém Brazil Temple",
    "lat": -1.3868281,
    "lng": -48.4600087,
    "year": 2022,
    "country": "Brazil"
  },
  {
    "name": "Belo Horizonte Brazil Temple",
    "lat": "19.9240",
    "lng": "43.9455",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Bengaluru India Temple",
    "lat": "12.9922",
    "lng": "77.7047",
    "year": null,
    "country": "India"
  },
  {
    "name": "Benin City Nigeria Temple",
    "lat": "6.3392",
    "lng": "5.6174",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "Bentonville Arkansas Temple",
    "lat": 36.3847924,
    "lng": -94.1827424,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Bern Switzerland Temple",
    "lat": "47.0022",
    "lng": "7.4582",
    "year": 1955,
    "country": "Switzerland"
  },
  {
    "name": "Billings Montana Temple",
    "lat": 45.8004396,
    "lng": -108.6393792,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Birmingham Alabama Temple",
    "lat": 33.6743249,
    "lng": -86.8212603,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Birmingham England Temple",
    "lat": 52.4781854,
    "lng": -1.9002424,
    "year": null,
    "country": "United Kingdom"
  },
  {
    "name": "Bismarck North Dakota Temple",
    "lat": 46.838908,
    "lng": -100.8139433,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Bogotá Colombia Temple",
    "lat": 4.7077809,
    "lng": -74.0562246,
    "year": 1999,
    "country": "Colombia"
  },
  {
    "name": "Boise Idaho Temple",
    "lat": 43.593554,
    "lng": -116.2753101,
    "year": 1984,
    "country": "United States"
  },
  {
    "name": "Boston Massachusetts Temple",
    "lat": 42.4119882,
    "lng": -71.1881078,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Bountiful Utah Temple",
    "lat": 40.8829523,
    "lng": -111.8467721,
    "year": 1995,
    "country": "United States"
  },
  {
    "name": "Brasília Brazil Temple",
    "lat": "-15.7480",
    "lng": "-47.8809",
    "year": 2023,
    "country": "Brazil"
  },
  {
    "name": "Brazzaville Republic of the Congo Temple",
    "lat": "4.2828",
    "lng": "15.2585",
    "year": null,
    "country": "Republic of the Congo"
  },
  {
    "name": "Brigham City Utah Temple",
    "lat": 41.5054407,
    "lng": -112.0166182,
    "year": 2012,
    "country": "United States"
  },
  {
    "name": "Brisbane Australia South Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Australia"
  },
  {
    "name": "Brisbane Australia Temple",
    "lat": -27.4809085,
    "lng": 153.0337429,
    "year": 2003,
    "country": "Australia"
  },
  {
    "name": "Brussels Belgium Temple",
    "lat": "50.8417",
    "lng": "4.3671",
    "year": null,
    "country": "Belgium"
  },
  {
    "name": "Budapest Hungary Temple",
    "lat": "47.5702",
    "lng": "19.0063",
    "year": null,
    "country": "Hungary"
  },
  {
    "name": "Buenos Aires Argentina Temple",
    "lat": -34.7290603,
    "lng": -58.5186496,
    "year": 1986,
    "country": "Argentina"
  },
  {
    "name": "Buenos Aires City Center Argentina Temple",
    "lat": "-34.5991",
    "lng": "-58.3731",
    "year": null,
    "country": "Argentina"
  },
  {
    "name": "Burley Idaho Temple",
    "lat": "42.525",
    "lng": "-113.746",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Busan Korea Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "South Korea"
  },
  {
    "name": "Cagayan de Oro Philippines Temple",
    "lat": "8.477",
    "lng": "124.643",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Calabar Nigeria Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "Caldwell Idaho Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Calgary Alberta Temple",
    "lat": 51.1406304,
    "lng": -114.2333777,
    "year": 2012,
    "country": "Canada"
  },
  {
    "name": "Cali Colombia Temple",
    "lat": "3.437",
    "lng": "-76.535",
    "year": null,
    "country": "Colombia"
  },
  {
    "name": "Campinas Brazil Temple",
    "lat": -22.8965198,
    "lng": -47.0011252,
    "year": 2002,
    "country": "Brazil"
  },
  {
    "name": "Campo Grande Brazil Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Cancún Mexico Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Cape Coast Ghana Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Ghana"
  },
  {
    "name": "Cape Town South Africa Temple",
    "lat": "-33.9340",
    "lng": "18.4210",
    "year": null,
    "country": "South Africa"
  },
  {
    "name": "Caracas Venezuela Temple",
    "lat": "10.470849",
    "lng": "-66.837293",
    "year": 2000,
    "country": "Venezuela"
  },
  {
    "name": "Cardston Alberta Temple",
    "lat": 49.1982506,
    "lng": -113.3092948,
    "year": 1923,
    "country": "Canada"
  },
  {
    "name": "Casper Wyoming Temple",
    "lat": 42.8090848,
    "lng": -106.361984,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Cebu City Philippines Temple",
    "lat": 10.3275274,
    "lng": 123.8982126,
    "year": 2010,
    "country": "Philippines"
  },
  {
    "name": "Cedar City Utah Temple",
    "lat": 37.6716888,
    "lng": -113.0962786,
    "year": 2017,
    "country": "United States"
  },
  {
    "name": "Charlotte North Carolina Temple",
    "lat": "35.0195",
    "lng": "-80.7428",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Chicago Illinois Temple",
    "lat": 42.0868494,
    "lng": -87.8595027,
    "year": 1985,
    "country": "United States"
  },
  {
    "name": "Chiclayo Peru Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Chihuahua Mexico Temple",
    "lat": 30.3052322,
    "lng": -108.0820315,
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Chorrillos Peru Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Cincinnati Ohio Temple",
    "lat": "39.32725",
    "lng": "-84.31688",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Ciudad Juárez Mexico Temple",
    "lat": 31.7360938,
    "lng": -106.4633302,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Cleveland Ohio Temple",
    "lat": "41.3866",
    "lng": "-81.6395",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Cobán Guatemala Temple",
    "lat": 15.4589242,
    "lng": -90.3648766,
    "year": 2024,
    "country": "Guatemala"
  },
  {
    "name": "Cochabamba Bolivia Temple",
    "lat": -17.3636311,
    "lng": -66.1475801,
    "year": 2000,
    "country": "Bolivia"
  },
  {
    "name": "Cody Wyoming Temple",
    "lat": "44.5114",
    "lng": "-109.0819",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Coeur d'Alene Idaho Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Colonia Juárez Chihuahua Mexico Temple",
    "lat": 30.3052322,
    "lng": -108.0820315,
    "year": 1999,
    "country": "Mexico"
  },
  {
    "name": "Colorado Springs Colorado Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Columbia River Washington Temple",
    "lat": 46.2267489,
    "lng": -119.2748696,
    "year": 2001,
    "country": "United States"
  },
  {
    "name": "Columbia South Carolina Temple",
    "lat": 33.9596601,
    "lng": -80.8939164,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Columbus Ohio Temple",
    "lat": 39.9940412,
    "lng": -83.1132323,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Concepción Chile Temple",
    "lat": -36.851401,
    "lng": -73.0504441,
    "year": 2018,
    "country": "Chile"
  },
  {
    "name": "Copenhagen Denmark Temple",
    "lat": 55.6927252,
    "lng": 12.533942,
    "year": 2004,
    "country": "Denmark"
  },
  {
    "name": "Córdoba Argentina Temple",
    "lat": -31.3586923,
    "lng": -64.2459576,
    "year": 2015,
    "country": "Argentina"
  },
  {
    "name": "Cuernavaca Mexico Temple",
    "lat": "39.0178",
    "lng": "-104.7848",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Culiacán Mexico Temple",
    "lat": "24.7919",
    "lng": "-107.4419",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Curitiba Brazil Temple",
    "lat": -25.441352,
    "lng": -49.3421351,
    "year": 2008,
    "country": "Brazil"
  },
  {
    "name": "Cusco Peru Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Dallas Texas Temple",
    "lat": 32.9144674,
    "lng": -96.7965372,
    "year": 1984,
    "country": "United States"
  },
  {
    "name": "Davao Philippines Temple",
    "lat": "-13.5161",
    "lng": "-71.9852",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Denver Colorado Temple",
    "lat": 39.5686583,
    "lng": -104.965752,
    "year": 1986,
    "country": "United States"
  },
  {
    "name": "Des Moines Iowa Temple",
    "lat": "41.6773",
    "lng": "-93.7355",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Deseret Peak Utah Temple",
    "lat": 40.5726614,
    "lng": -112.3139956,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Detroit Michigan Temple",
    "lat": 42.5662106,
    "lng": -83.2300411,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Draper Utah Temple",
    "lat": 40.4957063,
    "lng": -111.8407098,
    "year": 2009,
    "country": "United States"
  },
  {
    "name": "Dubai United Arab Emirates Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United Arab Emirates"
  },
  {
    "name": "Dublin Ireland Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Ireland"
  },
  {
    "name": "Durban South Africa Temple",
    "lat": "-29.7264",
    "lng": "31.0909",
    "year": 2020,
    "country": "South Africa"
  },
  {
    "name": "Edinburgh Scotland Temple",
    "lat": 55.7951552,
    "lng": -3.0683107,
    "year": null,
    "country": "United Kingdom"
  },
  {
    "name": "Edmonton Alberta Temple",
    "lat": 53.489568,
    "lng": -113.5704525,
    "year": 1999,
    "country": "Canada"
  },
  {
    "name": "Eket Nigeria Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "El Paso Texas Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Elko Nevada Temple",
    "lat": 40.8524364,
    "lng": -115.750012,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Ephraim Utah Temple",
    "lat": "39.3636",
    "lng": "-111.5767",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Fairbanks Alaska Temple",
    "lat": "64.8375",
    "lng": "-147.6960",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Fairview Texas Temple",
    "lat": "33.13000",
    "lng": "-96.62778",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Farmington New Mexico Temple",
    "lat": "36.7698",
    "lng": "-108.1649",
    "year": 2025,
    "country": "United States"
  },
  {
    "name": "Feather River California Temple",
    "lat": 39.1461166,
    "lng": -121.6400024,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Flagstaff Arizona Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Florianopolis Brazil Temple",
    "lat": "-27.5935",
    "lng": "-48.5585",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Fort Collins Colorado Temple",
    "lat": 40.4940752,
    "lng": -105.037975,
    "year": 2016,
    "country": "United States"
  },
  {
    "name": "Fort Lauderdale Florida Temple",
    "lat": 26.0705367,
    "lng": -80.3559118,
    "year": 2014,
    "country": "United States"
  },
  {
    "name": "Fort Worth Texas Temple",
    "lat": 32.5170824,
    "lng": -97.3570561,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Fortaleza Brazil Temple",
    "lat": -3.7477845,
    "lng": -38.4610596,
    "year": 2019,
    "country": "Brazil"
  },
  {
    "name": "Frankfurt Germany Temple",
    "lat": 50.2582575,
    "lng": 8.6412814,
    "year": 1987,
    "country": "Germany"
  },
  {
    "name": "Freetown Sierra Leone Temple",
    "lat": "8.3876",
    "lng": "-13.1388",
    "year": null,
    "country": "Sierra Leone"
  },
  {
    "name": "Freiberg Germany Temple",
    "lat": 50.9222898,
    "lng": 13.322563,
    "year": 1985,
    "country": "Germany"
  },
  {
    "name": "Fresno California Temple",
    "lat": 36.8281806,
    "lng": -119.8528395,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Fukuoka Japan Temple",
    "lat": 33.5725985,
    "lng": 130.3916912,
    "year": 2000,
    "country": "Japan"
  },
  {
    "name": "Gilbert Arizona Temple",
    "lat": 33.291268,
    "lng": -111.7374503,
    "year": 2014,
    "country": "United States"
  },
  {
    "name": "Goiânia Brazil Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Grand Junction Colorado Temple",
    "lat": 39.1012901,
    "lng": -108.551268,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Grand Rapids Michigan Temple",
    "lat": "42.8937",
    "lng": "-85.5121",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Greenville South Carolina Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Guadalajara Mexico Temple",
    "lat": 20.661561,
    "lng": -103.42307,
    "year": 2001,
    "country": "Mexico"
  },
  {
    "name": "Guatemala City Guatemala Temple",
    "lat": 14.5833357,
    "lng": -90.4855764,
    "year": 1984,
    "country": "Guatemala"
  },
  {
    "name": "Guayaquil Ecuador Temple",
    "lat": -2.1563013,
    "lng": -79.9050036,
    "year": 1999,
    "country": "Ecuador"
  },
  {
    "name": "Halifax Nova Scotia Temple",
    "lat": "44.6700",
    "lng": "-63.4890",
    "year": 1999,
    "country": "Canada"
  },
  {
    "name": "Hamburg Germany Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Germany"
  },
  {
    "name": "Hamilton New Zealand Temple",
    "lat": "-37.8263",
    "lng": "175.2246",
    "year": 1958,
    "country": "New Zealand"
  },
  {
    "name": "Harare Zimbabwe Temple",
    "lat": "-17.8040",
    "lng": "31.0825",
    "year": null,
    "country": "Zimbabwe"
  },
  {
    "name": "Harrisburg Pennsylvania Temple",
    "lat": "40.28396",
    "lng": "-76.80294",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Hartford Connecticut Temple",
    "lat": 41.7378162,
    "lng": -72.844547,
    "year": 2016,
    "country": "United States"
  },
  {
    "name": "Heber Valley Utah Temple",
    "lat": "40.5071",
    "lng": "-111.3929",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Helena Montana Temple",
    "lat": "46.6336",
    "lng": "-112.0192",
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Helsinki Finland Temple",
    "lat": 60.2251854,
    "lng": 24.7815986,
    "year": 2006,
    "country": "Finland"
  },
  {
    "name": "Hermosillo Sonora Mexico Temple",
    "lat": 29.102528,
    "lng": -110.9468092,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Hong Kong China Temple",
    "lat": 22.3404187,
    "lng": 114.177341,
    "year": 1996,
    "country": "Hong Kong"
  },
  {
    "name": "Honolulu Hawaii Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Houston Texas South Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Houston Texas Temple",
    "lat": "29.9996",
    "lng": "-95.5333",
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Huancayo Peru Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Huehuetenango Guatemala Temple",
    "lat": "15.3262",
    "lng": "-91.4899",
    "year": null,
    "country": "Guatemala"
  },
  {
    "name": "Huntsville Alabama Temple",
    "lat": "34.72828932019436",
    "lng": "-86.78282759280738",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Idaho Falls Idaho Temple",
    "lat": 43.499903,
    "lng": -112.0414259,
    "year": 1945,
    "country": "United States"
  },
  {
    "name": "Iloilo Philippines Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Indianapolis Indiana Temple",
    "lat": 39.9553086,
    "lng": -86.1663044,
    "year": 2015,
    "country": "United States"
  },
  {
    "name": "Iquitos Peru Temple",
    "lat": "-3.7607686052902456",
    "lng": "-73.26737802015536",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Jacksonville Florida Temple",
    "lat": "30.3095",
    "lng": "-81.5942",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Jakarta Indonesia Temple",
    "lat": "-6.240902",
    "lng": "106.837533",
    "year": null,
    "country": "Indonesia"
  },
  {
    "name": "João Pessoa Brazil Temple",
    "lat": "-7.1245",
    "lng": "-34.8287",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Johannesburg South Africa Temple",
    "lat": -26.1780822,
    "lng": 28.0392237,
    "year": 1985,
    "country": "South Africa"
  },
  {
    "name": "Jordan River Utah Temple",
    "lat": 40.5661896,
    "lng": -111.9314199,
    "year": 1981,
    "country": "United States"
  },
  {
    "name": "Juchitán de Zaragoza Mexico Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Kahului Hawaii Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Kampala Uganda Temple",
    "lat": 0.3137971,
    "lng": 32.580379,
    "year": null,
    "country": "Uganda"
  },
  {
    "name": "Kananga Democratic Republic of the Congo Temple",
    "lat": "-5.8952",
    "lng": "22.4297",
    "year": null,
    "country": "Democratic Republic of the Congo"
  },
  {
    "name": "Kansas City Missouri Temple",
    "lat": 39.2202403,
    "lng": -94.5013296,
    "year": 2012,
    "country": "United States"
  },
  {
    "name": "Kaohsiung Taiwan Temple",
    "lat": "22.6508",
    "lng": "120.2995",
    "year": null,
    "country": "Taiwan"
  },
  {
    "name": "Kinshasa Democratic Republic of the Congo Temple",
    "lat": "-4.3275",
    "lng": "15.2738",
    "year": 2019,
    "country": "Democratic Republic of the Congo"
  },
  {
    "name": "Knoxville Tennessee Temple",
    "lat": 36.0893544,
    "lng": -83.9231451,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Kona Hawaii Temple",
    "lat": 19.6416539,
    "lng": -155.985315,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Kumasi Ghana Temple",
    "lat": "6.6885",
    "lng": "-1.6244",
    "year": null,
    "country": "Ghana"
  },
  {
    "name": "Kyiv Ukraine Temple",
    "lat": "50.4045",
    "lng": "30.3956",
    "year": 2010,
    "country": "Ukraine"
  },
  {
    "name": "La Paz Bolivia Temple",
    "lat": "-16.5440",
    "lng": "-68.0898",
    "year": null,
    "country": "Bolivia"
  },
  {
    "name": "Lagos Nigeria Temple",
    "lat": "6.4449",
    "lng": "3.4314",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "Laie Hawaii Temple",
    "lat": 21.6472444,
    "lng": -157.9306976,
    "year": 1919,
    "country": "United States"
  },
  {
    "name": "Laoag Philippines Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Las Vegas Nevada Temple",
    "lat": 36.1746129,
    "lng": -115.0200038,
    "year": 1989,
    "country": "United States"
  },
  {
    "name": "Layton Utah Temple",
    "lat": "41.0622",
    "lng": "-111.9403",
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Lehi Utah Temple",
    "lat": "40.4387",
    "lng": "-111.8517",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Lethbridge Alberta Temple",
    "lat": "49.67048",
    "lng": "-112.91018",
    "year": null,
    "country": "Canada"
  },
  {
    "name": "Lima Peru Los Olivos Temple",
    "lat": "-12.01991",
    "lng": "-77.05384",
    "year": 2024,
    "country": "Peru"
  },
  {
    "name": "Lima Peru Temple",
    "lat": -12.0697168,
    "lng": -76.9488437,
    "year": 1986,
    "country": "Peru"
  },
  {
    "name": "Lindon Utah Temple",
    "lat": 40.3368345,
    "lng": -111.6954892,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Lisbon Portugal Temple",
    "lat": 38.779797,
    "lng": -9.0990619,
    "year": 2019,
    "country": "Portugal"
  },
  {
    "name": "Liverpool Australia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Australia"
  },
  {
    "name": "Logan Utah Temple",
    "lat": 41.7345309,
    "lng": -111.82797,
    "year": 1884,
    "country": "United States"
  },
  {
    "name": "London England Temple",
    "lat": "51.16257",
    "lng": "-0.05218",
    "year": 1958,
    "country": "England"
  },
  {
    "name": "Londrina Brazil Temple",
    "lat": "-23.34424",
    "lng": "-51.16014",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Lone Mountain Nevada Temple",
    "lat": "36.23627",
    "lng": "-115.30413",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Los Angeles California Temple",
    "lat": 34.0525886,
    "lng": -118.4341799,
    "year": 1956,
    "country": "United States"
  },
  {
    "name": "Louisville Kentucky Temple",
    "lat": 38.3210665,
    "lng": -85.4888285,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Luanda Angola Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Angola"
  },
  {
    "name": "Lubbock Texas Temple",
    "lat": 33.529081,
    "lng": -101.9413921,
    "year": 2002,
    "country": "United States"
  },
  {
    "name": "Lubumbashi Democratic Republic of the Congo Temple",
    "lat": "-11.648966516670264",
    "lng": "27.46839647305366",
    "year": null,
    "country": "Democratic Republic of the Congo"
  },
  {
    "name": "Maceió Brazil Temple",
    "lat": "-9.603335669390283",
    "lng": "-35.74354601844527",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Madrid Spain Temple",
    "lat": "40.400329247783716",
    "lng": "-3.6310514398629716",
    "year": 1999,
    "country": "Spain"
  },
  {
    "name": "Managua Nicaragua Temple",
    "lat": "12.09082247136233",
    "lng": "-86.23300187662544",
    "year": null,
    "country": "Nicaragua"
  },
  {
    "name": "Manaus Brazil Temple",
    "lat": -3.0739478,
    "lng": -60.0893432,
    "year": 2012,
    "country": "Brazil"
  },
  {
    "name": "Manhattan New York Temple",
    "lat": "40.773586637014766",
    "lng": "-73.98181864953887",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Manila Philippines Temple",
    "lat": 14.6014387,
    "lng": 121.0697509,
    "year": 1984,
    "country": "Philippines"
  },
  {
    "name": "Manti Utah Temple",
    "lat": 39.2731655,
    "lng": -111.6337817,
    "year": 1888,
    "country": "United States"
  },
  {
    "name": "Maputo Mozambique Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mozambique"
  },
  {
    "name": "Maracaibo Venezuela Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Venezuela"
  },
  {
    "name": "Mbuji-Mayi Democratic Republic of the Congo Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Democratic Republic of the Congo"
  },
  {
    "name": "McAllen Texas Temple",
    "lat": 26.2679345,
    "lng": -98.2110188,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Medellín Colombia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Colombia"
  },
  {
    "name": "Medford Oregon Temple",
    "lat": 42.3731982,
    "lng": -122.9326884,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Melbourne Australia Temple",
    "lat": -37.8688729,
    "lng": 145.2126338,
    "year": 2000,
    "country": "Australia"
  },
  {
    "name": "Memphis Tennessee Temple",
    "lat": 35.2406262,
    "lng": -89.8393392,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Mendoza Argentina Temple",
    "lat": "-32.863628245622635",
    "lng": "-68.88186227848448",
    "year": 2024,
    "country": "Argentina"
  },
  {
    "name": "Mérida Mexico Temple",
    "lat": 20.9656796,
    "lng": -89.631102,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Meridian Idaho Temple",
    "lat": 43.6715738,
    "lng": -116.4150123,
    "year": 2017,
    "country": "United States"
  },
  {
    "name": "Mesa Arizona Temple",
    "lat": 33.4127579,
    "lng": -111.8196718,
    "year": 1927,
    "country": "United States"
  },
  {
    "name": "Mexico City Benemérito Mexico Temple",
    "lat": "19.535294346755546",
    "lng": "-99.15140643799214",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Mexico City Mexico Temple",
    "lat": 19.4658938,
    "lng": -99.086824,
    "year": 1983,
    "country": "Mexico"
  },
  {
    "name": "Milan Italy Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Italy"
  },
  {
    "name": "Milwaukee Wisconsin Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Miraflores Guatemala City Guatemala Temple",
    "lat": "14.60738754112757",
    "lng": "-90.5445524403132",
    "year": null,
    "country": "Guatemala"
  },
  {
    "name": "Missoula Montana Temple",
    "lat": "46.819340755510126",
    "lng": "-114.06651830361196",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Modesto California Temple",
    "lat": "37.7032604723852",
    "lng": "-121.0472432533504",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Monrovia Liberia Temple",
    "lat": "6.278996995833849",
    "lng": "-10.75934649103483",
    "year": null,
    "country": "Liberia"
  },
  {
    "name": "Monterrey Mexico Temple",
    "lat": 25.5893279,
    "lng": -100.2599976,
    "year": 2002,
    "country": "Mexico"
  },
  {
    "name": "Montevideo Uruguay Temple",
    "lat": "-34.88819408861207",
    "lng": "-56.073570376647446",
    "year": 2001,
    "country": "Uruguay"
  },
  {
    "name": "Monticello Utah Temple",
    "lat": 37.8779057,
    "lng": -109.3470803,
    "year": 1998,
    "country": "United States"
  },
  {
    "name": "Montpelier Idaho Temple",
    "lat": 42.3181582,
    "lng": -111.3016865,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Montreal Quebec Temple",
    "lat": 45.5631876,
    "lng": -73.4906341,
    "year": 2000,
    "country": "Canada"
  },
  {
    "name": "Moses Lake Washington Temple",
    "lat": 47.1035473,
    "lng": -119.2713781,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Mount Timpanogos Utah Temple",
    "lat": 40.3928752,
    "lng": -111.7705939,
    "year": 1996,
    "country": "United States"
  },
  {
    "name": "Naga Philippines Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Nairobi Kenya Temple",
    "lat": "-1.2651768267642551",
    "lng": "36.73925899921133",
    "year": 2025,
    "country": "Kenya"
  },
  {
    "name": "Nashville Tennessee Temple",
    "lat": 35.9488445,
    "lng": -86.8603178,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Natal Brazil Temple",
    "lat": "-1.2652191397442458",
    "lng": "36.739831943393554",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Nauvoo Illinois Temple",
    "lat": 40.5504848,
    "lng": -91.3843815,
    "year": 2002,
    "country": "United States"
  },
  {
    "name": "Neiafu Tonga Temple",
    "lat": "-18.644243323225403",
    "lng": "-173.97730069693594",
    "year": null,
    "country": "Tonga"
  },
  {
    "name": "Newport Beach California Temple",
    "lat": 33.6295083,
    "lng": -117.848797,
    "year": 2005,
    "country": "United States"
  },
  {
    "name": "Norfolk Virginia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Nouméa New Caledonia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "New Caledonia"
  },
  {
    "name": "Nuku'alofa Tonga Temple",
    "lat": "-21.16268813429761",
    "lng": "-175.27165446129223",
    "year": 1983,
    "country": "Tonga"
  },
  {
    "name": "Oakland California Temple",
    "lat": 37.8078178,
    "lng": -122.1990995,
    "year": 1964,
    "country": "United States"
  },
  {
    "name": "Oaxaca Mexico Temple",
    "lat": 17.0415415,
    "lng": -96.7134801,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Ogden Utah Temple",
    "lat": 41.2276188,
    "lng": -111.9715592,
    "year": 1972,
    "country": "United States"
  },
  {
    "name": "Okinawa Japan Temple",
    "lat": 26.3582484,
    "lng": 127.8017085,
    "year": 2023,
    "country": "Japan"
  },
  {
    "name": "Oklahoma City Oklahoma Temple",
    "lat": "35.59208422767853",
    "lng": "-97.72590865943434",
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Oquirrh Mountain Utah Temple",
    "lat": 40.5511637,
    "lng": -111.9876414,
    "year": 2009,
    "country": "United States"
  },
  {
    "name": "Orem Utah Temple",
    "lat": 40.2707545,
    "lng": -111.7193124,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Orlando Florida Temple",
    "lat": "28.507452480261758",
    "lng": "-81.50902550776429",
    "year": 1994,
    "country": "United States"
  },
  {
    "name": "Osaka Japan Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Japan"
  },
  {
    "name": "Oslo Norway Temple",
    "lat": "59.85792721763578",
    "lng": "10.480085100094389",
    "year": null,
    "country": "Norway"
  },
  {
    "name": "Pachuca Mexico Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Pago Pago American Samoa Temple",
    "lat": "-14.333852020683697",
    "lng": "-170.7315393706279",
    "year": null,
    "country": "American Samoa"
  },
  {
    "name": "Palmyra New York Temple",
    "lat": 43.0389988,
    "lng": -77.2370607,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Panama City Panama Temple",
    "lat": "8.992038026083009",
    "lng": "-79.5695971999126",
    "year": 2008,
    "country": "Panama"
  },
  {
    "name": "Papeete Tahiti Temple",
    "lat": "-17.53622726171924",
    "lng": "-149.55507818087196",
    "year": 1983,
    "country": "French Polynesia"
  },
  {
    "name": "Paris France Temple",
    "lat": "48.81837643363375",
    "lng": "2.124221636335069",
    "year": 2017,
    "country": "France"
  },
  {
    "name": "Payson Utah Temple",
    "lat": 40.0195478,
    "lng": -111.749633,
    "year": 2015,
    "country": "United States"
  },
  {
    "name": "Perth Australia Temple",
    "lat": -31.9069805,
    "lng": 115.8698624,
    "year": 2001,
    "country": "Australia"
  },
  {
    "name": "Philadelphia Pennsylvania Temple",
    "lat": 39.9590849,
    "lng": -75.1682262,
    "year": 2016,
    "country": "United States"
  },
  {
    "name": "Phnom Penh Cambodia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Cambodia"
  },
  {
    "name": "Phoenix Arizona Temple",
    "lat": 33.6985883,
    "lng": -112.1720586,
    "year": 2014,
    "country": "United States"
  },
  {
    "name": "Pittsburgh Pennsylvania Temple",
    "lat": 40.694079,
    "lng": -80.1410969,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Piura Peru Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Peru"
  },
  {
    "name": "Pocatello Idaho Temple",
    "lat": 42.9152142,
    "lng": -112.4064083,
    "year": 2021,
    "country": "United States"
  },
  {
    "name": "Port Moresby Papua New Guinea Temple",
    "lat": "-9.476795225429848",
    "lng": "147.1775399461113",
    "year": null,
    "country": "Papua New Guinea"
  },
  {
    "name": "Port Vila Vanuatu Temple",
    "lat": "-17.703434050257442",
    "lng": "168.30445702946716",
    "year": null,
    "country": "Vanuatu"
  },
  {
    "name": "Port-au-Prince Haiti Temple",
    "lat": 18.5290135,
    "lng": -72.2681996,
    "year": 2019,
    "country": "Haiti"
  },
  {
    "name": "Portland Oregon Temple",
    "lat": 45.4254201,
    "lng": -122.7422707,
    "year": 1989,
    "country": "United States"
  },
  {
    "name": "Porto Alegre Brazil Temple",
    "lat": -30.0340622,
    "lng": -51.1576233,
    "year": 2000,
    "country": "Brazil"
  },
  {
    "name": "Porto Portugal Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Portugal"
  },
  {
    "name": "Praia Cape Verde Temple",
    "lat": 14.9185381,
    "lng": -23.5111941,
    "year": 2022,
    "country": "Cape Verde"
  },
  {
    "name": "Preston England Temple",
    "lat": 53.6711255,
    "lng": -2.6291673,
    "year": 1998,
    "country": "England"
  },
  {
    "name": "Price Utah Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Provo City Center Temple",
    "lat": 40.2326399,
    "lng": -111.6593084,
    "year": 2016,
    "country": "United States"
  },
  {
    "name": "Provo Utah Rock Canyon Temple",
    "lat": 40.2636504,
    "lng": -111.6397704,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Puebla Mexico Temple",
    "lat": 19.0850071,
    "lng": -98.2356231,
    "year": 2024,
    "country": "Mexico"
  },
  {
    "name": "Puerto Montt Chile Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Chile"
  },
  {
    "name": "Queen Creek Arizona Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Querétaro Mexico Temple",
    "lat": "20.613610669465736",
    "lng": "-100.4098197226599",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Quetzaltenango Guatemala Temple",
    "lat": "14.847124086134352",
    "lng": "-91.54211603800265",
    "year": 2011,
    "country": "Guatemala"
  },
  {
    "name": "Quito Ecuador Temple",
    "lat": -0.214098,
    "lng": -78.4411852,
    "year": 2022,
    "country": "Ecuador"
  },
  {
    "name": "Raleigh North Carolina Temple",
    "lat": 35.7321573,
    "lng": -78.8615408,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Rapid City South Dakota Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Recife Brazil Temple",
    "lat": "-8.036221183080668",
    "lng": "-34.91018615573585",
    "year": 2000,
    "country": "Brazil"
  },
  {
    "name": "Red Cliffs Utah Temple",
    "lat": 37.0822625,
    "lng": -113.51956,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Redlands California Temple",
    "lat": 34.049043,
    "lng": -117.1405687,
    "year": 2003,
    "country": "United States"
  },
  {
    "name": "Regina Saskatchewan Temple",
    "lat": 50.4209603,
    "lng": -104.5416778,
    "year": 1999,
    "country": "Canada"
  },
  {
    "name": "Reno Nevada Temple",
    "lat": 39.5347184,
    "lng": -119.8988789,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Retalhuleu Guatemala Temple",
    "lat": "14.554162598879433",
    "lng": "-91.65490474169057",
    "year": null,
    "country": "Guatemala"
  },
  {
    "name": "Rexburg Idaho Temple",
    "lat": 43.8109096,
    "lng": -111.7790882,
    "year": 2008,
    "country": "United States"
  },
  {
    "name": "Reynosa Mexico Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Ribeirão Prêto Brazil Temple",
    "lat": "-21.21598548586108",
    "lng": "-47.80932450547363",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Richmond Virginia Temple",
    "lat": 37.6728679,
    "lng": -77.5351851,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Rio de Janeiro Brazil Temple",
    "lat": -23.0007751,
    "lng": -43.400323,
    "year": 2022,
    "country": "Brazil"
  },
  {
    "name": "Rivera Uruguay Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Uruguay"
  },
  {
    "name": "Roanoke Virginia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Rome Italy Temple",
    "lat": 41.9704963,
    "lng": 12.5448151,
    "year": 2019,
    "country": "Italy"
  },
  {
    "name": "Rosario Argentina Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Argentina"
  },
  {
    "name": "Russia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Russia"
  },
  {
    "name": "Sacramento California Temple",
    "lat": 38.6352777,
    "lng": -121.1940295,
    "year": 2006,
    "country": "United States"
  },
  {
    "name": "Salt Lake Temple",
    "lat": 40.7704367,
    "lng": -111.8919131,
    "year": 1893,
    "country": "United States"
  },
  {
    "name": "Salta Argentina Temple",
    "lat": -24.8378522,
    "lng": -65.469422,
    "year": 2024,
    "country": "Argentina"
  },
  {
    "name": "Salvador Brazil Temple",
    "lat": -12.9290818,
    "lng": -38.3862808,
    "year": 2024,
    "country": "Brazil"
  },
  {
    "name": "San Antonio Texas Temple",
    "lat": 29.641603,
    "lng": -98.4888196,
    "year": 2005,
    "country": "United States"
  },
  {
    "name": "San Diego California Temple",
    "lat": 32.8663961,
    "lng": -117.2287003,
    "year": 1993,
    "country": "United States"
  },
  {
    "name": "San Jose California Temple",
    "lat": "37.35309420545954",
    "lng": "-122.04332195944554",
    "year": null,
    "country": "United States"
  },
  {
    "name": "San José Costa Rica Temple",
    "lat": 9.9864054,
    "lng": -84.1848831,
    "year": 2000,
    "country": "Costa Rica"
  },
  {
    "name": "San Jose del Monte Philippines Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "San Juan Puerto Rico Temple",
    "lat": 18.3857362,
    "lng": -66.0292855,
    "year": 2023,
    "country": "Puerto Rico"
  },
  {
    "name": "San Luis Potosí Mexico Temple",
    "lat": "22.153285589023508",
    "lng": "-101.01501913985858",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "San Pedro Sula Honduras Temple",
    "lat": 15.5224931,
    "lng": -88.0371062,
    "year": 2024,
    "country": "Honduras"
  },
  {
    "name": "San Salvador El Salvador Temple",
    "lat": 13.6832275,
    "lng": -89.2468286,
    "year": 2011,
    "country": "El Salvador"
  },
  {
    "name": "Santa Ana El Salvador Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "El Salvador"
  },
  {
    "name": "Santa Cruz Bolivia Temple",
    "lat": -17.7386639,
    "lng": -63.1746687,
    "year": null,
    "country": "Bolivia"
  },
  {
    "name": "Santiago Chile Temple",
    "lat": "-33.43598586294198",
    "lng": "-70.60887038872536",
    "year": 1983,
    "country": "Chile"
  },
  {
    "name": "Santiago Dominican Republic Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Dominican Republic"
  },
  {
    "name": "Santiago Philippines Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Santiago West Chile Temple",
    "lat": "-33.49282211594212",
    "lng": "-70.73611585704889",
    "year": null,
    "country": "Chile"
  },
  {
    "name": "Santo Domingo Dominican Republic Temple",
    "lat": "18.466737063202615",
    "lng": "-69.91622239991726",
    "year": 2000,
    "country": "Dominican Republic"
  },
  {
    "name": "Santos Brazil Temple",
    "lat": "-23.942728834692502",
    "lng": "-46.333797646636846",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "São Paulo Brazil Temple",
    "lat": -23.585112,
    "lng": -46.7226375,
    "year": 1978,
    "country": "Brazil"
  },
  {
    "name": "São Paulo East Brazil Temple",
    "lat": "-23.555453151701716",
    "lng": "-46.54427389360217",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Sapporo Japan Temple",
    "lat": 43.0248998,
    "lng": 141.4457213,
    "year": 2016,
    "country": "Japan"
  },
  {
    "name": "Saratoga Springs Utah Temple",
    "lat": 40.3442312,
    "lng": -111.9327142,
    "year": 2023,
    "country": "United States"
  },
  {
    "name": "Savai'i Samoa Temple",
    "lat": "-13.751802933920885",
    "lng": "-172.23104917106804",
    "year": null,
    "country": "Samoa"
  },
  {
    "name": "Seattle Washington Temple",
    "lat": 47.5840664,
    "lng": -122.1409493,
    "year": 1980,
    "country": "United States"
  },
  {
    "name": "Seoul Korea Temple",
    "lat": 37.558863,
    "lng": 126.9312994,
    "year": 1985,
    "country": "South Korea"
  },
  {
    "name": "Shanghai People's Republic of China Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "China"
  },
  {
    "name": "Singapore Temple",
    "lat": 1.280175712404137,
    "lng": 103.78515168343058,
    "year": null,
    "country": "Singapore"
  },
  {
    "name": "Smithfield Utah Temple",
    "lat": 41.8396315,
    "lng": -111.8526939,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Snowflake Arizona Temple",
    "lat": 34.5024897,
    "lng": -110.1115742,
    "year": 2002,
    "country": "United States"
  },
  {
    "name": "Spanish Fork Utah Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Spokane Washington Temple",
    "lat": 47.620308,
    "lng": -117.2207176,
    "year": 1999,
    "country": "United States"
  },
  {
    "name": "Springfield Missouri Temple",
    "lat": "37.10225998721938",
    "lng": "-93.24282165151074",
    "year": null,
    "country": "United States"
  },
  {
    "name": "St. George Utah Temple",
    "lat": 37.1005287,
    "lng": -113.5780975,
    "year": 1877,
    "country": "United States"
  },
  {
    "name": "St. Louis Missouri Temple",
    "lat": 38.6396749,
    "lng": -90.4648066,
    "year": 1997,
    "country": "United States"
  },
  {
    "name": "St. Paul Minnesota Temple",
    "lat": 44.9802105,
    "lng": -92.9653205,
    "year": 2000,
    "country": "United States"
  },
  {
    "name": "Star Valley Wyoming Temple",
    "lat": 42.7120674,
    "lng": -110.9325891,
    "year": 2016,
    "country": "United States"
  },
  {
    "name": "Stockholm Sweden Temple",
    "lat": "59.12496822958754",
    "lng": "18.109469671784776",
    "year": 1984,
    "country": "Sweden"
  },
  {
    "name": "Summit New Jersey Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Suva Fiji Temple",
    "lat": -18.1196781,
    "lng": 178.4385779,
    "year": 2000,
    "country": "Fiji"
  },
  {
    "name": "Sydney Australia Temple",
    "lat": -33.7756191,
    "lng": 151.0506105,
    "year": 1984,
    "country": "Australia"
  },
  {
    "name": "Syracuse Utah Temple",
    "lat": 41.0991284,
    "lng": -112.0758264,
    "year": 2025,
    "country": "United States"
  },
  {
    "name": "Tacloban City Philippines Temple",
    "lat": "11.223854574563946",
    "lng": "124.98478471411943",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Tacoma Washington Temple",
    "lat": "47.27498252123171",
    "lng": "-122.31432254730511",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Taipei Taiwan Temple",
    "lat": 25.031323,
    "lng": 121.5278192,
    "year": 1984,
    "country": "Taiwan"
  },
  {
    "name": "Tallahassee Florida Temple",
    "lat": 30.5201293,
    "lng": -84.2381382,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Tampa Florida Temple",
    "lat": 28.046787,
    "lng": -82.3931621,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Tampico Mexico Temple",
    "lat": "22.254441310874775",
    "lng": "-97.855598682914",
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Tarawa Kiribati Temple",
    "lat": "1.3496683852397777",
    "lng": "173.04036570691147",
    "year": null,
    "country": "Kiribati"
  },
  {
    "name": "Taylorsville Utah Temple",
    "lat": 40.6667185,
    "lng": -111.9542729,
    "year": 2024,
    "country": "United States"
  },
  {
    "name": "Tegucigalpa Honduras Temple",
    "lat": "14.052600866872307",
    "lng": "-87.23726622081435",
    "year": 2013,
    "country": "Honduras"
  },
  {
    "name": "Teresina Brazil Temple",
    "lat": "-5.087978304560994",
    "lng": "-42.77932630732141",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Teton River Idaho Temple",
    "lat": 43.8592534,
    "lng": -111.7813291,
    "year": null,
    "country": "United States"
  },
  {
    "name": "The Gila Valley Arizona Temple",
    "lat": 32.8629206,
    "lng": -109.7899505,
    "year": 2010,
    "country": "United States"
  },
  {
    "name": "The Hague Netherlands Temple",
    "lat": "52.05464556588202",
    "lng": "4.503430604320177",
    "year": 2002,
    "country": "Netherlands"
  },
  {
    "name": "Tijuana Mexico Temple",
    "lat": "32.48882442328363",
    "lng": "-116.92869119197763",
    "year": 2015,
    "country": "Mexico"
  },
  {
    "name": "Tokyo Japan Temple",
    "lat": 35.6528389,
    "lng": 139.7244968,
    "year": 1980,
    "country": "Japan"
  },
  {
    "name": "Toluca Mexico Temple",
    "lat": "19.252498783299746",
    "lng": "-99.62633516499596",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Toronto Ontario Temple",
    "lat": 43.7443655,
    "lng": -79.7457495,
    "year": 1990,
    "country": "Canada"
  },
  {
    "name": "Torreón Mexico Temple",
    "lat": "25.553296475477143",
    "lng": "-103.49891603527786",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Trujillo Peru Temple",
    "lat": "-8.09978567481594",
    "lng": "-79.0578475324452",
    "year": 2015,
    "country": "Peru"
  },
  {
    "name": "Tucson Arizona Temple",
    "lat": "32.3382019701543",
    "lng": "-110.94857478588798",
    "year": 2017,
    "country": "United States"
  },
  {
    "name": "Tuguegarao City Philippines Temple",
    "lat": "17.65021105897344",
    "lng": "121.75207239084482",
    "year": null,
    "country": "Philippines"
  },
  {
    "name": "Tula Mexico Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mexico"
  },
  {
    "name": "Tulsa Oklahoma Temple",
    "lat": "36.09195625634446",
    "lng": "-95.82522958446047",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Tuxtla Gutiérrez Mexico Temple",
    "lat": 16.7641367,
    "lng": -93.1591256,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Twin Falls Idaho Temple",
    "lat": 42.5868285,
    "lng": -114.4416125,
    "year": 2008,
    "country": "United States"
  },
  {
    "name": "Ulaanbaatar Mongolia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Mongolia"
  },
  {
    "name": "Urdaneta Philippines Temple",
    "lat": "15.938681853079702",
    "lng": "120.58244829084086",
    "year": 2024,
    "country": "Philippines"
  },
  {
    "name": "Uturoa French Polynesia Temple",
    "lat": "-16.736094326037694",
    "lng": "-151.4406951452034",
    "year": null,
    "country": "French Polynesia"
  },
  {
    "name": "Uyo Nigeria Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Nigeria"
  },
  {
    "name": "Vancouver British Columbia Temple",
    "lat": 49.1512108,
    "lng": -122.6580005,
    "year": 2010,
    "country": "Canada"
  },
  {
    "name": "Vancouver Washington Temple",
    "lat": "45.60749315880962",
    "lng": "-122.46906837847988",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Veracruz Mexico Temple",
    "lat": 19.1342287,
    "lng": -96.1061978,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Vernal Utah Temple",
    "lat": 40.4532095,
    "lng": -109.5371899,
    "year": 1997,
    "country": "United States"
  },
  {
    "name": "Victoria British Columbia Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "Canada"
  },
  {
    "name": "Vienna Austria Temple",
    "lat": "48.243026277153334",
    "lng": "16.349554803863466",
    "year": null,
    "country": "Austria"
  },
  {
    "name": "Villahermosa Mexico Temple",
    "lat": 17.9812855,
    "lng": -92.9373459,
    "year": 2000,
    "country": "Mexico"
  },
  {
    "name": "Viña del Mar Chile Temple",
    "lat": "-33.02007721155108",
    "lng": "-71.54466659323272",
    "year": null,
    "country": "Chile"
  },
  {
    "name": "Vitória Brazil Temple",
    "lat": "-20.296476177757924",
    "lng": "-40.30399574778942",
    "year": null,
    "country": "Brazil"
  },
  {
    "name": "Washington D.C. Temple",
    "lat": 39.014058,
    "lng": -77.065608,
    "year": 1974,
    "country": "United States"
  },
  {
    "name": "Wellington New Zealand Temple",
    "lat": "-41.120048177684666",
    "lng": "174.88035592297402",
    "year": null,
    "country": "New Zealand"
  },
  {
    "name": "West Jordan Utah Temple",
    "lat": "40.622842442642536",
    "lng": "-112.06574589816796",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Wichita Kansas Temple",
    "lat": "37.77597922236015",
    "lng": "-97.37269318642497",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Willamette Valley Oregon Temple",
    "lat": 44.0889499,
    "lng": -123.0323272,
    "year": null,
    "country": "United States"
  },
  {
    "name": "Winchester Virginia Temple",
    "lat": "39.18829019608052",
    "lng": "-78.1917340956686",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Winnipeg Manitoba Temple",
    "lat": 49.8010295,
    "lng": -97.1946426,
    "year": 2021,
    "country": "Canada"
  },
  {
    "name": "Winter Quarters Nebraska Temple",
    "lat": 41.3340799,
    "lng": -95.966178,
    "year": 2001,
    "country": "United States"
  },
  {
    "name": "Yigo Guam Temple",
    "lat": 13.5417093,
    "lng": 144.8901158,
    "year": 2022,
    "country": "Guam"
  },
  {
    "name": "Yorba Linda California Temple",
    "lat": "33.89896516145163",
    "lng": "-117.83486732026483",
    "year": null,
    "country": "United States"
  },
  {
    "name": "Yuma Arizona Temple",
    "lat": "",
    "lng": "",
    "year": null,
    "country": "United States"
  }

];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeTimeline();
    
    // Load temples from embedded data
    loadTemplesFromEmbeddedData();
    
    // Initialize toggle for undedicated temples
    initializeUndedicatedToggle();
    
    // Initialize incomplete temples table
    updateIncompleteTemplesTable();
    
    // Initialize filter listeners
    initializeFilterListeners();
});

// Initialize the map
function initializeMap() {
    map = L.map('map').setView([20, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Set map boundaries to prevent infinite scrolling
    const southWest = L.latLng(-90, -180);
    const northEast = L.latLng(90, 180);
    const bounds = L.latLngBounds(southWest, northEast);
    map.setMaxBounds(bounds);
    map.setMinZoom(1);
    map.setMaxZoom(18);
    
    // Map is now ready for temple markers
}

// Initialize timeline controls
function initializeTimeline() {
    const timeline = document.getElementById('timeline');
    const playBtn = document.getElementById('play-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    // Create detailed tick marks
    createTimelineTicks();
    
    // Set initial slider value
    timeline.value = currentYear;
    
    timeline.addEventListener('input', function() {
        currentYear = parseInt(this.value);
        console.log('Timeline changed to year:', currentYear);
        updateTimelineVisuals();
        updateDisplay();
    });
    
    // Also listen for 'change' event to ensure synchronization
    timeline.addEventListener('change', function() {
        currentYear = parseInt(this.value);
        console.log('Timeline changed to year (change event):', currentYear);
        updateTimelineVisuals();
        updateDisplay();
    });
    
    playBtn.addEventListener('click', togglePlay);
    resetBtn.addEventListener('click', resetTimeline);
    
    // Initialize timeline visuals
    updateTimelineVisuals();
}

// Create detailed tick marks for the timeline
function createTimelineTicks() {
    const ticksContainer = document.querySelector('.timeline-ticks');
    const minYear = 1836;
    const maxYear = 2025;
    
    // Clear existing ticks
    ticksContainer.innerHTML = '';
    
    // Create ticks for each year
    for (let year = minYear; year <= maxYear; year++) {
        const tick = document.createElement('div');
        tick.className = 'tick';
        tick.dataset.year = year;
        
        // Calculate position based on year
        const progress = (year - minYear) / (maxYear - minYear);
        tick.style.left = (progress * 100) + '%';
        
        // Make major years (every 25 years) more prominent
        if (year % 25 === 0 || year === minYear || year === maxYear) {
            tick.classList.add('major');
        }
        
        ticksContainer.appendChild(tick);
    }
}

// Update timeline visual elements
function updateTimelineVisuals() {
    const timeline = document.getElementById('timeline');
    const fill = document.querySelector('.timeline-fill');
    const marker = document.querySelector('.timeline-marker');
    const ticks = document.querySelectorAll('.timeline-ticks .tick');
    const labels = document.querySelectorAll('.timeline-labels .label-major');
    
    const minYear = 1836;
    const maxYear = 2025;
    const range = maxYear - minYear;
    const progress = (currentYear - minYear) / range;
    
    // Update fill width
    fill.style.width = (progress * 100) + '%';
    
    // Update marker position
    marker.style.left = (progress * 100) + '%';
    
    // Update tick states
    ticks.forEach(tick => {
        const tickYear = parseInt(tick.dataset.year);
        tick.classList.toggle('active', tickYear <= currentYear);
    });
    
    // Update label states
    labels.forEach(label => {
        const labelYear = parseInt(label.textContent);
        label.classList.toggle('active', labelYear <= currentYear);
    });
}

// Load temple data from embedded data
function loadTemplesFromEmbeddedData() {
    temples = templeData;
    console.log('Loaded temples from embedded data:', temples);
    localStorage.setItem('temples', JSON.stringify(temples));
    updateDisplay();
}

// Initialize toggle for undedicated temples
function initializeUndedicatedToggle() {
    const toggle = document.getElementById('show-undedicated');
    
    if (!toggle) {
        console.error('Toggle element not found!');
        return;
    }
    
    console.log('Initializing toggle, current state:', showUndedicated);
    
    toggle.addEventListener('change', function() {
        showUndedicated = this.checked;
        console.log('Toggle changed! Show undedicated temples:', showUndedicated);
        
        // Update toggle text to show current state
        const toggleText = document.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = showUndedicated ? 'Hide Undedicated Temples' : 'Show Undedicated Temples (at 2025)';
        }
        
        updateDisplay();
    });
    
    // Set initial state
    toggle.checked = showUndedicated;
    
    // Set initial text
    const toggleText = document.querySelector('.toggle-text');
    if (toggleText) {
        toggleText.textContent = showUndedicated ? 'Hide Undedicated Temples' : 'Show Undedicated Temples (at 2025)';
    }
}

// Update the display based on current year
function updateDisplay() {
    // Check if map is initialized
    if (!map) {
        console.log('Map not initialized yet, retrying in 100ms');
        setTimeout(updateDisplay, 100);
        return;
    }
    
    // Ensure slider and currentYear are synchronized
    const timeline = document.getElementById('timeline');
    if (timeline.value != currentYear) {
        timeline.value = currentYear;
    }
    
    // Update timeline visuals
    updateTimelineVisuals();
    
    // Update timeline display
    document.getElementById('current-year').textContent = currentYear;
    
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Filter temples based on current year and toggle state
    let visibleTemples;
    console.log('DEBUG: currentYear =', currentYear, 'showUndedicated =', showUndedicated);
    
    // Always show dedicated temples up to current year
    visibleTemples = temples.filter(temple => temple.year !== null && temple.year <= currentYear);
    
    // Only add undedicated temples if toggle is ON AND we're at 2025 or later
    if (showUndedicated && currentYear >= 2025) {
        const undedicatedTemples = temples.filter(temple => temple.year === null);
        visibleTemples = visibleTemples.concat(undedicatedTemples);
        console.log('Adding', undedicatedTemples.length, 'undedicated temples at year', currentYear);
    } else {
        console.log('Not showing undedicated temples - toggle:', showUndedicated, 'year:', currentYear);
    }
    
    // Debug: Show breakdown of temples by year
    const templesByYear = {};
    visibleTemples.forEach(t => {
        const year = t.year === null ? 'null' : t.year;
        templesByYear[year] = (templesByYear[year] || 0) + 1;
    });
    console.log('Temples by year before coordinate filtering:', templesByYear);
    
    // Filter out temples without valid coordinates
    visibleTemples = visibleTemples.filter(temple => {
        // Clean the coordinates by removing any non-numeric characters except decimal points and minus signs
        const cleanLat = String(temple.lat).replace(/[^\d.-]/g, '');
        const cleanLng = String(temple.lng).replace(/[^\d.-]/g, '');
        
        const hasValidCoords = temple.lat && temple.lng && 
                              temple.lat !== "" && temple.lng !== "" && 
                              !isNaN(parseFloat(cleanLat)) && !isNaN(parseFloat(cleanLng)) &&
                              parseFloat(cleanLat) >= -90 && parseFloat(cleanLat) <= 90 &&
                              parseFloat(cleanLng) >= -180 && parseFloat(cleanLng) <= 180;
        
        if (!hasValidCoords && temple.lat && temple.lng) {
            console.warn('Invalid coordinates for temple:', temple.name, 'lat:', temple.lat, 'lng:', temple.lng);
        }
        
        return hasValidCoords;
    });
    
    console.log('Current year:', currentYear, 'Show undedicated:', showUndedicated, 'Visible temples:', visibleTemples.length);
    console.log('Total temples:', temples.length, 'Temples with null year:', temples.filter(t => t.year === null).length);
    
    visibleTemples.forEach(temple => {
        // Clean the coordinates by removing any non-numeric characters except decimal points and minus signs
        const cleanLat = String(temple.lat).replace(/[^\d.-]/g, '');
        const cleanLng = String(temple.lng).replace(/[^\d.-]/g, '');
        
        console.log('Adding marker for:', temple.name, 'at', cleanLat, cleanLng, 'year:', temple.year);
        
        // Create a simple marker first to test
        const marker = L.marker([parseFloat(cleanLat), parseFloat(cleanLng)]).addTo(map);
        
        const popupContent = `
            <div class="temple-popup">
                <h3>${temple.name}</h3>
                <p><strong>Country:</strong> ${temple.country}</p>
                <p><strong>Dedicated:</strong> <span class="year">${temple.year === null ? 'Not yet dedicated' : temple.year}</span></p>
                ${temple.description ? `<p>${temple.description}</p>` : ''}
            </div>
        `;
        
        marker.bindPopup(popupContent);
        markers.push(marker);
    });
    
    // Update temple count
    const count = visibleTemples.length;
    const undedicatedCount = temples.filter(t => t.year === null && 
        t.lat && t.lng && t.lat !== "" && t.lng !== "" && 
        !isNaN(parseFloat(t.lat)) && !isNaN(parseFloat(t.lng))).length;
    
    let countText = count === 1 ? '1 Temple' : `${count} Temples`;
    if (showUndedicated && currentYear >= 2025 && undedicatedCount > 0) {
        countText += ` (${undedicatedCount} undedicated)`;
    }
    
    document.getElementById('temple-count').textContent = countText;
    
    // Update incomplete temples table
    updateIncompleteTemplesTable();
    
    // Note: Timeline slider is updated separately to avoid conflicts
}

// Create custom icon for temple markers
function createTempleIcon(year) {
    const iconSize = 25;
    const iconAnchor = [iconSize / 2, iconSize / 2];
    
    // Simple colors based on decade
    let color = '#666666'; // Default gray
    if (year < 1900) color = '#333333'; // Dark gray for 1800s
    else if (year < 1950) color = '#666666'; // Medium gray for early 1900s
    else if (year < 2000) color = '#999999'; // Light gray for mid-century
    else color = '#cccccc'; // Very light gray for modern era
    
    return L.divIcon({
        className: 'temple-marker',
        html: `<div style="
            width: ${iconSize}px; 
            height: ${iconSize}px; 
            background: ${color}; 
            border: 2px solid white; 
            border-radius: 50%; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 10px;
        ">⛪</div>`,
        iconSize: [iconSize, iconSize],
        iconAnchor: iconAnchor
    });
}

// Toggle play/pause timeline
function togglePlay() {
    const playBtn = document.getElementById('play-btn');
    
    if (isPlaying) {
        // Stop playing
        clearInterval(playInterval);
        isPlaying = false;
        playBtn.textContent = 'Play Timeline';
    } else {
        // Start playing
        isPlaying = true;
        playBtn.textContent = 'Pause Timeline';
        
        playInterval = setInterval(() => {
            currentYear++;
            if (currentYear > 2025) {
                // Stop at 2025 instead of resetting
                currentYear = 2025;
                clearInterval(playInterval);
                isPlaying = false;
                playBtn.textContent = 'Play Timeline';
            }
            updateDisplay();
        }, 1000); // Update every second
    }
}

// Reset timeline to beginning
function resetTimeline() {
    currentYear = 1836;
    updateDisplay();
    
    if (isPlaying) {
        togglePlay();
    }
}

// Load temples from localStorage on page load
function loadTemplesFromStorage() {
    const stored = localStorage.getItem('temples');
    if (stored) {
        temples = JSON.parse(stored);
        console.log('Loaded temples from localStorage:', temples);
        updateDisplay();
    } else {
        // If no stored data, load from JSON file as fallback
        loadTemplesFromFile();
    }
}

// Save temples to localStorage
function saveTemplesToStorage() {
    localStorage.setItem('temples', JSON.stringify(temples));
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            togglePlay();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            currentYear = Math.max(1836, currentYear - 1);
            updateDisplay();
            break;
        case 'ArrowRight':
            e.preventDefault();
            currentYear = Math.min(2025, currentYear + 1);
            updateDisplay();
            break;
        case 'Home':
            e.preventDefault();
            resetTimeline();
            break;
    }
});

// Update incomplete temples table
function updateIncompleteTemplesTable() {
    const tableBody = document.getElementById('incomplete-temples-body');
    if (!tableBody) return;
    
    // Find temples with missing information
    const incompleteTemples = temples.filter(temple => {
        const hasValidCoords = temple.lat && temple.lng && 
                              temple.lat !== "" && temple.lng !== "" && 
                              !isNaN(parseFloat(temple.lat)) && !isNaN(parseFloat(temple.lng)) &&
                              parseFloat(temple.lat) >= -90 && parseFloat(temple.lat) <= 90 &&
                              parseFloat(temple.lng) >= -180 && parseFloat(temple.lng) <= 180;
        
        const hasYear = temple.year !== null && temple.year !== undefined;
        
        return !hasValidCoords || !hasYear;
    });
    
    // Only populate country filter if it's empty (first time) or if we're explicitly updating filters
    const countryFilter = document.getElementById('country-filter');
    if (countryFilter && countryFilter.options.length <= 1) {
        populateCountryFilter(incompleteTemples);
    }
    
    // Apply filters and display results
    displayFilteredIncompleteTemples(incompleteTemples);
}

// Populate country filter dropdown
function populateCountryFilter(incompleteTemples) {
    const countryFilter = document.getElementById('country-filter');
    if (!countryFilter) return;
    
    // Get unique countries from incomplete temples
    const countries = [...new Set(incompleteTemples.map(temple => temple.country).filter(country => country))].sort();
    
    // Only populate if the filter is empty or has only the default option
    if (countryFilter.options.length <= 1) {
        // Clear existing options except the first one
        countryFilter.innerHTML = '<option value="">All Countries</option>';
        
        // Add country options
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);
        });
    }
}

// Display filtered incomplete temples
function displayFilteredIncompleteTemples(incompleteTemples) {
    const tableBody = document.getElementById('incomplete-temples-body');
    const countryFilter = document.getElementById('country-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (!tableBody) return;
    
    // Get filter values
    const selectedCountry = countryFilter ? countryFilter.value : '';
    const selectedType = typeFilter ? typeFilter.value : '';
    
    console.log('Filtering temples - Country:', selectedCountry, 'Type:', selectedType, 'Total incomplete:', incompleteTemples.length);
    
    // Apply filters
    let filteredTemples = incompleteTemples;
    
    // Filter by country
    if (selectedCountry) {
        filteredTemples = filteredTemples.filter(temple => temple.country === selectedCountry);
        console.log('After country filter:', filteredTemples.length, 'temples');
    }
    
    // Filter by missing information type
    if (selectedType) {
        filteredTemples = filteredTemples.filter(temple => {
            const hasValidCoords = temple.lat && temple.lng && 
                                  temple.lat !== "" && temple.lng !== "" && 
                                  !isNaN(parseFloat(temple.lat)) && !isNaN(parseFloat(temple.lng)) &&
                                  parseFloat(temple.lat) >= -90 && parseFloat(temple.lat) <= 90 &&
                                  parseFloat(temple.lng) >= -180 && parseFloat(temple.lng) <= 180;
            
            const hasYear = temple.year !== null && temple.year !== undefined;
            
            if (selectedType === 'location') {
                return !hasValidCoords && hasYear;
            } else if (selectedType === 'year') {
                return hasValidCoords && !hasYear;
            } else if (selectedType === 'both') {
                return !hasValidCoords && !hasYear;
            }
            return false;
        });
    }
    
    // Update results count display
    const filteredCountElement = document.getElementById('filtered-count');
    if (filteredCountElement) {
        const totalIncomplete = incompleteTemples.length;
        if (selectedCountry || selectedType) {
            filteredCountElement.textContent = `Showing ${filteredTemples.length} of ${totalIncomplete} incomplete temples`;
        } else {
            filteredCountElement.textContent = `Showing all ${totalIncomplete} incomplete temples`;
        }
    }
    
    // Clear existing table content
    tableBody.innerHTML = '';
    
    if (filteredTemples.length === 0) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 3;
        cell.textContent = selectedCountry || selectedType ? 
            'No temples match the selected filters.' : 
            'All temples have complete information!';
        cell.style.textAlign = 'center';
        cell.style.fontStyle = 'italic';
        cell.style.color = '#666666';
        cell.style.padding = '20px';
        return;
    }
    
    // Sort temples by name
    filteredTemples.sort((a, b) => a.name.localeCompare(b.name));
    
    // Populate table
    filteredTemples.forEach(temple => {
        const row = tableBody.insertRow();
        
        // Temple name
        const nameCell = row.insertCell();
        nameCell.textContent = temple.name;
        
        // Country
        const countryCell = row.insertCell();
        countryCell.textContent = temple.country || 'Unknown';
        
        // Missing information
        const missingCell = row.insertCell();
        const hasValidCoords = temple.lat && temple.lng && 
                              temple.lat !== "" && temple.lng !== "" && 
                              !isNaN(parseFloat(temple.lat)) && !isNaN(parseFloat(temple.lng)) &&
                              parseFloat(temple.lat) >= -90 && parseFloat(temple.lat) <= 90 &&
                              parseFloat(temple.lng) >= -180 && parseFloat(temple.lng) <= 180;
        
        const hasYear = temple.year !== null && temple.year !== undefined;
        
        let missingInfo = [];
        let missingClass = '';
        
        if (!hasValidCoords) {
            missingInfo.push('Location');
        }
        if (!hasYear) {
            missingInfo.push('Dedication Year');
        }
        
        if (missingInfo.length === 2) {
            missingClass = 'both';
        } else if (missingInfo.includes('Location')) {
            missingClass = 'location';
        } else {
            missingClass = 'year';
        }
        
        const missingSpan = document.createElement('span');
        missingSpan.className = `missing-info ${missingClass}`;
        missingSpan.textContent = missingInfo.join(' & ');
        missingCell.appendChild(missingSpan);
    });
}

// Initialize filter event listeners
function initializeFilterListeners() {
    const countryFilter = document.getElementById('country-filter');
    const typeFilter = document.getElementById('type-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    
    console.log('Initializing filter listeners - Country filter found:', !!countryFilter, 'Type filter found:', !!typeFilter, 'Clear button found:', !!clearFiltersBtn);
    
    if (countryFilter) {
        countryFilter.addEventListener('change', function() {
            console.log('Country filter changed to:', this.value);
            updateIncompleteTemplesTable();
        });
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            console.log('Type filter changed to:', this.value);
            updateIncompleteTemplesTable();
        });
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            console.log('Clear filters button clicked');
            if (countryFilter) countryFilter.value = '';
            if (typeFilter) typeFilter.value = '';
            updateIncompleteTemplesTable();
        });
    }
}

 
