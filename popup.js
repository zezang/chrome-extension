
//Helper function to append elements to DOM
//takes in parent element, contents (text INNERHTML of the element created, and type i.e div, span, img etc)
function createElement(parent, contents, type) {
    //declare variable and set it equal to a new element of input type
    const element = document.createElement(type);
    //set the element's innerHTML to the contents input and append it to the parent element input
    element.innerHTML = contents;
    parent.appendChild(element);
    return element;
  }


document.addEventListener('DOMContentLoaded', () => {
    //declare a constant and set it equal to the "restricted sites" at bottom of popup
    const restricted = document.querySelector('#restricted-sites');
    //set target element to the hidden element with the restricted websites
    const targetEl = document.querySelector('#restricted-page');
    restricted.addEventListener('click', function() {
        if (targetEl.style.display === "none") targetEl.style.display = "block";
        else targetEl.style.display = "none"
    }) 
})
