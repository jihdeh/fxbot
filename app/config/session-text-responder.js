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

async function cancelRequest(senderId, recipientId) {
  let newText = await Request.RemoveRequest(recipientId, senderId);
  sendSessionMessage(senderId, newText);
  sendSessionMessage(recipientId, "Oops the requester has cancelled this session.");
}


async function triggerSession(recipientId, messageText, senderId) {
  messageText = messageText.toLowerCase();
  let newText = messageText;
  console.log(isContains(messageText, wordAI.cancelRequest));
  if (isContains(messageText, wordAI.cancelRequest)) {
    await cancelRequest(senderId, recipientId);
    return;
  }
  sendSessionMessage(recipientId, messageText);
}

export default triggerSession
