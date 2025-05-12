const notesListEL = document.querySelector(".note-list");
const saveButtonEl = document.querySelector(".save");
const titleAndInputEl = document.querySelector(".main-content");
const titleInputEl = document.getElementById("title-input-id");
const noteInputEl = document.getElementById("note-content-id");
const addButtonEl = document.getElementById("add-note-id");
const deleteButtonEl = document.getElementById("delete-button");
const searchInputEl = document.getElementById("search-input");
const searchButtonEl = document.querySelector(".search-button");
const sidebarEL = document.querySelector(".sidebar");
const cancelButtonEl = document.querySelector(".quit");
const deleteAllButtonEl = document.querySelector(".delete-all");
const emptyEl = document.querySelector(".empty");

saveButtonEl.addEventListener("click", clickSaveButton);
addButtonEl.addEventListener("click", newNote);
deleteButtonEl.addEventListener("click", deleteNote);
searchButtonEl.addEventListener("click", searchNotes);
searchInputEl.addEventListener("keydown", searchNotes);
cancelButtonEl.addEventListener("click", cancelButton);
deleteAllButtonEl.addEventListener("click", deletAll);

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

function createNote(filteredInput = null) {
  const notes = filteredInput || getNotes();
  const sortedNotes = notes.sort((a, b) => b.date - a.date);
  let sidebar = "";

  sortedNotes.forEach((note) => {
    sidebar += `
    <div class="note-list">
          <div data-id="${note.id}" class="saved-notes">
            <h2 class="title-saved-notes">${escapeHtml(note.title)}</h2>
            <p class="content-saved-notes">
              ${escapeHtml(note.content)}
            </p>
            <span class="date"><em>${new Date(note.date).toLocaleString(
              "de-DE"
            )}</em></span>
          </div>
           </div>
    
    `;
  });

  notesListEL.innerHTML = sidebar;

  applyListeners();
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = noteInputEl.value;

  titleAndInputEl.style.display = "none";
  sidebarEL.style.display = "flex";

  if (!title || !content) {
    alert("bitte Überschrift und Notiz eingeben");
    return;
  }

  let currentId = undefined;
  const selectedNoteIdEl = document.querySelector(".selected");

  if (selectedNoteIdEl) {
    currentId = selectedNoteIdEl.getAttribute("data-id");
  }

  saveNote(title, content, Number(currentId));

  titleInputEl.value = "";
  noteInputEl.value = "";

  createNote();
  applyListeners();
  emptyEl.remove();
}

function selectNote(id) {
  switchSidebar();
  const notes = getNotes();

  const currentNote = notes.find((note) => note.id === parseInt(id));

  if (!currentNote) {
    return;
  }

  titleInputEl.value = currentNote.title;
  noteInputEl.value = currentNote.content;

  const selectedNoteEl = document.querySelector(
    `.saved-notes[data-id="${id}"]`
  );

  if (selectedNoteEl.classList.contains("selected")) return;

  removeSelectedNoteClass();
  selectedNoteEl.classList.add("selected");
}

function newNote() {
  titleInputEl.value = "";
  noteInputEl.value = "";
  removeSelectedNoteClass();
  switchSidebar();
}

function deleteNote() {
  const notes = getNotes();
  titleAndInputEl.style.display = "none";
  sidebarEL.style.display = "flex";

  const selectedNoteId = document.querySelector(".selected");

  if (!selectedNoteId) {
    alert("du hast keine Notiz ausgewählt");
  }
  const selectedNote = Number(selectedNoteId.getAttribute("data-id"));
  const updateNotes = notes.filter((note) => note.id !== selectedNote);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateNotes));

  selectedNoteId.remove();
  titleInputEl.value = "";
  noteInputEl.value = "";
  updateEmptyNotes();
}

function removeSelectedNoteClass() {
  const noteEntriesEls = document.querySelectorAll(".saved-notes");
  noteEntriesEls.forEach((noteEntry) => {
    noteEntry.classList.remove("selected");
  });
}

function searchNotes() {
  const notes = getNotes();

  const userInput = searchInputEl.value.toLowerCase();
  const filteredInput = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(userInput) ||
      note.title.toLowerCase().includes(userInput)
  );

  createNote(filteredInput);
}

function cancelButton() {
  titleAndInputEl.style.display = "none";
  sidebarEL.style.display = "flex";
  removeSelectedNoteClass();
}

function switchSidebar() {
  sidebarEL.style.display = "none";
  titleAndInputEl.style.display = "block";
}

function deletAll() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  const savedNotes = document.querySelectorAll(".saved-notes");
  savedNotes.forEach((notes) => notes.remove());

  titleInputEl.value = "";
  noteInputEl.value = "";
  updateEmptyNotes();
}

function updateEmptyNotes() {
  const notesAfterDelte = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!notesAfterDelte || notesAfterDelte.length === 0) {
    document.querySelector(".sidebar").appendChild(emptyEl);
  }
}
