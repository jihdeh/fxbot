import welcomeGreeting from "./config/welcome-greeting";
import sendGettingStartedBtn from "./config/getting-started";
import sendActions from "./config/sender-actions";
import sendTextMessage from "./config/text-responder";

function* webhook() {
  const data = this.request.body;

  if (data.object == 'page') {
    welcomeGreeting();
    sendGettingStartedBtn()

    data.entry.forEach(function(pageEntry) {

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    this.status = 200;
  }
}


async function receivedMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));


  // You may get a text or attachment but not both
  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      default: try {
        await sendActions(senderID);
      } catch (error) {
        console.log(error)
      }
      sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function receivedDeliveryConfirmation(event) {
  const delivery = event.delivery;
  const messageIDs = delivery.mids;
  const watermark = delivery.watermark;

  if (messageIDs) {
    messageIDs.forEach(function(messageID) {
      console.log("Received delivery confirmation for message ID: %s",
        messageID);
    });
  }
  console.log("All message before %d were delivered.", watermark);
}

function receivedPostback(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  const payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);
  const commands = `Hello there! \nYou can use commands "rates" for a start to get parallel market rates`;
  sendTextMessage(senderID, "commands");
}


export default { webhook };
