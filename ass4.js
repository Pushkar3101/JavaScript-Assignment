const URL = 'https://think.cs.vt.edu/corgis/datasets/json/airlines/airlines.json'
const fetch = require("node-fetch");

async function getUrl(URL) {
	let res = await fetch(URL);

	if (!res.ok) {
		throw new Error('error => ${res.status}');
	} 
	else {
		return await res.json();
	}
}
const docs = getUrl(URL)
docs.then((doc) =>{
    for(item of doc){
       let flight = item.Statistics.Flights;
       if(flight.Total == (flight.Cancelled + flight.Delayed + flight.Diverted + flight['On Time'])){
           console.log(item.Airport.Name + '  : VERIFIED !!!!! ');
	   }
	   else{
		   console.log(item.Airport.Name + '  : NOT  VERIFIED !!!!! ')
	   }
	   
	}
	return true;
    
}).catch(error => alert('Wrong Calculation !!!!'));