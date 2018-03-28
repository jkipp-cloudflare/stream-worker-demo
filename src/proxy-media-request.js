addEventListener('fetch', event => {
  event.respondWith(proxyMediaRequest(event.request))
})

///// FILL OUT THIS SECTION //////
const myZone = "https://www.yourzone.com"
const myZoneAPI = "/api/media" // The path that will be associated with this script
const cfAPI = "https://api.cloudflare.com/client/v4/zones/YOURZONEID123456890ABCD/media";
const XAuthKey = "YOURAPIKEYHERE123ABCDEF"
const XAuthEmail = "youremail@address.com"
const debug = true
////////////

async function proxyMediaRequest(request) {
  var cfResponse;
  var debugData;
  try {
    if (!authorized(request)) {
      return new Response("Forbidden", {"status": 403});	
    }
    const translatedURL = buildRequestURL(request.url)
    debugData = translatedURL
    cfResponse = await fetch(translatedURL, buildRequestOptions(request));

    return new Response(
        cfResponse.body,
	      buildResponseOptions(cfResponse, debugData)
    )
  }
  catch (e) {
    if (e.response) {
      return new Response(
        e.response.body,
        buildResponseOptions(e.response, debugData)
      )
    }
    return new Response(debug ? e : "Error", {"status": 500});
  }
}

function authorized(request) {
    return true
}

function buildRequestOptions(originalRequest) {
  const init = {
    method: originalRequest.method,
    headers: new Headers(originalRequest.headers),
  };
  if (originalRequest.method != "GET" && originalRequest.method != "HEAD") {
    init.body = originalRequest.body;
  }
  init.headers.set("X-Auth-Key", XAuthKey);
  init.headers.set("X-Auth-Email", XAuthEmail);
  return init
}

function buildRequestURL(originalURL) {
  var re = new RegExp("/media/(.*)$");
    var matchArr = re.exec(originalURL);
    var subPath = "";
    if (matchArr) {
        subPath = "/" + matchArr[1];
    }
    return cfAPI  + subPath
}

function buildResponseOptions(originalResponse, debugString) {
    return {
            status: originalResponse.status,
            statusText: originalResponse.statusText,
            headers: buildResponseHeaders(originalResponse.headers, debugString)
        }
}

function buildResponseHeaders(originalHeaders, debugString) {
  const newHeaders = new Headers(originalHeaders);
  if (originalHeaders.has("location")) {
       let location = originalHeaders.get("location");
       let newLocation = location.replace(cfAPI, myZone + myZoneAPI);
       newHeaders.set("location", newLocation);
  }
  newHeaders.set("Access-Control-Allow-Credentials", "true")
  newHeaders.set("Access-Control-Allow-Origin", "http://localhost:9000")
  if (debugString) {
    newHeaders.set("Debug", debugString)
  }
  return newHeaders;
}
