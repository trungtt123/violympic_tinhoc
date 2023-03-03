const mongoose = require('mongoose');

const DATABASE_URL = `mongodb+srv://crackertvn:trungtt123@cluster0.5wkqv.mongodb.net/violympic?retryWrites=true&w=majority`;

mongoose.connect(DATABASE_URL, {useUnifiedTopology: true,useNewUrlParser: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});