const LOCAL_STORAGE_KEY = "noteapp-notes";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content) {
  const notes = getNotes();

  notes.push({
    title,
    content,
    id: "Hallo",
    date: new Date().getTime(),
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
