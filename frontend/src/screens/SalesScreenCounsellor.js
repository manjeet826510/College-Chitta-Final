import React, { useEffect, useReducer, useContext } from 'react';
import { Chart } from "react-google-charts";
import axios from 'axios';
import { Store } from '../Store';
import getError from '../utils';
import MessageBox from '../components/MessageBox';
import { Spinner } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, summary: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SalesScreenCounsellor = () => {
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/bookings/summary/counsellor", {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchData();
  }, [userInfo]);

  const processChartData = (dailyOrders) => {
    return dailyOrders.map((x) => [new Date(x._id), x.sales]);
  };

  const chartData = [["Date", "Sales"], ...processChartData(summary?.dailyOrders || [])];
  console.log(chartData);  // Log the chart data to debug

  return (
    <div>
      <h1 className='mt-3'>Your Revenue</h1>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Chart
          width="100%"
          height="400px"
          chartType="AreaChart"
          loader={<div>Loading Chart...</div>}
          data={chartData}
          options={{
            title: "Daily Sales",
            hAxis: { title: "Date" },
            vAxis: { title: "Sales" },
            legend: { position: "none" },
          }}
        />
      )}
    </div>
  );
};

export default SalesScreenCounsellor;
