const router = require('express').Router();
const store = require('../db/store');

// GET "/api/notes" responds with all notes from the database
router.get('/notes', (req, res) => {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});                                   

// POST "/api/notes" posts a new note to the database
router.post('/notes', (req, res) => {
    store
        .addNotes(req.body)
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

        
// DELETE "/api/notes" deletes a note from the database
router.delete('/notes/:id', (req, res) => {
    store
        .removeNotes(req.params.id)
        .then(() =>  res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
}
);

module.exports = router;