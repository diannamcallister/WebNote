
var element = document.getElementById('textstuff'); 
var newElement = document.getElementById('test'); 
element.addEventListener('click', clickHandler);
newElement.addEventListener('click', clickHandler);

function test() {
    console.log("clicked on picture!");
}

var selected;

function nextToHighlight(e) {
    selected = document.getSelection()
}

function clickHandler(e) {
    // console.log(e.clientX);
    // console.log(e.clientY);
    let parent = document.getSelection().anchorNode.parentElement;
    selected = document.getSelection();
    
    let before;
    let after;

    // need to do this check to make sure that highlight starting left of word OR starting right of word both work correclty
    if (document.getSelection().focusOffset < document.getSelection().anchorOffset) {
        before = document.getSelection().focusOffset;
        after = document.getSelection().anchorOffset;
    } else {
        after = document.getSelection().focusOffset;
        before = document.getSelection().anchorOffset;
    }

    // a part of the parent element has been highlighted
    if (parent.childElementCount >= 1) {
        console.log("if");

        let highlightedText = selected.toString();
        // check if a space is right before was is highlighted. If it is, then 
        let spanElement = document.createElement("span");
        const textNode = document.createTextNode(highlightedText);
        spanElement.appendChild(textNode);
        spanElement.style.backgroundColor = "yellow";
        //spanElement.className = "yellow-highlight";
        
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
        spanElement.style.backgroundColor = "blue"
        spanElement.style.textDecoration = "line-through";
        //spanElement.className = "yellow-highlight";
        
        beforeTextNode = document.createTextNode(parent.innerHTML.substring(0, before));
        afterTextNode = document.createTextNode(parent.innerHTML.substring(after, parent.innerHTML.length));

        parent.innerHTML = '';
        parent.appendChild(beforeTextNode);
        parent.appendChild(spanElement);
        parent.appendChild(afterTextNode);
    }
}