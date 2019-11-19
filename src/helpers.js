function humanize(string) {
    return string
        .split(/-+/)
        .join(" ")
        .split(/_+/)
        .join(" ")
        .split(/ +/)
        .map(word => {
            return (
                word.charAt(0).toUpperCase() +
                word
                    .split("")
                    .slice(1)
                    .join("")
            );
        })
        .join(" ");
}

function corsSafeRequest(method, url, successCallback, errorCallback) {
    var createCORSRequest = function(method, url) {
        var xhr = new XMLHttpRequest();
        // No ie8 and ie9 support
        if ("withCredentials" in xhr) {
            // Most browsers.
            xhr.open(method, url, true);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };
    
    var xhr = createCORSRequest(method, url);
    
    xhr.onload = function() {
        successCallback()
    };
    
    xhr.onerror = function() {
        errorCallback()
    };
    
    xhr.send();
}


export { humanize, corsSafeRequest };
