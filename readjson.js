var data = require('./persons.json');

let lastInactiveIndex = -1;

for (var i = 0; i < data.length; i++) {
    if (!data[i].isActive) {
        lastInactiveIndex = i;
    }
}


for (var i=0; i<data.length; i++){
    if(!data[i].isActive){
    console.log()
    console.log("name: ",data[i].name, ", age:",data[i].age);
    if (i == lastInactiveIndex)
        console.log()
}  
}