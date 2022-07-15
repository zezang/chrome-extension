let restricted = ['youtube.com', 'facebook.com', ];

window.addEventListener('beforeunload', function() {
    restricted.forEach(url => {
        if (this.document.URL.includes(url)) {
            if (!window.confirm("Do you really want to go?")) this.location.href = 'https://www.google.com/'
            
            

            // Optional function to redirect or allow access to restricted page
            // if (window.confirm("Do you really want to leave?")) {
            //     window.open("exit.html", "Thanks for Visiting!");
            //   }

        }
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const restricted = document.querySelector('#restricted-sites');
    restricted.addEventListener('onclick', function() {
        chrome.browserAction.setPopup({popup: "restricted.html"})
    }) 
})