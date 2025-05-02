const notesListEL = document.querySelector(".note-list");
const saveButtonEl = document.querySelector(".save");
const titleInputEl = document.getElementById("title-input-id");
const noteInputEl = document.getElementById("note-content-id");

saveButtonEl.addEventListener("click", clickSaveButton);

function createNote() {
  const notes = getNotes();
  const sortedNotes = notes.sort((a, b) => b.date - a.date);
  let html = "";

  sortedNotes.forEach((note) => {
    html += `
    
          <div data-id="${note.id}" class="saved-notes selected">
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

  notesListEL.innerHTML = html;

  /*const wrapper = document.createElement("div");
  wrapper.id = "saved-notes-id";
  wrapper.classList.add("saved-notes");

  const titleNote = document.createElement("h2");
  titleNote.classList.add("title-saved-notes");

  const contentNote = document.createElement("p");
  contentNote.classList.add("content-saved-notes");

  const dateNote = document.createElement("span");
  dateNote.classList.add("date");

  const titleNoteText = document.createTextNode(currentNote.title);
  const contentNoteText = document.createTextNode(currentNote.content);
  const dateNoteText = document.createTextNode(currentNote.date);

  titleNote.appendChild(titleNoteText);
  contentNote.appendChild(contentNoteText);
  dateNote.appendChild(dateNoteText);

  wrapper.appendChild(titleNote);
  wrapper.appendChild(contentNote);
  wrapper.appendChild(dateNote);

  document.getElementById("notes-list-id").prepend(wrapper);

 */
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = noteInputEl.value;

  if (!title || !content) {
    alert("bitte Überschrift und Notiz eingeben");
    return;
  }

  saveNote(title, content);
  createNote();
}

createNote();
