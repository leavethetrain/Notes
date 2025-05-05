const LOCAL_STORAGE_KEY = "noteapp-notes";
const SELECTED_ID = "selectedNoteId";

function saveNote(title, content, id = undefined) {
  const notes = getNotes();

  if (id) {
    const updateNotes = notes.map((note) => {
      if (note.id === parseInt(id)) {
        return {
          ...note,
          title,
          content,
          date: new Date().getTime(),
        };
      }

      return note;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateNotes));
  } else {
    const getNextNote = getNextId(notes);

    const newNote = {
      title,
      content,
      id: getNextNote,
      date: new Date().getTime(),
    };

    notes.push(newNote);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }
}

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((a, b) => a.id - b.id);
  console.log(sortedNotes);
  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }
  return nextId;
}
