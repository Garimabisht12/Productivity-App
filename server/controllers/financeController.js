const express = require('express');
const Finance  = require('../models/Finance')

exports.getExpenses = async(req, res) =>{
    
    const expenses = await Finance.find({user: req.user });
    if (!expenses) return res.status(404).json({message: 'not found'});
    res.json(expenses)
}

exports.createExpense = async(req, res) =>{
    const {title, value} = req.body;
    const newExp = new Finance(
        {
            user: req.user, title, value
        }
    )
    await newExp.save();
    res.status(201).json(newExp)

};

exports.updateExpense = async(req, res) =>{
    const {id} = req.params;
    const {title, value} = req.body;
    const updateExp = await Finance.findOneAndUpdate({_id: id, user: req.user},{
        title, value
    }, {new:true}
)

    await updateExp.save();
    if (!updateExp) return res.status(404).json({message: 'finance rec not found'})
    res.json(updateExp)
}

exports.deleteExpense = async(req, res) =>{
    const {id} = req.params;
    const deleteExp = await Finance.findOneAndDelete({_id: id, user: req.user});

    if (!deleteExp) return res.status(404).json({message: 'finance not found'})
    res.json({message: 'deleted exp'})
}


