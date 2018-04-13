var weatherConditions = new XMLHttpRequest();

var cObj;
var channelSelector=0, currentIndex=0;

function loadABC(){
	channelSelector = 1;
	load(channelSelector);
	currentIndex = 0;
}

function loadGuardian(){
	channelSelector = 2;
	load(channelSelector);
	currentIndex = 0;
}

function loadNewsAU(){
	channelSelector = 3;
	load(channelSelector);
	currentIndex = 0;
}
function load(webSelector){
	switch (webSelector) {
		case 1:
			var weatherConditionURL = 'https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=424cd6178e2247349c6980f6cdf304f3';
			break;
		case 2:
			var weatherConditionURL = 'https://newsapi.org/v2/top-headlines?sources=the-guardian-au&apiKey=424cd6178e2247349c6980f6cdf304f3';
			break;

		case 3:
		default:
			var weatherConditionURL = 'https://newsapi.org/v2/top-headlines?sources=abc-news-au&apiKey=424cd6178e2247349c6980f6cdf304f3';	
			break;
	}
	
	weatherConditions.open('GET', weatherConditionURL, true);
	//
	console.log(weatherConditions);
	//
	weatherConditions.responseType = 'text';
	weatherConditions.send(null);

	//document.getElementById('city').value = '';
}

function loadNext(){
	currentIndex++;
	//console.log(currentIndex);
	load(channelSelector);
}
function loadBack(){
	currentIndex--;
	load(channelSelector);
}

loadABC(1);
// GET THE CONDITIONS
weatherConditions.onload = function() {
	console.log(weatherConditions);
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
		//console.log(cObj.response.error);
		/*      
        if(cObj.response.error) {
    		alert(cObj.response.error.description);
    		load();
        }  else {
	        document.getElementById('location').innerHTML = cObj.totalResults; 
	        document.getElementById('weather').innerHTML = cObj.articles[0].author; 
	        document.getElementById('temperature').innerHTML = cObj.articles[0].description; 
		}
		*/
		if( currentIndex >= cObj.totalResults)
			currentIndex = cObj.totalResults-1;
		else if(currentIndex < 0)
			currentIndex = 0;
			console.log("ee"+currentIndex);
		document.getElementById('NewsTitle').innerHTML = cObj.articles[currentIndex].title; 
	    document.getElementById('NewsDescription').innerHTML = cObj.articles[currentIndex].description; 
		document.getElementById('ImgSrc').src = cObj.articles[currentIndex].urlToImage;
		
		document.getElementById('currentPage').innerHTML = currentIndex+1;
		document.getElementById('totalPage').innerHTML = cObj.totalResults;
    } else {
    	alert(weatherConditions.status);
    }
}; //end function




