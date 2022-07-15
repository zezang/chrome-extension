
// chrome.runtime.onInstalled.addListener(details => {
//     const blocked = ['youtube.com', 'facebook.com', 'twitter.com']
//     blocked.forEach((domain, index) => {
//         let id = index + 1;
//         chrome.declarativeNetRequest.updateDynamicRules(
//            {addRules:[{
//               "id": id,
//               "priority": 1,
//               "action": {
//                 "type": "redirect",
//                 "redirect": {"transform": { "scheme": "https", "host": "google.com" }
//              }
//             },
//               "condition": {
//                 "urlFilter": domain, 
//                 "resourceTypes": ["main_frame"] 
//             }}],
//             removeRuleIds: [id]
//            },
//         )
//     })
// })

chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
      'id': 1001,
      'priority': 1,
      'action': {
        'type': 'redirect',
        'redirect': {
          url: 'https://www.facebook.com'
        }
      },
      'condition': {
        'urlFilter': 'https://www.twitter.com',
        'resourceTypes': [
          'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
          'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
        ]
      }
    }],
   removeRuleIds: [1001]
  })


