import request from "request";
import greeting from "../util/generic-greetings";
import { intersection } from "lodash";

// const s = ["hello"];
// console.log(intersection(s, greeting), greeting)

function* webhook() {
  const data = this.request.body;
  // Make sure this is a page subscription
  if (data.object == 'page') {
    sendGreetingText()
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      const pageID = pageEntry.id;
      const timeOfEvent = pageEntry.time;

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


function receivedMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  const messageId = message.mid;

  // You may get a text or attachment but not both
  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID);
        break;

      case 'button':
        sendButtonMessage(senderID);
        break;

      case 'generic':
        sendGenericMessage(senderID);
        break;

      case 'receipt':
        sendReceiptMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}


function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function sendGreetingText() {
  const messageData = {
    {
      setting_type: "greeting",
      greeting: {
        "text": "Welcome to FxBot0. An Experimental Tool for Facebooks MSSGR BOT!"
      }
    }
  }
  callSendGreetingText(messageData);
}

  function callSendGreetingText(messageData) {
    request({
      uri: "https://graph.facebook.com/v2.6/me/thread_settings",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData
    })
  }

  function callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData

    }, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        const recipientId = body.recipient_id;
        const messageId = body.message_id;

        console.log("Successfully sent generic message with id %s to recipient %s",
          messageId, recipientId);
      } else {
        console.error("Unable to send message.");
        console.error(response);
        console.error(error);
      }
    });
  }

  function receivedDeliveryConfirmation(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var delivery = event.delivery;
    var messageIDs = delivery.mids;
    var watermark = delivery.watermark;
    var sequenceNumber = delivery.seq;

    if (messageIDs) {
      messageIDs.forEach(function(messageID) {
        console.log("Received delivery confirmation for message ID: %s",
          messageID);
      });
    }

    console.log("All message before %d were delivered.", watermark);
  }

  function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback 
    // button for Structured Messages. 
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' " +
      "at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to 
    // let them know it was successful
    sendTextMessage(senderID, "Postback called");
  }


  /*
   * Turn typing indicator on
   *
   */
  function sendTypingOn(recipientId) {
    console.log("Turning typing indicator on");

    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "typing_on"
    };

    callSendAPI(messageData);
  }

  /*
   * Turn typing indicator off
   *
   */
  function sendTypingOff(recipientId) {
    console.log("Turning typing indicator off");

    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "typing_off"
    };

    callSendAPI(messageData);
  }

  /*
   * Send a read receipt to indicate the message has been read
   *
   */
  function sendReadReceipt(recipientId) {
    console.log("Sending a read receipt to mark message as seen");

    var messageData = {
      recipient: {
        id: recipientId
      },
      sender_action: "mark_seen"
    };

    callSendAPI(messageData);
  }


  export default { webhook };
