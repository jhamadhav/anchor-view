// check if the extension works
console.log("successfully injected a code");

// variable to store if we are allowed to show content
// true by default
let is_allowed = true;

// the anchor tag and function to show it
let a = document.getElementsByTagName("a");
// show function
const show = (e) => {
    // the url from anchor tab
    let url = e.target.href;
    console.log(url);

    // the styling
    let style = document.createElement('style');
    let style_data = `.msg-popup {
        position: fixed;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
            -ms-flex-direction: row;
                flex-direction: row;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        -ms-flex-line-pack: center;
            align-content: center;
        bottom: 30px;
        left: 40px;
        z-index: 2;
        background: #262626;
        border-radius: 8px;
        font-size: medium;
        max-width: 440px;
        color: white;
        border-left: 18px solid red;
        -webkit-animation: popup-anim 5s linear;
                animation: popup-anim 5s linear;
      }
      
      .msg-popup .popup-txt {
        padding: 10px 14px 10px 14px;
      }
      
      @keyframes popup-anim {
        0% {
          -webkit-transform: translate(-100%);
                  transform: translate(-100%);
        }
        10% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
        90% {
          -webkit-transform: translate(0);
                  transform: translate(0);
        }
        100% {
          -webkit-transform: translate(-100%);
                  transform: translate(-100%);
        }
      }`;

    // deploying style 
    style.innerHTML = style_data;

    // Get the first script tag
    var ref = document.querySelector('script');

    // Insert our new styles before the first script tag
    ref.parentNode.insertBefore(style, ref);

    pop_msg(url, "#0abf53");
}

// get all anchor tags and add a event listener so the the link that they point to is console logged
const set_event = () => {
    for (let i = 0; i < a.length; i++) {
        a[i].addEventListener("mouseover", show);
    }
}

// remove event
const unset_event = () => {
    for (let i = 0; i < a.length; i++) {
        a[i].removeEventListener("mouseover", show);
    }
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