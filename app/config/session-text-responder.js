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


async function sendSessionMessage(recipientId, messageText) {
  messageText = messageText.toLowerCase();
  switch (messageText) {
    case isContains(messageText, wordAI.cancelRequest):
      messageText = await Request.RemoveRequest(recipientId);
      break;
    default:
      return messageText;
  }
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
  try {
    callSendAPI(messageData);
  } catch (error) {
    console.log("An error occured");
  }
}

export default sendSessionMessage
