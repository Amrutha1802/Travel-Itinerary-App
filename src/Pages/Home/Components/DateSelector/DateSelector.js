import React from "react";
import { DatePicker, Space } from "antd";
import { useDateContext } from "../../../../Contexts/DateContext.js";
import "./DateSelector.css";

const { RangePicker } = DatePicker;

const DateSelector = () => {
  const { setSelectedDates, handleDateChange } = useDateContext();
  if (!setSelectedDates) {
    return <div>Select dates</div>;
  }
  return (
    <div className="date-container">
      <Space direction="vertical" size={12}>
        <RangePicker showTime={false} onChange={handleDateChange} />
      </Space>
    </div>
  );
};

export default DateSelector;
