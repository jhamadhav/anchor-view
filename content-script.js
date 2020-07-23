// check if the extension works
console.log("successfully injected a code");

// variable to store if we are allowed to show content
// true by default
let is_allowed = true;

// function to check url
const validURL = (str) => {
    var pattern = new RegExp('^(https:\\/\\/){1}' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

// the anchor tag and function to show it
let a = document.getElementsByTagName("a");
// show function
const show = (e) => {
    // the url from anchor tab
    let url = e.target.parentNode.href || e.target.href;
    // console.log(url);
    if (validURL(url)) {
        pop_msg(url, "#0abf53");
    }

}

// get all anchor tags and add a event listener so the the link that they point to is console logged
const set_event = () => {
    document.addEventListener("mouseover", show);
}

// remove event
const unset_event = () => {
    document.removeEventListener("mouseover", show);
}
// call since it should be on by default
set_event();

// receive message from our extension
browser.runtime.onMessage.addListener((message) => {
    // print that message
    console.log(message);

    // this is data from the checkbox, it is checked at start so anchor tags get the event but if the box is unchecked, the event will be nullified
    if (message.checkbox_value) {
        // if true
        set_event();
    } else {
        //if false
        unset_event();
    }
});


// popup message 
function pop_msg(txt, col) {

    // delete previous popup when a new comes up
    delete_all_popup();

    let popup_outer = document.createElement("div");
    let popup_inner = document.createElement("div");
    popup_outer.classList = 'msg-popup';
    popup_inner.classList = 'popup-txt';

    popup_inner.innerText = txt;
    popup_outer.style.borderLeft = "18px solid " + col;

    popup_outer.appendChild(popup_inner);

    document.body.appendChild(popup_outer);

    popup_outer.addEventListener('animationend', () => {
        document.body.removeChild(popup_outer);
    });

    // After the message pops up, if the message is clicked close popups
    popup_outer.addEventListener('click', () => {
        document.body.removeChild(popup_outer);
    });

}

// delete all present 
const delete_all_popup = () => {
    let popup = document.getElementsByClassName("msg-popup");

    for (let i = 0; i < popup.length; i++) {
        popup[i].remove();
    }
}