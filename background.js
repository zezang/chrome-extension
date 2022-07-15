const blocked = ['youtube.com', 'facebook.com', 'twitter.com']

blocked.forEach((domain, index) => {
    let id = index + 1;
    chrome.declarativeNetRequest.updateDynamicRules(
       {addRules:[{
          "id": id,
          "priority": 1,
          "action": {
            "type": "redirect",
            "redirect": {"transform": { "scheme": "https", "host": "google.com" }
         }
        },
          "condition": {
            "urlFilter": domain, 
            "resourceTypes": ["main_frame"] 
        }}],
         removeRuleIds: [id]
       },
    )
})


