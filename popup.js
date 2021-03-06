
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
    chrome.storage.sync.set({'restricted_Original': restrictedArr});
    chrome.storage.sync.set({'status': 'active'});
    // let restrictedArr = ['youtube.com', 'facebook.com', 'twitter.com'];
    //declare a constant and set it equal to the "restricted sites" at bottom of popup
    const restricted = document.querySelector('#restricted-sites');
    //set target element to the hidden element with the restricted websites
    const targetEl = document.querySelector('#restricted-page');
    //add eventlistener to toggle visibility of hidden element everytime "restricted sites" is clicked
    restricted.addEventListener('click', function() {
        if (targetEl.style.display === "flex") targetEl.style.display = "none";
        else targetEl.style.display = "flex"
    })

    //first query the parent restricted container we will append our urls to on the DOM
    const restricted_container = document.querySelector('#restrictedurl-container');
    //use chrome.storage.sync to get the stored array of all banned urls
    chrome.storage.sync.get('restricted_Updated', function(arr) {
        console.log(arr['restricted_Updated'])
        //of the restricted_Updated property does not exists, call get on the original array and clone it to the updated array
        if (!arr['restricted_Updated']) {
            chrome.storage.sync.get('restricted_Original', function(arr) {
                //iterate through the original array and create divs for url and icon
                for (const url of arr['restricted_Original']) {
                    //add parent div to which child div with url and minus icon will be added
                    const urlContainer = createElement(restricted_container, '', 'div');
                    urlContainer.setAttribute('class', 'banned-container')
                    //div for the url
                    const urlDiv = createElement(urlContainer, url, 'div');
                    urlDiv.setAttribute('class', 'restricted-div');
                    //add minus button in case user wants to remove it from restricted
                    const minus = createElement(urlContainer, '', 'button');
                    minus.setAttribute('class', 'remove-icon');
                    //event listener for when the icon is clicked
                    minus.addEventListener('click', function(){
                        //set a variable equal to the sibling's innerHTML (contains the url)
                        const unbanned = this.previousElementSibling.innerHTML
                        //remove the parent element
                        this.parentElement.remove();
                        //get the restricted_updated array
                        chrome.storage.sync.get('restricted_Updated', function(arr) {
                            //get the index at which the url is at and splice it out of the array
                            const idx = arr['restricted_Updated'].indexOf(unbanned);
                            chrome.storage.sync.set({'restricted_Updated': arr['restricted_Updated'].splice(idx, 1)});
                            // alert(unbanned);
                            // console.log(arr['restricted_Updated']);
                            return;
                        })
                    })
                }
                chrome.storage.sync.set({'restricted_Updated': restrictedArr});
            })
            return;
        }
        //otherwise, iterate through the updated array and set up the divs
        else {
            for (const url of arr['restricted_Updated']) {
                const urlContainer = createElement(restricted_container, '', 'div');
                urlContainer.setAttribute('class', 'banned-container')
                const urlDiv = createElement(urlContainer, url, 'div');
                urlDiv.setAttribute('class', 'restricted-div');
                const minus = createElement(urlContainer, '-', 'button');
                minus.setAttribute('class', 'remove-icon');
                minus.addEventListener('click', function(){
                    //set a variable equal to the sibling's innerHTML (contains the url)
                    const unbanned = this.previousElementSibling.innerHTML
                    //remove the parent element
                    this.parentElement.remove();
                    //get the restricted_updated array
                    chrome.storage.sync.get('restricted_Updated', function(arr) {
                        //get the index at which the url is at and splice it out of the array
                        const idx = arr['restricted_Updated'].indexOf(unbanned);
                        arr['restricted_Updated'].splice(idx, 1)
                        chrome.storage.sync.set({'restricted_Updated': arr['restricted_Updated']});
                        // alert(unbanned);
                        // console.log(arr['restricted_Updated']);
                    })
                })
            }
        }
    });
    //add event listener to the input form
    document.getElementById('blockform-div').addEventListener('submit', function(e) {
        //prevent page reload
        e.preventDefault();
        //get the value of the input form, if it's not empty then push the new url into the array
        //create a new div container with the url as the innerHTML
        //update the chrome storage
        const inputText = document.getElementById('blockform').value;
        if (inputText) {
            const urlContainer = createElement(restricted_container, '', 'div');
            urlContainer.setAttribute('class', 'banned-container')
            const urlDiv = createElement(urlContainer, inputText, 'div');
            urlDiv.setAttribute('class', 'restricted-div');
            const minus = createElement(urlContainer, '-', 'button');
            minus.setAttribute('class', 'remove-icon');
            minus.addEventListener('click', function(){
                //set a variable equal to the sibling's innerHTML (contains the url)
                const unbanned = this.previousElementSibling.innerHTML
                //remove the parent element
                this.parentElement.remove();
                //get the restricted_updated array
                chrome.storage.sync.get('restricted_Updated', function(arr) {
                    //get the index at which the url is at and splice it out of the array
                    const idx = arr['restricted_Updated'].indexOf(unbanned);
                    arr['restricted_Updated'].splice(idx, 1)
                    chrome.storage.sync.set({'restricted_Updated': arr['restricted_Updated']});
                    // alert(unbanned);
                    // console.log(arr['restricted_Updated']);
                })
            })
            //get the storage property of restricted_Updated, and set it with the inputText added
            chrome.storage.sync.get('restricted_Updated', function(arr){
                chrome.storage.sync.set({'restricted_Updated': [...arr['restricted_Updated'], inputText]})
                console.log(arr['restricted_Updated']);
            })
            document.getElementById('blockform').value = null;
        }
    });
})

