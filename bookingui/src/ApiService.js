import axios from "axios";

const ApiService = () => {};
ApiService.login = async (input) => {
  const url = "http://localhost:8080/user/login";

  await axios.post(url, input).then((res) => {
    console.log("data: ", JSON.stringify(res.data));
  });
};
export default ApiService;
