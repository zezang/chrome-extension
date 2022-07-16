
//listen for the event of a tab url changing
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  //get the banned websites array from chrome storage
  chrome.storage.sync.get('restricted_Updated', function(banned) {
    //iterate through the array found at the restricted_Updated property
    for (const url of banned['restricted_Updated']) {
      //if the tab's current url includes any of the strings, then re-direct to google
      if (tab.url.includes(url)) {
        chrome.tabs.update({url: "redirect.html"})
      }
    }
  })
})






