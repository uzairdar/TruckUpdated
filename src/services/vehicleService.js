import axios from "axios";
import { baseUrl } from "../assets/serverdetails";
export async function addVehicle(data) {
  try {
    const url = baseUrl + `/vehicle/add-vehicle`;
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
export async function getVehicles(uid) {
  try {
    const url = baseUrl + `/vehicle/get-vehicles/${uid}`;
    return await axios.post(url);
  } catch (e) {
    return e;
  }
}
