function ScriptCombine(jsfiles) {
    var src = document.createElement("script");
    src.setAttribute("type", "text/javascript");
    src.setAttribute("src", jsfiles);
    document.getElementsByTagName("head")[0].appendChild(src);
}
ScriptCombine("/js/Common/Menu.js");
ScriptCombine("/js/Common/common.js");
ScriptCombine("/js/Common/Modal.js");