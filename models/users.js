var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var schema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, default: 'client' },
    telephone: { type: String, default: null },
    card: {
        type: Object,
        default: {
            name: '',
            number: '',
            month: '',
            year: '',
            cvc: ''
        }
    },
    address: {
        type: Object,
        default: {
            country: '',
            region: '',
            city: '',
            zip: '',
            street: '',
            building: '',
            appartament: ''
        }
    },
});

schema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', schema);