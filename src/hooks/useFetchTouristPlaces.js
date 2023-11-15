import { useQuery } from "react-query";
import axios from "axios";

const fetchPlaces = async () => {
  const response = await axios.get(`http://localhost:4000/tourist-places`);
  return response.data;
};

const useFetchTouristPlaces = () => {
  const {
    data: touristPlaces,
    isLoading: arePlacesLoading,
    isError: isPlacesLoadingError,
  } = useQuery(["places"], () => fetchPlaces());
  return {
    touristPlaces,
    arePlacesLoading,
    isPlacesLoadingError,
  };
};

export default useFetchTouristPlaces;
