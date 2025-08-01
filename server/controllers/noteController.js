const Note = require('../models/Notes');

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ user: req.user, title, content });
  await note.save();
  res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: id, user: req.user },
    { title, content },
    { new: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const deleted = await Note.findOneAndDelete({ _id: id, user: req.user });
  if (!deleted) return res.status(404).json({ message: 'Note not found' });
  res.json({ message: 'Note deleted' });
};
