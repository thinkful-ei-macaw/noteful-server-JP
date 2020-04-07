const path = require('path');
const express = require('express');
const folderService = require('./folders-service');

const folderRouter = express.Router();
const jsonParser = express.json();


folderRouter
  .route('/:id')
  .all((req, res, next) => {
    folderService.getByFolderId(
      req.app.get('db'),
      req.params.id
    )
      .then(folder => {
        if (!folder)
          return res.status(404).json({
            error: {
              message: 'Folder does not exist'
            }
          });
        else {
          res.status(201).json(folder);
        }
      })
      .catch(next);
  })

  .patch((req, res, next) => {
    const {
      title
    } = req.body;
    const folder = {
      title
    };
    if (!title) {
      return res.status(404).json({
        error: 'Must include title'
      });
    }
    folderService.updateFolder(
      req.app.get('db'),
      folder
    )
      .catch(next);
  })
  .delete((req, res, next) => {
    folderService.deleteFolder(
      req.app.get('db'),
      req.params.id
    )
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

folderRouter
  .route('/')
  .post((req, res, next) => {
    const {
      title
    } = req.body;
    const folder = {
      title
    };
    if (!title) {
      return res.status(404).json({
        error: {
          message: 'Must include title'
        }
      });
    }

    folderService.insertFolder(
      req.app.get('db'),

      folder)
      .then(folder => {
        res.json(folder);
      });
  });


module.exports = folderRouter;