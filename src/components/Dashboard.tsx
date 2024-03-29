import { useAppDispatch } from "../hooks";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLeads } from "../store/actions/lead";
import React from "react";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getLeads());
  }, []);
  const { leads } = useSelector((state: any) => state.lead);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};
