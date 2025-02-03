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

const SalesScreenAdmin = () => {
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
        const { data } = await axios.get("/api/bookings/summary/admin", {
          headers: {
            authorization: `Bearer ${userInfo.jwtToken}`,
          },
        });
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <div>
      <h1 className='mt-3'>Total Revenue</h1>
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
          data={[
            ["Date", "Sales"],
            ...summary.dailyOrders.map((x) => [x._id, x.sales]),
          ]}
        />
      )}
    </div>
  );
};

export default SalesScreenAdmin;
