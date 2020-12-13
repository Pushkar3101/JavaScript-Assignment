const URL = 'https://api.github.com/search/repositories?q=node'

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

const docs = getUrl(URL);
docs.then((doc) => {
    var repos = doc.items
	var output1 = repos.filter(repo => repo.full_name == 'nodejs/node')[0]
    const owner = getUrl(output1.owner.url).then((data) => {return data});
	const branches = getUrl(output1.branches_url.split("{")[0]).then((data) => {return data});


	Promise.all([output1, owner, branches]).then(val => {
		let output1 = val[0]
		let owner = val[1]
		let branches = val[2]


		console.log({
				"name": output1.name,
				"full_name": output1.full_name,
				"private": output1.private,
				"owner": {
					"login": output1.owner.login,
					"name": owner.name,
					"followersCount": owner.followers,
					"followingCount": owner.following
				},
				"licenseName": output1.license.name,
				"score": output1.score,
				"numberOfBranch": branches.length
			})
	})	
})