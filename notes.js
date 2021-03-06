const fs = require('fs');
let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNote = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title,body) => {
    let notes = fetchNotes();
    let note = {
        title,
        body
    };

    let duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note;
    }
};

let getAll = () => {
    return fetchNotes();
};

let read = (title) => {
    let notes = fetchNotes();
    let note = notes.filter((note) => note.title === title);
    return note[0];
};

let remove = (title) => {
    let notes = fetchNotes();
    let removeNotes = notes.filter((note) => note.title !== title);
    saveNote(removeNotes);
    return notes.length !== removeNotes.length;

};

let logNote = (note) => {
    console.log('--------------------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    read,
    remove,
    logNote
};