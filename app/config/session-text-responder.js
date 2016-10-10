import callSendAPI from "./send-requests";
import wordAI from "../util/word-ai";
import Request from "../bid-exchange/request";
import { forEach } from "lodash";


function isContains(word, substr) {
  let nevalue = false;
  forEach(substr, (value) => {
    if (word.indexOf(value !== "" && value) > -1) return nevalue = true;
  });
  return nevalue;
}

String.prototype.capitalizeFirstLetter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function sendSessionMessage(recipientId, newText) {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: newText.capitalizeFirstLetter()
    }
  };
  try {
    callSendAPI(messageData);
  } catch (error) {
    console.log("An error occured");
  }
}

async function cancelRequest(senderId, recipientId, uniqId) {
  let newText = await Request.RemoveRequest(uniqId);
  sendSessionMessage(senderId, newText);
  sendSessionMessage(recipientId, "Oops the session has been cancelled by the other party");
}


async function triggerSession(recipientId, messageText, senderId, uniqId) {
  messageText = messageText.toLowerCase();
  let newText = messageText;
  console.log(isContains(messageText, wordAI.cancelRequest));
  if (isContains(messageText, wordAI.cancelRequest)) {
    await cancelRequest(senderId, recipientId, uniqId);
    return;
  }
  sendSessionMessage(recipientId, messageText);
}

export default triggerSession;
