import callSendAPI from "./send-requests";
import wordAI from "../util/word-ai";
import {forEach} from "lodash";


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


async function sendSessionMessage(recipientId, messageText) {
  messageText = messageText.toLowerCase();
  let newText = messageText;
  console.log(isContains(messageText, wordAI.cancelRequest));
  if(isContains(messageText, wordAI.cancelRequest)) {
    newText = await Request.RemoveRequest(recipientId);
    console.log("yesss",newText);
  }
  // switch (messageText) {
  //   case isContains(messageText, wordAI.cancelRequest):
  //     break;
  //   default: 
  //     return;
  // }
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

export default sendSessionMessage
