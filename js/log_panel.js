// UTF8 without BOM

/*
    LOG
*/

// settings vars and functions
var log =
{
    db: {},
};

// local strings to translate
var lng_local_dic =
[
    { en:"Clear LOG", ru:"Очистить LOG" }
];

// add local strings to translate to the global translate list
if ( !lng ) lng = {};
if ( !lng.dic ) lng.dic = [];
lng.dic = lng.dic.concat(lng_local_dic);




// have we a localStorage?
if ( window.localStorage ) log.db = window.localStorage;




// add a new log message to the top
log.add = function ( msg, color )
{
    if ( !msg ) return;

    var t       = new Date(),
        block   = document.createElement("div"),
        time    = document.createElement("span"),
        text    = document.createElement("span"),
        panel   = document.querySelector("#log_panel");

    time.innerHTML = t.toLocaleDateString() + ", " + t.toLocaleTimeString() + ": ";
    text.innerHTML = msg.replace(/\&/gm,"&amp;").replace(/\</gm,"&lt;").replace(/\>/gm,"&gt;")
                        .replace(/[\r\n]+/gm, "<br />");

    block.className = "msg";
    time.className = "time";
    text.className = "text";
    if ( color ) text.style.color = color;

    block.appendChild(time);
    block.appendChild(text);

    if ( panel.children.length <= 0 ) {
        panel.appendChild(block);
    } else {
        panel.insertBefore( block, panel.children[0] );
    }

    panel.scrollTop = 0;
}

// remove all log messages
log.clear = function()
{
    var panel = document.querySelector("#log_panel"),
        list = panel.querySelectorAll(".msg");

    for ( var c = list.length - 1; c >= 0; c-- ) panel.removeChild( list[c] );
}




// do it when window is fully loaded
log.js_init = function()
{
    console.log("log.js_init()");

    document.querySelector("#log_panel > .clear").addEventListener( "click", log.clear );
}




window.addEventListener( "DOMContentLoaded", log.js_init );
