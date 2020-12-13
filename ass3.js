const URL = 'http://api.nobelprize.org/v1/prize.json'
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
    let prize = doc.prizes
    let output = prize.filter(prize => prize.year >=2000 && prize.year <= 2019 && prize.category === 'chemistry')
    //console.log(output[0].laureates[0]['firstname'])
    let laureates = output.map(scholar =>  scholar.laureates).flat()
    for(item of laureates){
        console.log(item.firstname + ' '+ item.surname)
    }
}).catch(error => alert(error.message));