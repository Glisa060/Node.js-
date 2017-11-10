const notes = require('./notes.js');
const yargs = require('yargs');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all nodes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;

let command = process.argv[2];


// --------------------------------------------------------------------------------------------

if (command === 'add')
{
   let note = notes.addNote(argv.title, argv.body);
   if (note) {
       console.log('Note has been added!');
       notes.logNote(note);
   } else {
       console.log('Note not found!');
   }
}

else if (command === 'list')
{
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
}

else if (command === 'read')
{
   let note = notes.read(argv.title);
   if (note) {
       console.log('Note has been found!');
       notes.logNote(note);
   } else {
       console.log('Note not found!');
   }
}

else if (command === 'remove')
{
    let noteRemoved = notes.remove(argv.title);
    let message = noteRemoved ? 'Message has been removed!': 'Note not found!';
    console.log(message);
}

else
{
    console.log('Command not recognized!');
}





