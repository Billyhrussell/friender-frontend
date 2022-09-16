import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

 class FrienderApi {
  static token = null;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);

      let message = err.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(data){

    const resp = await this.request("login", data, "post");

    return resp.token;
  }

  static async getAllUsers(){
    const resp = await this.request("users");
    return resp.users;
  }

  static async getOneUser(username){
    const resp = await this.request(`users/${username}`);
    return resp.user;
  }

 }

 export default FrienderApi;