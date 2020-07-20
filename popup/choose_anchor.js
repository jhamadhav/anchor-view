// main function
const listenForClicks = () => {

    // it sends the checkbox data to the content script that is injected into tabs
    const send_info = (tabs) => {
        let cb = document.getElementById("cb");
        browser.tabs.sendMessage(tabs[0].id, {
            checkbox_value: cb.checked
        });
    }

    // send error report to the content script
    const send_report = (err) => {

        browser.tabs.sendMessage(tabs[0].id, {
            ERROR: err
        });
    }

    // event listeners for the button or anything that is on the extension html page
    document.addEventListener("click", (e) => {

        // if the target i.e the think user clicked
        // if it is indeed the checkbox then call the function that sends data to the content script

        //if it fails send a report
        if (e.target.classList.contains("send")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(send_info)
                .catch(send_report);
        }
    });
}

listenForClicks();
