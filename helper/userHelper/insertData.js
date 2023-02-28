const model = require("../../models/userModel");
const db = require("../../config/mongoose");

db();

const user = async (data) => {
    const isAdmin = 0;
    const isBlocked = 0;
    try {
        const userData = model.user.create({
            name: data.name,
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            password: data.password,
            isAdmin: isAdmin,
            isBlocked: isBlocked
          });
          return userData
    } catch (error) {
       console.log('Error: ', error.message); 
    }
  

};

module.exports = {
  user,
};
