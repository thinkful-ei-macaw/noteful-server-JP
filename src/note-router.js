const path = require('path');
const express = require('express');

const notesRouter = express.Router();
const notesService = require('./notes-service');

// create note
notesRouter
  .route('/')
  .post((req, res, next) => {
    req.app.get('db');

    const fieldsRequired = ['name', 'content', 'folder_id'];
    for (let field in fieldsRequired) {
      if (!req.body[field]) {
        return res
          .status(400)
          .send(`'${field} is required`);
      }
    }
    const {
      id,
      title,
      content,
      folder_id,
      date
    } = req.body;

    const note = {
      title,
      content,
      folder_id
    };

    if (id) note.id = id;
    if (date) note.date = date;

    notesService.insertNote(
      note);
    req.app.get('db')
      .then(note => {
        return res.json(note);
      })
      .catch(next);
  });


// read notes, update notes, delete
notesRouter
  .get('/:id', (req, res, next) => {
    const {
      id
    } = req.params;
    const db = req.app.get('db');

    notesService.getById(db, id)
      .then(note => {
        if (note) {
          return res.status(200).json(note);
        } else {
          return res.status(400).send('Note not found');
        }
      })
      .catch(next);
  })
  .patch((req, res, next) => {
    const {
      id,
      title,
      content,
      date
    } = req.body;

    const noteToUpdate = {
      id,
      title,
      content,
      date
    };

    if (!title) {
      return res.status(404).json({error: 'must include title'});
    }

    if (!content) {
      return res.status(404).json({
        error: 'must include content'
      });
    }

    notesService.updateNote(req.app.get('db'),
      noteToUpdate)
      .then(noteToUpdate => {
        res.json(noteToUpdate);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    notesService.deleteNote(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });










module.exports = notesRouter;