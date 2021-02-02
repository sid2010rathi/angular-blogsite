const mongoose = require('mongoose');
const connString = 'mongodb+srv://finalproject:euyf0iSdIh21Ojin@cluster0.p5uz2.mongodb.net/blogDB?retryWrites=true&w=majority'

// mongoose.connect(connString);
mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

mongoose.connection.on('connected', function(){
    console.log('Connected!' +connString);
})
mongoose.connection.on('error', function(err){
    console.log('Connection Error: ' + err);
})
mongoose.connection.on('disconnected', function(){
    console.log('Disonnected!: ' +connString);
})

require('./index');