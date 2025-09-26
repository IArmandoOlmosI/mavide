
const bcrypt = require('bcrypt');
const saltRounds = 10;
const plainPassword = 'Admin1234';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log("Hash:", hash);
});