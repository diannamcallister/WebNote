"use strict";


(function(global, document, $) { 

    var selected;
    var selectedHeight;
    var pageHeight;
    const spanClassName = "note";
    const innerSpanClassName = "hoveringNote";

    function nextToHighlight(e) {

        selected = document.getSelection();
        selectedHeight = e.pageY;
        pageHeight = document.documentElement.scrollHeight;
        if (selected.focusOffset !== selected.anchorOffset) {
            createHighlightOptions();
        }
    }

    function clickHandler(highlightColor, note) {
        let parent = selected.anchorNode.parentElement;
        
        let before;
        let after;

        // need to do this check to make sure that highlight starting left of word OR starting right of word both work correclty
        if (selected.focusOffset < selected.anchorOffset) {
            before = selected.focusOffset;
            after = selected.anchorOffset;
        } else {
            after = selected.focusOffset;
            before = selected.anchorOffset;
        }

        if (parent.tagName.toLowerCase() === 'span' && highlightColor === 'white') {
            // need to remove highlight from element
            removeHighlight(parent);
        } else if (parent.tagName.toLowerCase() === 'span' && highlightColor === "strikethrough") {
            // add a strikethrough to something that is already highlighted
            parent.style.textDecoration = "line-through";
        } else if (parent.childElementCount >= -1) {
            // a part of the parent element wants to be highlighted

            let spanElement = updateVisualOfText(highlightColor, note);
            
            let beforeTextNode = document.createTextNode(selected.baseNode.data.substring(0, before));
            let afterTextNode = document.createTextNode(selected.baseNode.data.substring(after, selected.baseNode.data.length));

            let trimmed = selected.baseNode.data.substring(before, after).replace(/(\s\s*\r\n|\n|\r)/gm, "");
            trimmed = trimmed.replace(/(\s\s*)/gm, " ");

            // need to make sure that a selection section is not in what is already highlighted.
            // if there is a highlighted section in the middle of what is selected, nothing will be highlighted
            if (selected.focusNode.parentNode.tagName.toLowerCase() !== 'span' && selected.toString() == trimmed) {
                // need to check if the selected element is the first child of the parent element.
                // if it is, then a specific action needs to be taken (in else)
                if (selected.anchorNode.previousSibling !== null) {
                    let curSibling = selected.anchorNode.previousSibling.nextSibling;

                    parent.replaceChild(spanElement, curSibling);
                    parent.insertBefore(beforeTextNode, spanElement);
                    parent.insertBefore(afterTextNode, spanElement.nextSibling);
                } else {
                    // we are choosing stuff from the first child of the parent
                    parent.insertBefore(afterTextNode, parent.childNodes[1]);
                    parent.replaceChild(spanElement, parent.childNodes[0]);
                    parent.insertBefore(beforeTextNode, spanElement);
                } 
            }
        }

        removeHighlightOptions();
    }

    function updateVisualOfText(highlightColor, note) {
        let highlightedText = selected.toString();
        // check if a space is right before was is highlighted. If it is, then 
        let spanElement = document.createElement("span");
        const textNode = document.createTextNode(highlightedText);
        spanElement.appendChild(textNode);
        if (highlightColor !== "strikethrough" && note === undefined) {
            // the text will get highlighted
            spanElement.style.backgroundColor = highlightColor;
        } else if (highlightColor === "strikethrough") {
            // the text will be striked out
            spanElement.style.textDecoration = "line-through";
        } else if (note !== undefined) {
            // a note will be added to the text
            let noteText = prompt("Add the text of the note here:");

            let innerSpanElement = document.createElement("span");
            const noteNode = document.createTextNode(noteText);
            innerSpanElement.appendChild(noteNode);
            spanElement.style.backgroundColor = highlightColor;
            innerSpanElement.className= "tooltiptext";
            spanElement.appendChild(innerSpanElement);
            spanElement.className += "tooltip";
        }
        return spanElement;
    }

    function createBookmark() {
        // calculate the % of the page where the text was highlighted
        const percentage = (selectedHeight / pageHeight) * 100;
        const newBookmark = document.createElement("div");
        newBookmark.id = "bookmark";
        // set the position of where the bookmark will be displayed, relative to the
        // height of the entire web page (NOT screen)
        newBookmark.style.top = percentage + "%";
        // be able to scroll back to the bookmarked position
        newBookmark.onclick = () => scrollTo(0, selectedHeight);

        document.body.appendChild(newBookmark);
        removeHighlightOptions();
    }

    function removeHighlight(parent) {
        let previousText;
        let nextText;
        if (selected.anchorNode.parentElement.previousElementSibling === null) {
            previousText = selected.anchorNode.parentElement.previousSibling.data;
        }
        if (selected.anchorNode.parentElement.nextElementSibling === null) {
            nextText = selected.anchorNode.parentElement.nextSibling.data;
        }
        if (previousText && nextText) {
            // the text surrounding the current highlighted text is not highlighted
            // combine all into one text node
            const allText = previousText + parent.innerHTML + nextText;
            const newTextNode = document.createTextNode(allText);
            parent.parentElement.replaceChild(newTextNode, parent.previousSibling);
            parent.parentElement.removeChild(parent.nextSibling);
            parent.parentElement.removeChild(parent);
        } else if (previousText) {
            // the text before the highlighted text is not highlighted
            const allText = previousText + parent.innerHTML;
            const newTextNode = document.createTextNode(allText);
            parent.parentElement.replaceChild(newTextNode, parent.previousSibling);
            parent.parentElement.removeChild(parent);
        } else if (nextText) {
            // the text after the highlighted text is not highlighted
            const allText = parent.innerHTML + nextText;
            const newTextNode = document.createTextNode(allText);
            parent.parentElement.removeChild(parent.nextSibling);
            parent.parentElement.replaceChild(newTextNode, parent);
        } else {
            // the text before & after the higlighted text is highlighted
            const unHighlightedText = parent.innerHTML;
            const newTextNode = document.createTextNode(unHighlightedText);
            parent.parentElement.replaceChild(newTextNode, parent);
        }
    }

    function createHighlightOptions() {
        const highlightDiv = document.getElementById("highlight");
        const selectedText = selected.toString();

        if (highlightDiv === null) {
            let outerDiv = document.createElement("div");
            let innerDiv = document.createElement("div");
            outerDiv.id = "highlight";
            innerDiv.id = "highlightOptions";

            let greenDiv = document.createElement("img");
            greenDiv.className = "dot";
            greenDiv.style.backgroundColor = "green"; 
            greenDiv.onclick = () => clickHandler("green");

            let pinkDiv = document.createElement("img");
            pinkDiv.className = "dot";
            pinkDiv.style.backgroundColor = "pink"; 
            pinkDiv.id = "pink";
            pinkDiv.onclick = () => clickHandler("pink");

            let orangeDiv = document.createElement("img");
            orangeDiv.className = "dot";
            orangeDiv.style.backgroundColor = "orange"; 
            orangeDiv.onclick = () => clickHandler("orange");

            let yellowDiv = document.createElement("img");
            yellowDiv.className = "dot";
            yellowDiv.style.backgroundColor = "yellow";
            yellowDiv.onclick = () => clickHandler("yellow");

            let noDiv = document.createElement("img");
            noDiv.className = "dot";
            noDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/no_highlight.png";
            noDiv.onclick = () => clickHandler("white");

            let strikedDiv = document.createElement("img");
            strikedDiv.className = "dot";
            strikedDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/strikethrough.png";
            strikedDiv.onclick = () => clickHandler("strikethrough");

            let noteDiv = document.createElement("img");
            noteDiv.className = "dot";
            noteDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/notepad.png";
            noteDiv.onclick = () => clickHandler("#eaeaea", "note");

            let bookmarkDiv = document.createElement("img");
            bookmarkDiv.className = "dot";
            bookmarkDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/bookmark.png";
            bookmarkDiv.onclick = createBookmark;

            let downloadDiv = document.createElement("img");
            downloadDiv.className = "dot";
            downloadDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/download.png";
            downloadDiv.onclick = saveData;

            let uploadDiv = document.createElement("input");
            uploadDiv.type = 'file';
            uploadDiv.id = "uploadFile";
            uploadDiv.onchange = loadData;

            let closeDiv = document.createElement("img");
            closeDiv.className = "dot";
            closeDiv.src = "https://webnote-lib.herokuapp.com/markup-bar-pics/close.png";
            closeDiv.onclick = removeHighlightOptions;

            innerDiv.appendChild(greenDiv);
            innerDiv.appendChild(pinkDiv);
            innerDiv.appendChild(orangeDiv);
            innerDiv.appendChild(yellowDiv);
            innerDiv.appendChild(noDiv);
            innerDiv.appendChild(strikedDiv);
            innerDiv.append(bookmarkDiv);
            innerDiv.appendChild(noteDiv);
            innerDiv.appendChild(closeDiv);
            innerDiv.appendChild(downloadDiv);
            innerDiv.appendChild(uploadDiv);
            
            outerDiv.appendChild(innerDiv);

            let anchored = selected.anchorNode.parentElement;
            while (anchored.tagName.toLowerCase() !== "p" && anchored.tagName.toLowerCase() !== "ol" && anchored.tagName.toLowerCase() !== "ul") {
                anchored = anchored.parentElement;
            }
            console.log(anchored);
            anchored.parentElement.insertBefore(outerDiv, anchored);
            // document.body.insertBefore(outerDiv, anchored);
        }
    }

    function removeHighlightOptions() {
        const outerDiv = document.getElementById("highlight");
        outerDiv.parentElement.removeChild(outerDiv);
        // document.body.removeChild(outerDiv);
    }

    function loadData() {
        let file = document.getElementById("uploadFile");
        let HTMLdiv = document.querySelector('html');

        var fr = new FileReader();
        fr.onload = function(e) {
            HTMLdiv.innerHTML = e.target.result;
        };
        fr.readAsText(file.files[0]);
    }

    function saveData(e, fileName) {
        removeHighlightOptions();
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        let data = document.getElementsByTagName("html")[0].innerHTML;
        let blob = new Blob([data], {type: "text/html"});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        if (fileName === undefined) {
            let downloadFile = prompt("What is the name of the file you want to save the html to?");
            a.download = downloadFile;
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            a.download = fileName;
            a.click();
        }
    };

    global.nextToHighlight = global.nextToHighlight || nextToHighlight
    global.loadData = global.loadData || loadData
    global.saveData = global.saveData || saveData

})(window, window.document, $);