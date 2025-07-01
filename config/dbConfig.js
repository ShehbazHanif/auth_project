const mongoose = require('mongoose');
const dbConfig = async()=>{
    try {
         await mongoose.connect("mongodb+srv://tahir:112233test@auctionplatform.veyca.mongodb.net/authProject",{
             useNewUrlParser: true, 
         useUnifiedTopology: true,
         })
    } catch (error) {
        
    }
};
module.exports = dbConfig;