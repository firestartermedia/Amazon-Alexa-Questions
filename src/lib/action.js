import * as response from 'service/speech-response'
import Alexa from 'alexa-sdk'

export const speech = (event, context, callback) => {
  console.log(JSON.stringify(event))
  var alexa = Alexa.handler(event, context)
  alexa.appId = event.session.application.applicationId
  alexa.registerHandlers(handlers)
  alexa.execute()
}

const handlers = {
  'LaunchRequest': function () {
    this.emit('startConversation')
  },
  'appointmentIntent': function () {
    this.emit(':ask', 'When would you like the appointment?', 'When would you like the appointment?')
  },
  'startConversation': function () {
    this.response.cardRenderer('Chat')
    this.emit(':ask', 'How can I help?', 'Please repeat that')
  },
  'AMAZON.HelpIntent': function () {
    const speechOutput = 'Ask me what you want, and I might answer your question'
    const reprompt = 'What can I help with?'

    this.response.speak(speechOutput).listen(reprompt)
    this.emit(':responseReady')
  },
  'AMAZON.CancelIntent': function () {
    this.response.speak('Oh, I see how it is')
    this.emit(':responseReady')
  },
  'AMAZON.StopIntent': function () {
    this.response.speak('I see how it is, how mean')
    this.emit(':responseReady')
  },
  'Unhandled': function () {
    this.emit(':ask', 'Sorry, I didn\'t understand that', 'Sorry, could you try that again')
  }
}
