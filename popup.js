chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {                 
    var titleDiv = document.getElementById("title");
    var valueDiv = document.getElementById("value");
    //Get url of current tab. Use console.log(tabs[0]) for whole Object
    var keyName = localStorage.getItem(tabs[0].url);                                             
    //Add data from local storage to the popup page
    titleDiv.appendChild(document.createTextNode(tabs[0].title));                                
    valueDiv.appendChild(document.createTextNode(keyName));
});

