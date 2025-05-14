const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
const savedNotesList = document.querySelector('.saved-notes-list');
let notes = document.querySelectorAll(".input-box");

function getNotesArray() {
    // Parse notes from localStorage, fallback to empty array
    const notesHTML = localStorage.getItem("notes") || "";
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = notesHTML;
    const noteElements = tempDiv.querySelectorAll('.input-box');
    return Array.from(noteElements).map(el => el.innerText.replace(/\n+$/, '').trim()).filter(Boolean);
}

function renderSavedNotes() {
    const notesArr = getNotesArray();
    savedNotesList.innerHTML = '';
    notesArr.forEach((note, idx) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'saved-note-item';
        noteDiv.textContent = note.length > 40 ? note.slice(0, 40) + '...' : note;
        noteDiv.title = note;
        noteDiv.onclick = () => {
            // Scroll to the corresponding note in the main area
            const mainNotes = document.querySelectorAll('.input-box');
            if (mainNotes[idx]) mainNotes[idx].scrollIntoView({behavior: 'smooth', block: 'center'});
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
        e.target.parentElement.remove();
        updateStorage();
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