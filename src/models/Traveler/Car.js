import mongoose from 'mongoose'

const Car = new mongoose.Schema({
    brend: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    license: {
        type: String,
        require: true
    },
})

export default mongoose.model(car, 'Car')