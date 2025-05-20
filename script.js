const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const savedNotesList = document.querySelector('.saved-notes-list');
const saveBtn = document.querySelector('.save-btn');
let notes = document.querySelectorAll(".input-box");
let editingSavedNoteIdx = null; // Track which saved note is being edited

function getNotesArray() {
    // Parse notes from localStorage, fallback to empty array
    const notesHTML = localStorage.getItem("notes") || "";
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notesHTML;
    const noteElements = tempDiv.querySelectorAll('.input-box');
    return Array.from(noteElements).map(el => el.innerText.replace(/\n+$/, '').trim()).filter(Boolean);
}

function getSavedNotesArray() {
    return JSON.parse(localStorage.getItem("savedNotes") || "[]");
}
function setSavedNotesArray(arr) {
    localStorage.setItem("savedNotes", JSON.stringify(arr));
}

function renderSavedNotes() {
    const notesArr = getSavedNotesArray();
    savedNotesList.innerHTML = '';
    notesArr.forEach((note, idx) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'saved-note-item';
        noteDiv.textContent = note.length > 40 ? note.slice(0, 40) + '...' : note;
        noteDiv.title = note;
        noteDiv.onclick = () => {
            openSavedNote(idx);
        };
        savedNotesList.appendChild(noteDiv);
    });
}

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes");
    renderSavedNotes();
}
showNotes();

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
    renderSavedNotes();
}

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.setAttribute("placeholder", "Write your note here...");
    img.src = "Trash.png";
    img.alt = "Delete";
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    updateStorage();
})

notesContainer.addEventListener("click", function(e){
    if(e.target.tagName == "IMG"){
        // Show confirmation popup before deleting
        const confirmDiv = document.createElement('div');
        confirmDiv.className = 'delete-confirm-popup';
        confirmDiv.style.position = 'fixed';
        confirmDiv.style.top = '50%';
        confirmDiv.style.left = '50%';
        confirmDiv.style.transform = 'translate(-50%, -50%)';
        confirmDiv.style.background = '#fff';
        confirmDiv.style.border = '1px solid #888';
        confirmDiv.style.borderRadius = '12px';
        confirmDiv.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
        confirmDiv.style.padding = '32px 28px 24px 28px';
        confirmDiv.style.zIndex = '1000';
        confirmDiv.style.textAlign = 'center';
        confirmDiv.style.minWidth = '280px';
        confirmDiv.innerHTML = `
            <div style="font-size:1.15rem;font-weight:500;margin-bottom:18px;">Are you sure you want to delete this note?</div>
            <div style="display:flex;gap:18px;justify-content:center;">
                <button class="confirm-yes" style="background:#e74c3c;color:#fff;border:none;padding:8px 22px;border-radius:6px;font-size:1rem;cursor:pointer;transition:background 0.2s;">Yes</button>
                <button class="confirm-no" style="background:#f1f1f1;color:#333;border:none;padding:8px 22px;border-radius:6px;font-size:1rem;cursor:pointer;transition:background 0.2s;">No</button>
            </div>
        `;
        document.body.appendChild(confirmDiv);
        // Disable background interaction
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.25)';
        overlay.style.zIndex = '999';
        document.body.appendChild(overlay);
        confirmDiv.querySelector('.confirm-yes').onclick = function() {
            e.target.parentElement.remove();
            document.body.removeChild(confirmDiv);
            document.body.removeChild(overlay);
            updateStorage();
        };
        confirmDiv.querySelector('.confirm-no').onclick = function() {
            document.body.removeChild(confirmDiv);
            document.body.removeChild(overlay);
        };
    }
    else if(e.target.tagName == "P"){
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

document.addEventListener("keydown", event =>{
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})

function saveFirstNote() {
    const firstNote = notesContainer.querySelector('.input-box');
    if (firstNote) {
        const noteText = firstNote.innerText.replace(/\n+$/, '').trim();
        if (noteText) {
            const savedArr = getSavedNotesArray();
            if (editingSavedNoteIdx !== null) {
                // Update existing saved note
                savedArr[editingSavedNoteIdx] = noteText;
            } else {
                // Add as new saved note
                savedArr.push(noteText);
            }
            setSavedNotesArray(savedArr);
        }
        firstNote.remove();
        editingSavedNoteIdx = null; // Reset after saving
        updateStorage();
    }
}

saveBtn.addEventListener('click', saveFirstNote);

function openSavedNote(idx) {
    const savedArr = getSavedNotesArray();
    if (savedArr[idx]) {
        // Replace all notes with the selected saved note for editing
        notesContainer.innerHTML = '';
        let inputBox = document.createElement("p");
        let img = document.createElement("img");
        inputBox.className = "input-box";
        inputBox.setAttribute("contenteditable", "true");
        inputBox.setAttribute("placeholder", "Write your note here...");
        inputBox.innerText = savedArr[idx];
        img.src = "Trash.png";
        img.alt = "Delete";
        inputBox.appendChild(img);
        notesContainer.appendChild(inputBox);
        editingSavedNoteIdx = idx; // Set the index being edited
        updateStorage();
    }
}