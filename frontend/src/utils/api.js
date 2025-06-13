import axios from "axios";

export async function getDiagnosis(query) {
  const res = await axios.post("http://localhost:8000/api/diagnosis", { query });
  return res.data; // { response, context }
}