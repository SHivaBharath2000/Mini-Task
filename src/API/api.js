import axios from "axios";

// Login API
const loginApi = async (data) => {
  try {
    const response = await axios.post(
      "https://reqres.in/api/login", 
      data, 
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export { loginApi };
