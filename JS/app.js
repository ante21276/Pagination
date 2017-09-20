let students = document.getElementById("students-ul").children;
let page = document.getElementById("page");
let div = document.createElement("DIV");
div.className= "pagination";
let ul = document.createElement("UL");
let search_parent = document.getElementById("search-parent");
let message = document.createElement("p");
let func;

/********************************************
SET PAGINATION NUMBERS
*********************************************/
for(let i = 0; i < students.length; i++) {
  if(i % 10 === 0) {
    let li = document.createElement("LI");
    let a = document.createElement("a");
    a.href = "#";
    for(let m = 1; m < ul.children.length + 2; m++) {
      a.innerHTML = m;
    }
    page.appendChild(div).appendChild(ul).appendChild(li).appendChild(a)
  }
}

ul.children[0].children[0].className = "active"; //Set first page as active

for(let i = 10; i < students.length; i++) { //Display first 10 students
  students[i].style.display = "none";
}

/****************
ADD EVENT LISTENER
****************/

ul.addEventListener("click", function(e) { //When press pagination number to highlight only active
  ul.children[0].children[0].className = "";
  for(let i = 0; i < ul.children.length; i ++) {
    ul.children[i].children[0].className = "";
  }
  if(e.target.tagName === "A") {
    e.target.className = "active";
  };
  func = function () {
    if(parseInt(e.target.innerHTML) === 1) { //Display only 10 students of active pagination number
      for(let i = 0; i < students.length; i++) {
        if(i < 10) {
          students[i].style.display = "block";
        }
        else {
          students[i].style.display = "none";
        }
      }
    } else if (parseInt(e.target.innerHTML) > 1) {//Display only 10 students of active pagination number
        for(let i = 0; i < students.length; i++) {
          if(i >= (parseInt(e.target.innerHTML) - 1) * 10 && i < (parseInt(e.target.innerHTML) * 10)) {
            students[i].style.display = "block";
          } else {
            students[i].style.display = "none";
          }
        }
  } else {
    students[i].style.display = "none";
  }
}
func();
});

/****************
ADD SEARCH FIELD
****************/

let input = document.createElement("input");
input.id = "myInput";

let button_search = document.createElement("BUTTON");

button_search.setAttribute("onclick", "myFunction()");

let search_div = document.createElement("DIV");
search_div.className = "student-search";
button_search.innerHTML = "Search";
input.placeholder = "Search for students...";
search_parent.append(search_div);
search_div.appendChild(input);
search_div.appendChild(button_search);

/****************
SEARCH STUDENTS
****************/
function myFunction() {
    var filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toLowerCase();
    ul = document.getElementById("students-ul");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        if (a.innerHTML.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
            message.style.display = "none";
        } else if (a.innerHTML.toLowerCase().indexOf(filter) === -1) {
            li[i].style.display = "none";
            div.style.display = "none";
            page.appendChild(message);
            message.innerHTML = "There is no match in our database for searched student.";
        }
    }
}
