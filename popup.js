chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {                 
    var titleDiv = document.getElementById("title");
    var valueDiv = document.getElementById("value");
    var keyName = localStorage.getItem(tabs[0].url);                                             //  get url of current tab. use console.log(tabs[0]) for whole Object
    
    titleDiv.appendChild(document.createTextNode(tabs[0].title));                                // add data from local storage to the popup page
    valueDiv.appendChild(document.createTextNode(keyName));
});

