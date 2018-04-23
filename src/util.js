/**
 * Get a new UUID.
 * @return {string} A 4 character UUID for PubNub and to give to friends.
 */
function fourCharUUID() {
  const maxLength = 4;
  const possible = 'abcdef0123456789';
  let text = '';

  for (let i = 0; i < maxLength; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

/**
 * Make an HTTP POST request.
 *
 * @param {String} url URL of the resource that is being requested.
 * @param {Object} options JSON Object with HTTP request options, "header"
 *     Object of possible headers to set, and a body Object of a POST body.
 *
 * @return {(Object|String)} An parsed JSON Object response or String response.
 */
function post(url, options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    for (let header in options.headers) {
      if ({}.hasOwnProperty.call(options.headers, header)) {
        xhr.setRequestHeader(header, options.headers[header]);
      }
    }

    xhr.onload = function() {
      if (xhr.status === 200) {
        let response;

        try {
          response = JSON.parse(xhr.response);
        } catch (e) {
          response = xhr.response;
        }

        resolve(response);
      } else if (xhr.status !== 200) {
        reject(xhr.statusText);
      }
    };

    xhr.send(JSON.stringify(options.body));
  });
}

export default {
  fourCharUUID,
  post,
};
