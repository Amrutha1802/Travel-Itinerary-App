import { useQuery } from "react-query";
import axios from "axios";

const fetchStateDetails = async (stateId) => {
  const response = await axios.get(`http://localhost:4000/states/${stateId}`);
  return response.data;
};

const useFetchStateDetails = (stateId) => {
  const {
    data: stateDetails,
    isLoading: areStateDetailsLoading,
    isError: isStateDetailsLoadingError,
  } = useQuery(["state"], () => fetchStateDetails(stateId));
  return {
    stateDetails,
    areStateDetailsLoading,
    isStateDetailsLoadingError,
  };
};

export default useFetchStateDetails;
