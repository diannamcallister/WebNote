# js-library-mcalli42

## About WebNote
WebNote is a javascript library that allows for note-taking directly on web pages.
The various forms of note-taking include:
* Highlight text in various colours
* Cross out text
* Add notes to text
* Bookmark places within a webpage
* Export the html of the page after note-taking
* Import previous markup of the webpage


All of these options are available through the markup options:

<img src="https://github.com/csc309-fall-2020/js-library-mcalli42/blob/master/pub/markup-options.png" width="300" height="50" />


## Heroku Deployed URL
To see the landing page page for this library, go to: [https://webnote-lib.herokuapp.com/landing-page/landing_page.html](https://webnote-lib.herokuapp.com/landing-page/landing_page.html/)

### Examples
To see the examples for this library, use the drop-down menu in the dashboard under "Examples":
* Literature Review: [https://webnote-lib.herokuapp.com/lit-ex/lit_ex.html](https://webnote-lib.herokuapp.com/lit-ex/lit_ex.html)
* Instructions: [https://webnote-lib.herokuapp.com/instruction-ex/instruction_ex.html](https://webnote-lib.herokuapp.com/instruction-ex/instruction_ex.html)

### API documentation
To see the API functions that can be called from WebNote, go to: [https://webnote-lib.herokuapp.com/impl/impl.html](https://webnote-lib.herokuapp.com/impl/impl.html)

## Getting Started Information
The information for "getting started" using WebNote can be found below, and also at: [https://webnote-lib.herokuapp.com/impl/impl.html](https://webnote-lib.herokuapp.com/impl/impl.html)

### HTML Requirements
<h4>
    Within the <code>&lt;head&gt;</code> of the HTML page where WebNote will be used, the three following tags must be added:
</h4>
<code>
    &lt;link rel="stylesheet" type="text/css" href="https://webnote-lib.herokuapp.com/webnote/web_note.css"&gt;
</code>
<code>
    &lt;script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"&gt;&lt;/script&gt;
</code>
<code>
    &lt;script defer type="text/javascript" src='https://webnote-lib.herokuapp.com/webnote/web_note.js'&gt;&lt;/script&gt;
</code>
<h5>
    It is necessary to have jQuery, as well as the JS & CSS files for WebNote to be able to use the WebNote library.
</h5>

### JS Requirements
<h4>
    Whichever text element is desired to allow for the markup options to occur, an event listener must be called so that anytime
    that text is clicked on, the function <code>nextToHighlight</code> from the WebNote library is called.
</h4>
<code>
    const textElement = document.getElementById("id_of_element");
</code>
<code>
    textElement.addEventListener('click', nextToHighlight);
</code>
<h5>
    Now, whichever text element is chosen to allow for markup, when selected, the markup bar will appear!
</h5>

### Basic Example
<h4>
    Below are basic HTML and JS files needed to implement the WebNote library in a very simple webpage.
</h4>

<h5>HTML file called <code>"test.html"</code> includes:</h5>
<code>
    &lt;!DOCTYPE html&gt;
</code>
<code>
    &lt;html lang="en"&gt;
</code>
<code>
        &lt;head&gt;
</code>
<code>
            &lt;meta charset="utf-8"&gt;
  </code>
<code>
            &lt;link rel="stylesheet" type="text/css" href="https://webnote-lib.herokuapp.com/webnote/web_note.css"&gt;
  </code>
<code>
            &lt;script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"&gt;&lt;/script&gt;
</code>
<code>
            &lt;script defer type="text/javascript" src='https://webnote-lib.herokuapp.com/webnote/web_note.js'&gt;&lt;/script&gt;
  </code>
<code>
            &lt;script defer type="text/javascript" src="test.js"&gt;&lt;/script&gt;
  </code>
<code>
        &lt;/head&gt;
  </code>
<code>
        &lt;body&gt;
  </code>
<code>
        &lt;p id="testing"&gt;Testing if I can use WebNote on this!&lt;/p&gt;
  </code>
<code>
        &lt;/body&gt;
</code>

<h5>JS file called <code>"test.js"</code> includes:</h5>
<code>
    const textElement = document.getElementById("testing");
</code>
<code>
    textElement.addEventListener('click', nextToHighlight);
</code>

<h5>
    When calling the <code>test.html</code> file through the browser, and selecting some of the text, the markup options should appear:
</h5>


## Acklowedgements & Citations
* To learn how to include note visability / hovering in a certain manner as well as various other style formats, [https://www.w3schools.com/](https://www.w3schools.com/) was extremely helfpul
* Bootstrap was used to create the documentation pages.
