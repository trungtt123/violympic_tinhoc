const mongoose = require('mongoose');

const DATABASE_URL = `mongodb+srv://crackert:trungtt123@cluster0.sivdg.mongodb.net/app_violympic?retryWrites=true&w=majority`;

mongoose.connect(DATABASE_URL, {useUnifiedTopology: true,useNewUrlParser: true})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});