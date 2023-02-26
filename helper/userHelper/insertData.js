const model = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

const user = async (data) => {
    try {
        const userData = model.user.create({
            name: data.name,
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            password: data.password,
            is_admin: data.is_admin,
          });
          return userData
    } catch (error) {
       console.log('Error: ', error.message); 
    }
  

};

module.exports = {
  user,
};
