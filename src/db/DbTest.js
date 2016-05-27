var Datastore = require("nedb"), 
    db = new Datastore({filename: "./proja.db", autoload: true});
 var faker = require("faker");

for(var i=1; i<=50; i++){
	var dummy = new Object();
	dummy.patientId = i;
	dummy.patientName = faker.name.findName();
	dummy.creationDate = faker.date.past();
	dummy.lastUpdateDate = faker.date.recent();
    dummy.treatments = [];
    for(var j=1; j<=5; j++){
        var treatment = new Object();
        treatment.treatmentId = j;
        treatment.date = faker.date.past();
        treatment.time = Math.abs(Math.random() * 100);
        treatment.voltage = Math.random();
        treatment.rpm = Math.abs(Math.random() * 1000);
        dummy.treatments.push(treatment);
    }
    db.insert(dummy, function(err, newDoc){
        if(err){console.log(err)}else{console.log(newDoc)}
    })
};

db.find({}, function(err,doc){
    console.log(doc);
})
