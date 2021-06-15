import axios from "axios";
import { baseUrl } from "../assets/serverdetails";
export async function emailRequest(email) {
  try {
    const url = baseUrl + `/user/check-email/${email}`;
    return await axios.post(url);
  } catch (e) {
    return e;
  }
}
export async function VerificationRequest(uid) {
  try {
    const url = baseUrl + `/user/confirmemail/${uid}`;
    return await axios.get(url);
  } catch (e) {
    return e;
  }
}
export async function createAccountRequest(data) {
  console.log("data", data);
  try {
    const url = baseUrl + `/user/createaccount`;
    return await axios.post(url, data);
  } catch (e) {
    return e;
  }
}
export async function updateProfileImage(uid, udata) {
  console.log("service data", udata);
  try {
    const url = baseUrl + `/user/update-profile-image/${uid}`;
    return await axios.post(url, udata);
  } catch (e) {
    return e;
  }
}
