import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://branyoe:1003@cluster0.ijqta.mongodb.net/ssc?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: true,
    // useCreateIndex: true
})
.then(db => console.log('DB is connected'))
.catch(error => console.log(error))

