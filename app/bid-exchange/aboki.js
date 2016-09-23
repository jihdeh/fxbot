import AbokiModel from "../model/aboki";
import axios from "axios";

async function AbokiAdd(recipientID) {
  const findAboki = await AbokiModel.findOne({ abokiID: recipientID }).lean();
  if (findAboki) {
    return `Hello ${findAboki.name}, you are already registered as an Aboki :)`;
  } else {
    const getUserFbData = await axios.get(`https://graph.facebook.com/v2.6/${recipientID}`, {
      params: {
        fields: "first_name,last_name,locale,timezone,gender",
        access_token: process.env.PAGE_ACCESS_TOKEN
      }
    });
    const aboki = new AbokiModel(Object.assign({},
      getUserFbData.data, {
        name: getUserFbData.data.first_name + " " + getUserFbData.data.last_name,
        abokiID: recipientID
      }));
    aboki.save();
    return "Successfully Registered as an Aboki, \nPlease note, you will now receive notifications when there's a request";
  }
  return;
}

async function AbokiRemove(recipientID) {
  const findAboki = await AbokiModel.findOne({ abokiID: recipientID }).lean();
  if(findAboki) {
    AbokiModel.findOneAndRemove({abokiID: recipientID}, (err) => {});
    return `You have successfully been removed as an Aboki`;
  } else {
    return "You were never an Aboki, sorry.";
  }
  return;
}


export default {AbokiAdd, AbokiRemove}
