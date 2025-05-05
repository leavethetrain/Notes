const notesListEL = document.querySelector(".note-list");
const saveButtonEl = document.querySelector(".save");
const titleInputEl = document.getElementById("title-input-id");
const noteInputEl = document.getElementById("note-content-id");
const addButtonEl = document.getElementById("add-note-id");
const deleteButtonEl = document.getElementById("delete-button");

saveButtonEl.addEventListener("click", clickSaveButton);
addButtonEl.addEventListener("click", newNote);
deleteButtonEl.addEventListener("click", deleteNote);

createNote();
applyListeners();

function applyListeners() {
  const noteEntryEl = document.querySelectorAll(".saved-notes");

  noteEntryEl.forEach((noteEntry) => {
    noteEntry.addEventListener("click", () =>
      selectNote(noteEntry.getAttribute("data-id"))
    );
  });
}

function createNote() {
  const notes = getNotes();
  const sortedNotes = notes.sort((a, b) => b.date - a.date);
  let sidebar = "";

  sortedNotes.forEach((note) => {
    sidebar += `
    
          <div data-id="${note.id}" class="saved-notes">
            <h2 class="title-saved-notes">${note.title}</h2>
            <p class="content-saved-notes">
              ${note.content}
            </p>
            <span class="date"><em>${new Date(note.date).toLocaleString(
              "de-DE"
            )}</em></span>
          </div>
    
    `;
  });

  notesListEL.innerHTML = sidebar;
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = noteInputEl.value;

  if (!title || !content) {
    alert("bitte Überschrift und Notiz eingeben");
    return;
  }
  const notes = getNotes();
  const selectedNoteId = localStorage.getItem(SELECTED_ID);

  if (selectedNoteId) {
    const updatedNotes = notes.map((note) => {
      if (note.id === parseInt(selectedNoteId)) {
        return {
          ...note,
          title,
          content,
          date: new Date().getTime(),
        };
      }
      return note;
    });

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
    localStorage.removeItem(SELECTED_ID);
  } else {
    notes.push({
      id: getNextId(),
      title,
      content,
      date: new Date().getTime(),
    });
    localStorage.setItem("noteapp-notes", JSON.stringify(notes));
  }

  titleInputEl.value = "";
  noteInputEl.value = "";

  createNote();
  applyListeners();
}

function selectNote(id) {
  const notes = getNotes();
  const currentNote = notes.find((note) => note.id === parseInt(id));

  if (!currentNote) {
    return;
  }

  titleInputEl.value = currentNote.title;
  noteInputEl.value = currentNote.content;

  localStorage.setItem(SELECTED_ID, currentNote.id);

  const selectedNoteEl = document.querySelector(
    `.saved-notes[data-id="${id}"]`
  );
  if (selectedNoteEl.classList.contains("selected")) return;

  const noteEntriesEls = document.querySelectorAll(".saved-notes");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected");
  });

  selectedNoteEl.classList.add("selected");
}

function newNote() {
  titleInputEl.value = "";
  noteInputEl.value = "";

  localStorage.removeItem(SELECTED_ID);
}

function deleteNote() {}
