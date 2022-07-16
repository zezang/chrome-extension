
//listen for the event of a tab url changing
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  if (changeInfo.status == 'complete') setTimeout(() => {
    chrome.storage.sync.set({'status': 'active'})}, 1000);
  //get the banned websites array from chrome storage
  //Condition to check status (active/inactive)
  chrome.storage.sync.get('status', function(app){
    if (app['status'] === 'active') {
      chrome.storage.sync.get('restricted_Updated', function(banned) {
        //iterate through the array found at the restricted_Updated property
        for (const url of banned['restricted_Updated']) {
          //if the tab's current url includes any of the strings, then re-direct to google
          if (tab.url.includes(url)) {
            chrome.storage.sync.set({'currentBanned': tab.url})
            //Store current URL in chrome storage property (current ban)
            chrome.tabs.update({url: "redirect.html"})
          }
        }
      })
    }
  })
})






