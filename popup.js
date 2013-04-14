// Copyright (c) 2013 Mikhail Sannikov (atarity@gmail.com)
// Use of this source code is governed by a GNU GPL 3 license that can be
// found in http://www.gnu.org/licenses/gpl.html

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {                     
    var valueDiv = document.getElementById("value");
    //Get url of current tab. Use console.log(tabs[0]) for whole Object
    var keyName = localStorage.getItem(tabs[0].url);
    var wikiURL = "http://wiki.pixelkit.ru/_en/api.php?format=json&action=parse&prop=wikitext&page=" + keyName;
    console.log(wikiURL);
    //Add data from local storage to the popup page    
    valueDiv.appendChild(document.createTextNode(keyName));
    
    $.ajax({
        type: "GET",
        url: wikiURL,
        dataType: "json",
        success: function (data) {                           
            //If remote wikipage exists push it to container, else say Sorry
            if (data.parse != null) {
                var CScontent = data.parse.wikitext['*'].wiki2html();
                var CSCdiv = document.getElementById("CSCdiv");
                CSCdiv.innerHTML = CScontent;        
                console.log(CScontent);
            }
            else {
                console.log('catched!');
                var CSCdiv = document.getElementById("CSCdiv");
                CSCdiv.innerHTML = "<br /><nobr>Sorry, cheatsheet is missing!</nobr><br />";
            }
        }        
    })
});


