import callSendAPI from "./send-requests";
import Request from "../bid-exchange/request";
import wordAI from "../util/word-ai";

function isContains(word, substr) {
  let nevalue = false;
  forEach(substr, (value) => {
    if (word.indexOf(value !== "" && value) > -1) return nevalue = true;
  });
  return nevalue;
}

function msgData(recipientId, messageText) {
  return {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  }
}

async function sendSessionMessage(recipientId, messageText) {
  messageText = messageText.toLowerCase();
  switch (true) {
    case isContains(messageText, wordAI.cancelRequest):
      messageText = await Request.RemoveRequest(recipientId);
      try {
        callSendAPI(msgData(recipientId, messageText));
      } catch (error) {
        console.log(error)
      }
      break;
    default:
      try {
        callSendAPI(msgData(recipientId, messageText));;
      } catch (error) {
        console.log(error);
      }
  }
}

export default sendSessionMessage
