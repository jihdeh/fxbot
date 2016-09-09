import axios from "axios";

let API_BASE = process.env.JSON_RATES_STORE;

async function getRates() {
  try {
    const response = await axios.get(API_BASE);
    return response.data;
  } catch (error) {
    console.log(error, "error retreiving data");
  }
}

export default getRates;
