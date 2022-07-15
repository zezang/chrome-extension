let restricted = ['youtube.com', 'facebook.com', ];

window.addEventListener('load', function() {
    restricted.forEach(url => {
        if (this.document.URL.includes(url)) {
            if (window.confirm("Do you really want to leave?")) this.location.href = 'https://www.google.com/'
            
            

            // Optional function to redirect or allow access to restricted page
            // if (window.confirm("Do you really want to leave?")) {
            //     window.open("exit.html", "Thanks for Visiting!");
            //   }

        }
    })
})