import axios from "axios";
import api from "./api";

function get(url, data) {
  return new Promise((resolve, reject) => {
    let params = data || {};
    axios.get(url, {
        params,
        baseURL: api.HOST,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            sessionStorage.getItem("loginPrefix") +
            " " +
            sessionStorage.getItem("loginToken")
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
function post(url, data) {
  return new Promise((resolve, reject) => {
    let params = data || {};
    axios.post(url, params, {
        baseURL: api.HOST,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            sessionStorage.getItem("loginPrefix") +
            " " +
            sessionStorage.getItem("loginToken")
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
function put(url, data) {
  return new Promise((resolve, reject) => {
    let params = data || {};
    axios.put(url, params, {
        baseURL: api.HOST,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            sessionStorage.getItem("loginPrefix") +
            " " +
            sessionStorage.getItem("loginToken")
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}
function oDelete(url, data) {
  return new Promise((resolve, reject) => {
    let params = data || {};
    axios.delete(url, {
        data:params,
        baseURL: api.HOST,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization:
              sessionStorage.getItem("loginPrefix") +
              " " +
              sessionStorage.getItem("loginToken")
          }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default {
  get,
  post,
  put,
  oDelete
};
