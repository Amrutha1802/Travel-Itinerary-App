import React from "react";
import { Space, TimePicker as AntdTimePicker } from "antd";
import { useItineraryContext } from "../../Contexts/ItineraryContext";
import { useDateContext } from "../../Contexts/DateContext.js";
import { usePlanContext } from "../../Contexts/PlanContext.js";
const PlaceTimePicker = ({ flag, dateInfo, placeName }) => {
  const { itineraryPlaces, setItineraryPlaces } = useItineraryContext();
  const { setSelectedTime } = usePlanContext();
  const { formatTime } = useDateContext();
  const handleTimeChange = (time, timeString) => {
    const [startTimeMoment, endTimeMoment] = time;
    const startTime = startTimeMoment ? startTimeMoment.toDate() : null;
    const endTime = endTimeMoment ? endTimeMoment.toDate() : null;
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);
    if (flag !== "edit") {
      const selectedDateIndex = itineraryPlaces.findIndex(
        (dateObject) => dateObject.date === dateInfo
      );
      if (selectedDateIndex !== -1) {
        const selectedPlaceIndex = itineraryPlaces[
          selectedDateIndex
        ].places.findIndex((place) => place.name === placeName);
        if (selectedPlaceIndex !== -1) {
          const updatedItineraryPlaces = [...itineraryPlaces];
          updatedItineraryPlaces[selectedDateIndex].places[
            selectedPlaceIndex
          ].time = [formattedStartTime, formattedEndTime];
          setItineraryPlaces(updatedItineraryPlaces);
        }
      }
      // setIsTimeSelected(true);
    } else {
      setSelectedTime([formattedStartTime, formattedEndTime]);
    }
  };
  return (
    <Space direction="vertical">
      <AntdTimePicker.RangePicker
        status="warning"
        onChange={handleTimeChange}
        format="HH:mm"
      />
    </Space>
  );
};

export default PlaceTimePicker;
