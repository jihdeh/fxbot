import callSendAPI from "./send-requests";



async function sendSessionMessage(recipientId, messageText) {
  console.log(recipientId, messageText, "========")
  messageText = messageText.toLowerCase();
  switch (messageText) {
    case isContains(messageText, wordAI.cancelRequest):
      messageText = await Request.RemoveRequest(recipientId);
      break;
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
