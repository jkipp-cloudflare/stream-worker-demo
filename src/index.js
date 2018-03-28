import Uppy from 'uppy/lib/core'
import Dashboard from 'uppy/lib/plugins/Dashboard'
import Tus from 'uppy/lib/plugins/Tus'
import $ from 'jquery'

function setup() {
  const uppy = Uppy({ autoProceed: false })
  .use(Dashboard, {
    trigger: '#select-files',
    inline: true,
    target: '#dashboard-container',
    replaceTargetContainer: true
  })
  .use(Tus, {endpoint: 'https://www.yourzone.com/api/media', chunkSize: 10485760})
  .run()
 
  uppy.on('complete', (result) => {
    console.log(`Upload complete! We’ve uploaded these files: ${result.successful}`)
  })
}

$(document).ready(setup)
