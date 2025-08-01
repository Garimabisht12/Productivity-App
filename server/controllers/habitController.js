const Habit = require('../models/Habits');


exports.getHabits = async (req, res) =>{
    const habits = await Habit.find({user: req.user});
    res.json(habits);
}

exports.createHabit = async(req, res) =>{
    const {title, type, entries} = req.body;
    const habit = new Habit({user: req.user, title, type, entries})
    await habit.save();
    res.status(201).json(habit)
}

exports.updateHabit = async(req, res) =>{
    const {id} = req.params;
    const {title, type, entries} = req.body;
    const habit = await Habit.findOneAndUpdate(
        {_id: id, user: req.user},
        {title, type, entries},
        {new:true}

    );
    if(!habit) return res.status(404).json({message: 'habit not found'});
    res.json(habit);
}

exports.deleteHabit = async(req, res) =>{
    const {id} = req.params;
    const deleted = await Habit.findOneAndDelete({_id: id, user: req.user});
    if (!deleted) return res.status(404).json({message: "Habit not found"});
    res.json({message: 'habit deleted'})
}