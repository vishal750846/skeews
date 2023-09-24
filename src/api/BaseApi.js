// import { create } from "apisauce";
// const BaseApi = create({
//   baseURL: "http://skewws.com:3005/",
//   // baseURL: "https://ed00-122-176-57-93.ngrok-free.app/",
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });
// export { BaseApi };

import { create } from "apisauce";

const getUpdatedToken = () => {
  return localStorage.getItem("token");
};

const createBaseApi = () => {
  const BaseApi = create({
    baseURL: "https://api.skewws.com/"
    // timeout: 5000
    // baseURL: "http://skewws.com:3005/",
    // baseURL: "https://ed00-122-176-57-93.ngrok-free.app/",
  });

  // Set the Authorization header dynamically before making each request
  BaseApi.addRequestTransform(request => {
    const token = getUpdatedToken();
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
  });

  return BaseApi;
};

const BaseApi = createBaseApi();
export { BaseApi };

