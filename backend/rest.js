const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ListEntryModel = require('./entry-schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb+srv://kotapka32:kotapka32@cluster0.oksdvse.mongodb.net/listdb?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch(() => {
        console.log('Error connecting to MongoDB');
    })

app.use(bodyParser.json());
app.use(cors())

app.post('/add-entry', (req,res) => {
    const listEntry = new ListEntryModel({date: req.body.date,  entry: req.body.entry});
    listEntry.save();
    res.status(200).json({
        message: 'Post submitted'
    })
})

app.put('/update-entry/:id', (req,res) => {
    const updatedEntry = new ListEntryModel({_id: req.body.id, date: req.body.date, entry: req.body.entry})
    ListEntryModel.updateOne({_id: req.body.id}, updatedEntry)
        .then(() => {
            res.status(200).json({
                message: 'Update completed' 
            })
        })
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})

app.delete('/remove-entry/:id', (req, res) =>   {
    ListEntryModel.deleteOne({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: 'Post Deleted'
        })
    })
})

app.get('/list-entries',(req, res, next) => {
    ListEntryModel.find()
    .then((data) => {
        res.json({'listEntries': data});
    }).catch(() => {
        console.log('Error fetching entries')
    })
})


module.exports = app; 