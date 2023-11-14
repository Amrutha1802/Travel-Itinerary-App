const fetchStates = async () => {
  const response = await axios.get(`http://localhost:4000/states`);
  return response.data;
};
const useFetchStates = () => {
  const {
    data: states,
    isLoading: areStatesLoading,
    isError,
  } = useQuery(["states"], () => fetchStates());

  // handle the error

  const statesData = useMemo(
    () => states.filter((item) => item.type === "state"),
    []
  );
  const territoriesData = states.filter((item) => item.type === "territory");

  return { statesData, terrirtoriesData, areStatesLoading };
};
