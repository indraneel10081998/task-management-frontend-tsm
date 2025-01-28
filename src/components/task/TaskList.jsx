import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import Pagination from "./Pagination";
import apiTask from "../../api/task";
import TaskForm from "../form/TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openTaskForm, setOpenTaskForm] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data, error } = await apiTask.getAll({
        page: page,
        limit: 5,
        search: search,
      });
      if (error) {
        console.error(error);
      } else {
        setTasks(data?.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-[60%] bg-white">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="text-gray-500"
            aria-hidden="true"
          >
            <path
              d="M20.031,20.79c0.46,0.46,1.17-0.25,0.71-0.7l-3.75-3.76c1.27-1.41,2.04-3.27,2.04-5.31
                  c0-4.39-3.57-7.96-7.96-7.96s-7.96,3.57-7.96,7.96c0,4.39,3.57,7.96,7.96,7.96c1.98,0,3.81-0.73,5.21-1.94L20.031,20.79z
                  M4.11,11.02c0-3.84,3.13-6.96,6.96-6.96c3.84,0,6.96,3.12,6.96,6.96c0,3.84-3.12,6.96-6.96,6.96C7.24,17.98,4.11,14.86,4.11,11.02
                  z"
              fill="currentColor"
            />
          </svg>
          <input
            type="text"
            id="search"
            placeholder="Search tasks..."
            className="text-md focus:outline-none focus:ring-0 border-l-[1px] border-gray-300 ps-3 w-full"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">My Task</h2>
        <button className="flex bg-teal-100 rounded-lg p-2 items-center gap-2 cursor-pointer"
        onClick={()=>setOpenTaskForm(true)}
        >
          <span className="bg-teal-900 rounded-full text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
            >
              <g>
                <path
                  d="M15.001,12.501h-2.5v2.5c0,0.64-1,0.64-1,0v-2.5h-2.5c-0.65,0-0.64-1,0-1h2.5v-2.5
                    c0-0.64,1-0.64,1,0v2.5h2.5C15.641,11.501,15.641,12.501,15.001,12.501z"
                  fill="white"
                />
                <path
                  d="M12,21.933c-5.477,0-9.933-4.456-9.933-9.933S6.523,2.067,12,2.067S21.933,6.523,21.933,12
                    S17.477,21.933,12,21.933z M12,3.067c-4.926,0-8.933,4.007-8.933,8.933S7.074,20.933,12,20.933s8.933-4.007,8.933-8.933
                    S16.926,3.067,12,3.067z"
                  fill="white"
                />
              </g>
            </svg>
          </span>
          <span className="font-bold text-teal-900 pe-2">New Project</span>
        </button>
      </div>
      <br />

       <TaskForm openTaskForm={openTaskForm} setOpenTaskForm={setOpenTaskForm} fetchTasks={fetchTasks} />

      {loading ? (
        <p className="text-center text-xl">Loading...</p>
      ) : (
        tasks?.map((task) => <TaskCard key={task.id} task={task} fetchTasks={fetchTasks} />)
      )}

      {tasks?.length > 0 && (<Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />)}
    </div>
  );
};

export default TaskList;
