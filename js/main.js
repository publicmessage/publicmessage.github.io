document.addEventListener("DOMContentLoaded", function(event) {
    let inputTextboxMessage = document.getElementById("message");
    let inputTextboxAuthor = document.getElementById("author");
    inputTextboxMessage.addEventListener('keydown', (function(e) {
        preventEnter(e);
        getMessage(inputTextboxMessage);
    }));
    inputTextboxAuthor.addEventListener('keydown', (function(e) {
        preventEnter(e);
        getAuthor(inputTextboxAuthor);
    }));
});

function getMessage(inputTextboxMessage) {
    console.log(inputTextboxMessage.value);
    inputTextboxMessage.addEventListener('keyup', (function(e) {
        let searchUrl = `https://publicmessage.herokuapp.com/api/v0/message/${inputTextboxMessage.value}`;
        console.log(searchUrl);
        let request = new XMLHttpRequest();
        request.open('GET', searchUrl, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                let data = JSON.parse(this.response);
                console.log(data);
                if (data.error === "Not found") {
                    $('#resultMessage').html(`Could not find the message. Hurry, you might be able to snag message id of  ${inputTextboxMessage.value} and claim your spot in hacker fame!`);
                } else if (data.Status === "Failed" && inputTextboxMessage.value == "") {
                    console.log("What do you expect me to show you if your query is empty?");
                } else {
                    $('#resultMessage').html(`Someone posted <br> ${data.message} <br> with message id of ${data.id} and author id of ${data.author_id}`);
                }
            } else {
                // We reached our target server, but it returned an error
                console.log(`Something is wrong with query ${inputTextboxMessage.value}`);
                $('#resultMessage').html(`The application encountered an error. If ${inputTextboxMessage.value} is a valid message number, please send me a message on signal at +1 661 434 5874. No calls please.`);
            }
        };
        request.onerror = function() {
            // There was a connection error of some sort
        };
        request.send();
    }));
}

function getAuthor(inputTextboxAuthor) {
    console.log(inputTextboxAuthor);
    inputTextboxAuthor.addEventListener('keyup', (function(e) {
        let searchUrl = `https://publicmessage.herokuapp.com/api/v0/author/${inputTextboxAuthor.value}`;
        console.log(searchUrl);
        let request = new XMLHttpRequest();
        request.open('GET', searchUrl, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                // Success!
                let data = JSON.parse(this.response);
                console.log(data);
                if (data.error === "Not found") {
                    $('#resultAuthor').html(`Could not find anyone with that author id. Hurry, you could be the super warrior of ${inputTextboxAuthor.value} and claim your spot in hacker fame!`);
                } else if (data.Status === "Failed" && inputTextboxMessage.value == "") {
                    console.log("What do you expect me to show you if your query is empty?");
                } else {
                    $('#resultAuthor').html(`Some information about author with id ${data.id} follows: <br> Full name: ${data.full_name} <br> Email: ${data.email}`);
                }
            } else {
                // We reached our target server, but it returned an error
                console.log(`Something is wrong with query ${inputTextboxAuthor.value}`);
                $('#resultAuthor').html(`The application encountered an error. If ${inputTextboxAuthor.value} is a valid author number, please send me a message on signal at +1 661 434 5874. No calls please.`);
            }
        };
        request.onerror = function() {
            // There was a connection error of some sort
        };
        request.send();
    }));
}

function preventEnter(e) {
    if (e.which == 13) {
        console.log("Please don't press enter. Be kind to the ajax.");
        event.preventDefault();
        return false;
    }
}