import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import TaskList from "../components/task/TaskList";

const Dashboard = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state?.login?.isAuthenticated);

  useEffect(() => {
    if (!isLogin) {
      navigate(`/${ROUTES.LOGIN}`);
    }
  }, [isLogin, navigate]);

  return (
    <div className="p-4">
      <TaskList />
    </div>
  );
};

export default Dashboard;
