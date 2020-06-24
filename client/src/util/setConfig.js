export const setConfig = (token) => {
    const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      if (token) {
        config.headers["Authorization"] = token;
      }
    return config;
}


