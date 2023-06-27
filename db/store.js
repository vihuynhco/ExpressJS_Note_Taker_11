const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
   

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNotes(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        // Add a unique id to the note using uuid package
        const newNote = { title, text, id: uuidv1() };
        // Get all notes, add the new note, write all the updated notes, return the newNote
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    removeNotes(id) {
        // Get all notes, remove the note with the given id, write the filtered notes
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store();