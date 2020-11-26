
var element = document.getElementById('textstuff'); 
// var newElement = document.getElementById('test'); 
element.addEventListener('click', nextToHighlight);
// newElement.addEventListener('click', nextToHighlight);

function test() {
    console.log("clicked on picture!");
}

var selected;

function nextToHighlight(e) {
    selected = document.getSelection();
    // clickHandler(e);
}

function clickHandler(highlightColor, note) {
    // console.log(e.clientX); -> for box
    // console.log(e.clientY);
    // console.log(e.pageY); -> for bookmark positioning
    console.log(selected);
    let parent = selected.anchorNode.parentElement;
    
    let before;
    let after;

    // need to do this check to make sure that highlight starting left of word OR starting right of word both work correclty
    if (document.getSelection().focusOffset < document.getSelection().anchorOffset) {
        before = selected.focusOffset;
        after = selected.anchorOffset;
    } else {
        after = selected.focusOffset;
        before = selected.anchorOffset;
    }

    // a part of the parent element has been highlighted
    if (parent.childElementCount >= 1) {
        console.log("if");

        let highlightedText = selected.toString();
        // check if a space is right before was is highlighted. If it is, then 
        let spanElement = document.createElement("span");
        const textNode = document.createTextNode(highlightedText);
        spanElement.appendChild(textNode);
        if (highlightColor !== "strikethrough" && note === undefined) {
            spanElement.style.backgroundColor = highlightColor;
        } else if (highlightColor === "strikethrough") {
            spanElement.style.textDecoration = "line-through";
        } else if (note !== undefined) {
            let innerSpanElement = document.createElement("span");
            const noteNode = document.createTextNode(highlightedText);
            innerSpanElement.appendChild(noteNode);
            spanElement.style.backgroundColor = highlightColor;
            innerSpanElement.className= "tooltiptext";
            spanElement.appendChild(innerSpanElement);
            spanElement.className += "test";
        }
        
        beforeTextNode = document.createTextNode(selected.baseNode.data.substring(0, before));
        afterTextNode = document.createTextNode(selected.baseNode.data.substring(after, selected.baseNode.data.length));

        let trimmed = selected.baseNode.data.substring(before, after).replace(/(\s\s*\r\n|\n|\r)/gm, "");
        trimmed = trimmed.replace(/(\s\s*)/gm, " ");

        // need to make sure that a selection section is not in what is already highlighted.
        // if there is a highlighted section in the middle of what is selected, nothing will be highlighted
        if (selected.focusNode.parentNode.tagName.toLowerCase() !== 'span' && selected.toString() == trimmed) {
            console.log(selected);
            // need to check if the selected element is the first child of the parent element.
            // if it is, then a specific action needs to be taken (in else)
            if (selected.anchorNode.previousSibling !== null) {
                console.log("if if");
                prevSibling = selected.anchorNode.previousSibling;
                curSibling = selected.anchorNode.previousSibling.nextSibling;

                parent.replaceChild(spanElement, curSibling);
                parent.insertBefore(beforeTextNode, spanElement);
                parent.insertBefore(afterTextNode, spanElement.nextSibling);
            } else {
                console.log("if else");
                // we are choosing stuff from the first child of the parent
                parent.insertBefore(afterTextNode, parent.childNodes[1]);
                parent.replaceChild(spanElement, parent.childNodes[0]);
                parent.insertBefore(beforeTextNode, spanElement);
            } 
        }
    } else if (parent.tagName.toLowerCase() !== 'span'){ // the selected section is the first part of the parent that will be highlighted
        console.log("else");

        // otherwise, it does not have any siblings
        let highlightedText = selected.toString();
        let spanElement = document.createElement("span");
        const textNode = document.createTextNode(highlightedText);
        spanElement.appendChild(textNode);
        if (highlightColor !== "strikethrough" && note === undefined) {
            spanElement.style.backgroundColor = highlightColor;
        } else if (highlightColor === "strikethrough") {
            spanElement.style.textDecoration = "line-through";
        } else if (note !== undefined) {
            let innerSpanElement = document.createElement("span");
            const noteNode = document.createTextNode(highlightedText);
            innerSpanElement.appendChild(noteNode);
            spanElement.style.backgroundColor = highlightColor;
            innerSpanElement.className= "tooltiptext";
            spanElement.appendChild(innerSpanElement);
            spanElement.className += "test";
        }
        beforeTextNode = document.createTextNode(selected.baseNode.data.substring(0, before));
        afterTextNode = document.createTextNode(selected.baseNode.data.substring(after, selected.baseNode.data.length));

        if (selected.anchorNode.previousSibling !== null) {
            console.log("if if2");
            prevSibling = selected.anchorNode.previousSibling;
            curSibling = selected.anchorNode.previousSibling.nextSibling;
            console.log(curSibling);
            console.log(beforeTextNode);
            console.log(spanElement);

            parent.replaceChild(spanElement, curSibling);
            parent.insertBefore(beforeTextNode, spanElement);
            parent.insertBefore(afterTextNode, spanElement.nextSibling);
        } else {
            console.log("if else2");
            // we are choosing stuff from the first child of the parent
            parent.insertBefore(afterTextNode, parent.childNodes[1]);
            parent.replaceChild(spanElement, parent.childNodes[0]);
            parent.insertBefore(beforeTextNode, spanElement);
        } 

    } else if (parent.tagName.toLowerCase() === 'span' && highlightColor === "white") {
        // the highlighted text is no longer highlighted
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

    } else if (parent.tagName.toLowerCase() === 'span' && highlightColor === "strikethrough") {
        // add a strikethrough to something that is already highlighted
        parent.style.textDecoration = "line-through";
    }
}