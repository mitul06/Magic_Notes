console.log("project 1");
showNotes();

// if user add a notes, so it into the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('noteAddTitle');

    function today(){
        let date = new Date();
        let dd = date.getDate();

        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        return `${dd} - ${mm} - ${yyyy}`
    };

    function time(){
        let date = new Date();
        let hh = date.getHours();

        let mm = date.getMinutes();
        let ss = date.getSeconds();
        if (mm < 10) {
           mm = '0' +mm;
        }

        if (hh < 10) {
            hh = '0' + hh;
        }

        if (ss < 10) {
            ss = '0' + ss;
        }

        return `${hh}h ${mm}m ${ss}s`
    };



    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        date: today(),
        time: time()
    };

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
});

// Function show your notes from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 15rem; border-radius: 0.7rem; border: 2px solid #ff5500;">
                    <div class="card-body">
                    <h5 class="card-title">Title: ${element.title}</h5>
                    <p>Date: ${element.date}</p>
                    <p>Time: ${element.time}</p>
                    <p class="card-text">Note: ${element.text}</p>
                    <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-danger" style="border-radius: 1.25rem; border: 2px solid #f5a422;">Delete Note</button>
                    </div>
                 </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<b>You have not add your Notes, Please "add to Note" than you will show your notes</b>`
    }
}

//  deleting a note from localStorage
function deleteNotes(index) {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// if user search button click so search function called
search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    let notesCards = document.getElementsByClassName('noteCard');

    Array.from(notesCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});