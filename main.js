//select elements
const elements = document.querySelectorAll(".hoverAnimation");
const title = document.querySelector(".titleA");
const link = document.querySelector(".linkA");
const pTitle = document.querySelectorAll(".pTitle");
const background = document.querySelector(".containerBackgroundColor");
const userInput = document.querySelectorAll(".userInput");
const noteApp = document.querySelector(".noteApp");
const elementsContainer = document.querySelectorAll(".elementContainer");

//keep track of elements status
let noteStatus = false;

//add event listener to each element
for (let i = 0; i < elements.length; i++) {
  //change color on even number
  if ((i + 1) % 2 === 0) {
    elements[i].style.background = "#ecb40b";
  }

  //function to open text box
  const openElement = function () {
    if (!noteStatus) {
      //open note
      userInput[i].style.display = "block";
      elements[i].style.height = "400px";
      elements[i].style.backgroundColor = "#f1c951";
      elementsContainer[i].style.height = "400px";
      pTitle[i].textContent = "";
      title.style.filter = "blur(4px)";
      link.style.filter = "blur(4px)";

      //update notes status
      noteStatus = true;

      //close note when Enter pressed without shift key
      const closeElement = function (e) {
        //If user press ENTER and SHIFT go to next row
        if ((e.keyCode == 13 || e.keyCode == 27) && !e.shiftKey) {
          // prevent default behavior
          pTitle[i].textContent = userInput[i].value;
          userInput[i].style.display = "none";
          elementsContainer[i].style.height = "6em";
          elements[i].style.height = "6em";
          elements[i].style.backgroundColor = "#f1c951";
          title.style.filter = "none";
          link.style.filter = "none";

          if ((i + 1) % 2 === 0) {
            elements[i].style.background = "#ecb40b";
          }

          //update notes status
          noteStatus = false;

          e.preventDefault();

          if (userInput[i].value == "") {
            pTitle[i].textContent = "Add note . . .";
          }
        }
      };

      //add close event listener
      window.onclick = function (event) {
        if (event.target == noteApp) {
          pTitle[i].textContent = userInput[i].value;
          userInput[i].style.display = "none";
          elementsContainer[i].style.height = "6em";
          elements[i].style.height = "6em";
          elements[i].style.backgroundColor = "#f1c951";
          title.style.filter = "none";
          link.style.filter = "none";

          if ((i + 1) % 2 === 0) {
            elements[i].style.background = "#ecb40b";
          }

          //update notes status
          noteStatus = false;

          if (userInput[i].value == "") {
            pTitle[i].textContent = "Add note . . .";
          }
        }
      };

      //keyboard even listener
      window.addEventListener("keydown", (e) => {
        closeElement(e);
      });
    }
  };
  //add open event listener
  elements[i].addEventListener("click", openElement);

  //add close button
  const closeButtonTag = document.createElement("SPAN");
  closeButtonTag.classList.add("close_button");
  const textnode = document.createTextNode("");
  closeButtonTag.appendChild(textnode);
  elementsContainer[i].appendChild(closeButtonTag);
}

//close button event listener
const closeButton = document.querySelectorAll(".close_button");
for (let i = 0; i < closeButton.length; i++) {
  closeButton[i].addEventListener("click", () => {
    if (!noteStatus) {
      pTitle[i].textContent = "Add note . . .";
      userInput[i].value = "";
    } else {
      userInput[i].value = "";
    }
  });
}
