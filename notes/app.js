console.log('Starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};

const bodyOptions = {
	describe: 'Body of note',
	demand: true,
	alias: 'b'
}

var argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions, 
		body: bodyOptions
	})
	.command('read', 'Read a note', {
		title: titleOptions
	})
	.command('list', 'List all notes')
	.command('remove', 'Remove a note', {
		title: titleOptions
	})
	.argv;
var command = argv._[0];

// console.log('Process: ', process.argv);
// console.log('Yargs: ', argv)

if (command === 'add') {
	console.log('Adding new note');
	var note = notes.addNote(argv.title, argv.body);
	if (note === undefined) {
		console.log(`Note with title ${argv.title} already exists.`);
	} else {
		console.log('Note created.');
		notes.logNote(note);
	}
} else if (command === 'read') {
	console.log('Reading a note');
	var note = notes.getNote(argv.title);
	if (note) {
		console.log('Note found.');
		notes.logNote(note);
	} else {
		console.log(`Note with title ${argv.title} not found.`);
	}

} else if (command === 'list') {
	var notesList = notes.getAll();
	if (notesList.length == 0) {
		console.log('No notes to list.');
	} else {
		console.log(`Listing ${notesList.length} notes.`)
		notesList.forEach((note) => notes.logNote(note));
	}
} else if (command === 'remove') {
	console.log('Removing note');
	var res = notes.removeNote(argv.title);
	var message = res ? `Note with title ${argv.title} removed.` : `Note with title ${argv.title} not found.`
	console.log(message);
} else {
	console.log('Command not found');
}

// var user = os.userInfo();

// // ES6 template strings
// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}`, function(err) {
// 	if (err) {
// 		console.log(err);
// 	}
// });