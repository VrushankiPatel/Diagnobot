import axios from "axios";

export async function getDiagnosis(query) {
  const res = await axios.post("https://diagnobot-backend-653741639089.us-west1.run.app/api/diagnosis", { query });
  return res.data; // { response, context }
}