// Copyright (c) 2013 Mikhail Sannikov (atarity@gmail.com)
// Use of this source code is governed by a GNU GPL 3 license that can be
// found in http://www.gnu.org/licenses/gpl.html

// if localStorage entries does not exist set it to 0
if (localStorage.getItem('localStorage entries') === null) {                
    localStorage.setItem('localStorage entries', 0)
};

// Called when the url of a tab changes
function checkForValidUrl(tabId, changeInfo, tab) {                         
  var url = tab.url;
  
  // Prevent twice loading, check SO thread: http://goo.gl/fF0iS
  if (url !== undefined && changeInfo.status == "complete") {               
      var siteList = new Array('ya.ru',
                               'google.ru',
                               'mail.google.com',
                               'github.com',
                               'facebook.com',
                               'yandex.ru');  
      //console.log(tab.url);                                                 
      
      // Is URL part in array of legit?
      function in_array(value, array) {                                     
        for (var i = 0; i < array.length; i++) {
                
            if(value.indexOf(siteList[i]) > -1) {                
                var localIndex = parseInt(localStorage.getItem('localStorage entries'));
                
                if (localIndex < 5) {
                    if (localStorage.getItem(tab.url) === null) {
                        localIndex = localIndex + 1;
                        localStorage.setItem('localStorage entries', localIndex);                    
                    }
                    // Push URL to LocalStorage as a key and siteList name as a value
                    localStorage.setItem(tab.url, siteList[i]);                         
                    return true;                
                } else {                    
                    localStorage.setItem(tab.url, siteList[i]);                         
                    localStorage.setItem('localStorage entries', localIndex);
                    return true;                
                }
            }
        }
        return false;
      }
      
        if (in_array(tab.url, siteList)) {
            chrome.pageAction.show(tabId); 
            //console.log("CheatSheet for this URL are available in DB");
        }
   }
};
// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(checkForValidUrl);                        