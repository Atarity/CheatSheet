// Copyright (c) 2013 Mikhail Sannikov (atarity@gmail.com)
// Use of this source code is governed by a GNU GPL 3 license that can be
// found in http://www.gnu.org/licenses/gpl.html
var siteList = new Array('ya.ru',
                         'google.ru',
                         'mail.google.com',
                         'github.com',
                         'facebook.com',
                         'yandex.ru');
// Check all opened tabs at startup
localStorage.clear();
chrome.tabs.query({}, function (tabs) {
  var startTabs = new Array();
    for (var i = 0; i < tabs.length; i++) {
        startTabs[i] = tabs[i];
    }
    // Moved code inside the callback handler for async working
    for (var i = 0; i < startTabs.length; i++) {
        if (startTabs[i] != null) {          
          if (in_array(startTabs[i].url, siteList, startTabs[i])) {
            chrome.pageAction.show(startTabs[i].id);
          }
          //console.log(startTabs[i]);
        }
        else {
          console.log("Seems it's null in tab " + i);
        }
    }
});
// if localStorage entries does not exist set it to 0
if (localStorage.getItem('localStorage entries') === null) {                
    localStorage.setItem('localStorage entries', 0)
};
// Is URL part exist in array of legit? Please, move it localStorage
function in_array(value, array, tab) {                                     
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
};
// Called when the url of a tab changes
function checkForValidUrl(tabId, changeInfo, tab) {                         
  var url = tab.url;
  // Prevent twice loading, check SO thread: http://goo.gl/fF0iS
  if (url !== undefined && changeInfo.status == "complete") {   
        if (in_array(tab.url, siteList, tab)) {
            chrome.pageAction.show(tabId); 
            //console.log("CheatSheet for this URL are available in DB");
        }
   }
};
// Listen for any changes to the URL of any tab
chrome.tabs.onUpdated.addListener(checkForValidUrl);                        