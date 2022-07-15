let restricted = ['youtube.com', 'facebook.com', ];

window.addEventListener('load', function() {
    //iterate through the restricted array, and check if the webpage the user is about to access contains any of the restricted urls
    restricted.forEach(url => {
        //if it does, then open a dialogue box asking if they want to proceed
        if (this.document.URL.includes(url)) {
            if (!window.confirm("Do you really want to go?")) this.location.href = 'https://www.google.com/'
        }
    })
})
