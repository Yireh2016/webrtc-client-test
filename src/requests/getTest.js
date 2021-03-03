import axios from "axios";

const getTest = () => axios.get("http://localhost:8080/api/test");

export default getTest;
