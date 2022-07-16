
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
    let restrictedArr = ['youtube.com', 'facebook.com', 'twitter.com'];
    //declare a constant and set it equal to the "restricted sites" at bottom of popup
    const restricted = document.querySelector('#restricted-sites');
    //set target element to the hidden element with the restricted websites
    const targetEl = document.querySelector('#restricted-page');
    //add eventlistener to toggle visibility of hidden element everytime "restricted sites" is clicked
    restricted.addEventListener('click', function() {
        if (targetEl.style.display === "flex") targetEl.style.display = "none";
        else targetEl.style.display = "flex"
    })

    const restricted_container = document.querySelector('#restrictedurl-container');
    for (const url of restrictedArr) {
        const urlDiv = createElement(restricted_container, url, 'div');
        urlDiv.setAttribute('class', 'restricted-div')
    }
    
    document.getElementById('blockform-div').addEventListener('submit', function(e) {
        e.preventDefault();
        const inputText = document.getElementById('blockform').value;
        if (inputText) {
            restrictedArr.push(inputText);
            const urlDiv = createElement(restricted_container, inputText, 'div');
            urlDiv.setAttribute('class', 'restricted-div');
            document.getElementById('blockform').value = null;
        }
        // alert(document.getElementById('blockform').value)
    });
})

