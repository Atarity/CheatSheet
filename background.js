// Copyright (c) 2013 Mikhail Sannikov (atarity@gmail.com)
// Use of this source code is governed by a GNU GPL 3 license that can be
// found in http://www.gnu.org/licenses/gpl.html

//localStorage.clear();

function checkForValidUrl(tabId, changeInfo, tab) {                         // Called when the url of a tab changes
  var url = tab.url;
  
  if (url !== undefined && changeInfo.status == "complete") {               // Prevent twice loading, check SO thread: http://goo.gl/fF0iS
      var siteList = new Array('ya.ru',
                               'google.ru',
                               'github.com',
                               'facebook.com',
                               'yandex.ru');  
      console.log(tab.url);                                                 
      
      function in_array(value, array) {                                     // Is URL part in array of legit?
        for (var i = 0; i < array.length; i++) {
                
            if(value.indexOf(siteList[i]) > -1) {                
                localStorage.setItem(tab.url, siteList[i]);                // Push URL to LocalStorage as a key and siteList name as a value
                return true;                
            }
        }
        return false;
      }
      
        if (in_array(tab.url, siteList)) {
            chrome.pageAction.show(tabId); 
            console.log("CheatSheet for this URL are available in DB");
        }
   }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);                        // Listen for any changes to the URL of any tab.