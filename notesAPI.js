const LOCAL_STORAGE_KEY = "noteapp-notes";
const SELECTED_ID = "selectedNoteId";

function saveNote(title, content, id = undefined) {
  const notes = getNotes();

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      date: new Date().getTime(),
    });
  } else {
    const indexOfNoteId = notes.findIndex((note) => note.id === id);

    if (indexOfNoteId > -1) {
      notes[indexOfNoteId] = {
        title,
        content,
        id,
        date: new Date().getTime(),
      };
    }
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
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
