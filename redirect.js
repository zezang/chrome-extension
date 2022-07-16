document.addEventListener('DOMContentLoaded', () => {
    const goBack = document.querySelector('#go-back');
    goBack.addEventListener('click', function(){
        history.go(-2);
    })

    //click functionality to move user to banned site
    const goAhead = document.querySelector('#go-ahead');
    goAhead.addEventListener('click', function(){
        //Toggle inactive //Redirect //Toggle active
        chrome.storage.sync.get('status', function(app){
            chrome.storage.sync.set({'status': 'inactive'});
            app['status'] = 'inactive'
            console.log(app['status']);
            chrome.storage.sync.get('currentBanned', function(bannedURL){
                chrome.tabs.update({url: bannedURL['currentBanned']});
            })
        })
    })

})

