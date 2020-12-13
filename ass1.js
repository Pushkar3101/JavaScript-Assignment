const battles = require('./battles.json');

most_active = ['attacker_king','defender_king','region','name'];
var item;
var names ={}
for (item of most_active){
    let x = counting(battles, item )
    const maxVal = Object.keys(x).reduce((a, b) => x[a] > x[b] ? a : b);
    names[item] = maxVal;
}

let outcome= counting(battles, 'attacker_outcome')
let type = counting(battles, 'battle_type')
let min = getMin(battles)
let max = getMax(battles)
let avg = getAvg(battles)

function getMin(battles) {
    return battles.filter(({defender_size}) => defender_size !== null)
    .reduce((max, p) => p.defender_size < max ? p.defender_size : max, battles[0].defender_size);
  }
function getMax(battles) {
    return battles.reduce((max, p) => p.defender_size > max ? p.defender_size : max, battles[0].defender_size);
  }
function getAvg (battles){
    let battle;
    let avg =0;
    let count =0;
    for(battle of battles){
        if(battle.defender_size !== null)
        {
            avg = avg + battle.defender_size;
            count = count +1;
        }
    }
    avg = avg/count;
    return Math.round(avg);
}

function counting(battles, spec){
    let battle;
    var counts ={}
    for (battle of battles){
        var temp = battle[spec];
      //  console.log(temp)
        if(temp !== ''){
        counts[temp] = counts[temp] ? counts[temp] + 1 : 1;    
        }
}
return counts;
//console.log(counts)
}
console.log({
    'most_active':{
        'attacker_king' : names['attacker_king'],
        'defender_king' : names['defender_king'],
        'region' : names['region'],
        'name' : names['name']
    },
    'attacker_outcome': outcome,
    'battle_type':Object.keys(type), // unique battle types
    'defender_size':{
        'average' : avg,
        'min' : min,
        'max' : max
        }
    })

