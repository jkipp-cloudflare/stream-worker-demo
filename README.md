# Worker Upload Demo

## Setup

1. Copy the contents of `src/proxy-media-request.js` to a Cloudflare worker in your cloudflare dashboard.
2. Update the "Configuration" section of the new worker script and save.
3. Associate the worker script with a path such as `https://yourzone.com/api/media*` (depending on what you set in the configuration section of the worker script)

NOTE: DO NOT CHECK YOUR API KEY INTO VERSION CONTROL

## Running the UI

1. `yarn`
2. Edit the upload endpoing in `src/index.js`
3. `yarn start:ui`
4. Visit http://localhost:9000 in your web browser.
5. Choose a video to upload!
6. When the upload completes, you should see the uploaded video in the dashboard and the response to the list videos API call.
