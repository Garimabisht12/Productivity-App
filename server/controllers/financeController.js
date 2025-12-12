const express = require('express');
const {Income, Expense}  = require('../models/Finance')


// routes for income

exports.getIncome = async(req, res) =>{
    
    const incomes = await Income.find({user: req.user });
    if (!incomes) return res.status(404).json({message: 'not found'});
    res.json(incomes)
}

exports.createIncome = async(req, res) =>{
    const {title, value} = req.body;
    const newIncome = new Income(
        {
            user: req.user, title, value
        }
    )
    await newIncome.save();
    res.status(201).json(newIncome)

};

exports.updateIncome = async(req, res) =>{
    const {id} = req.params;
    const {title, value} = req.body;
    const updatedIncome = await Income.findOneAndUpdate({_id: id, user: req.user},{
        title, value
    }, {new:true}
)

    await updatedIncome.save();
    if (!updatedIncome) return res.status(404).json({message: 'income rec not found'})
    res.json(updatedIncome)
}

exports.deleteIncome = async(req, res) =>{
    const {id} = req.params;
    const deleteIncome = await Income.findOneAndDelete({_id: id, user: req.user});

    if (!deleteIncome) return res.status(404).json({message: 'income not found'})
    res.json({message: 'deleted income'})
}




// routes for expense
exports.getExpenses = async(req, res) =>{
    
    const expenses = await Expense.find({user: req.user });
    if (!expenses) return res.status(404).json({message: 'not found'});
    res.json(expenses)
}

exports.createExpense = async(req, res) =>{
    const {title, value} = req.body;
    const newExp = new Expense(
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
    const updateExp = await Expense.findOneAndUpdate({_id: id, user: req.user},{
        title, value
    }, {new:true}
)

    await updateExp.save();
    if (!updateExp) return res.status(404).json({message: 'expense rec not found'})
    res.json(updateExp)
}

exports.deleteExpense = async(req, res) =>{
    const {id} = req.params;
    const deleteExp = await Expense.findOneAndDelete({_id: id, user: req.user});

    if (!deleteExp) return res.status(404).json({message: 'expense not found'})
    res.json({message: 'deleted exp'})
}


