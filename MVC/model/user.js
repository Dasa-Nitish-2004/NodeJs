
var mongoose = require('mongoose');


async function model(){
    
const mySchema = new mongoose.Schema({
    
        "id": {type: Number},
        "first_name": {type: String, required: true},
        "last_name": {type: String},
        "email": {type: String, required: true, unique: true},
        "gender": {type: String},
        "ip_address": {type: String},
        "flight_number": {type: String},
        "flight_code": {type: String},
        "flight_departure_code": {type: String},
        "flight_arrival_code": {type: String}

});
const MyModel = mongoose.model('customer_details', mySchema);
    // console.log(MyModel)        
return MyModel

}

module.exports = {model}