import { useMemo } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};

const useFetchStates = () => {
  const {
    data: states,
    isLoading: areStatesLoading,
    isError,
    error,
  } = useQuery(["states"], fetchStates);

  const statesData = useMemo(
    () =>
      states && !areStatesLoading
        ? states.filter((item) => item.type === "state")
        : [],
    [states, areStatesLoading]
  );

  const territoriesData = useMemo(
    () =>
      states && !areStatesLoading
        ? states.filter((item) => item.type === "territory")
        : [],
    [states, areStatesLoading]
  );

  return {
    states,
    areStatesLoading,
    isError,
    error,
    statesData,
    territoriesData,
  };
};

export default useFetchStates;
