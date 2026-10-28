//This JS file handles spam prevention via a honeypot. 

// this function will be exported for use in the script file. 

// check for any form submission faster than 2 seconds
// honeypotField defaults to 'honeypot'.
// honeypotDuration defaults to 2000 milliseconds.
// You can override these when calling the function by passing an options object.
export function preventSpam(
  form,
  { honeypotField = 'required', honeypotDuration = 2000 } = {}
) {
  const startTime = Date.now()
  let hasInteraction = false

  // Check for user interaction
  function checkForInteraction() {
    hasInteraction = true
  }

  // Listen for a couple of events to check interaction
  const events = ['keydown', 'mousemove', 'touchstart', 'click']
  events.forEach(event => {
    form.addEventListener(event, checkForInteraction, { once: true })
  })

  // Check for spam via all the available methods
  // This is done using the containsSpam function
  form.containsSpam = function () {
    const fillTime = Date.now() - startTime
    const isTooFast = fillTime < honeypotDuration
    const honeypotInput = form.querySelector(`[name="${honeypotField}"]`)
    const hasHoneypotValue = honeypotInput?.value?.trim()
    const noInteraction = !hasInteraction

    // Clean up event listeners after use
    events.forEach(event =>
      form.removeEventListener(event, checkForInteraction)
    )
    // containsSpam then returns a Boolean result
    return isTooFast || !!hasHoneypotValue || noInteraction
  }
}