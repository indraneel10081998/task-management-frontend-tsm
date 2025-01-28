import React, { useState } from "react";
import TaskForm from "../form/TaskForm";
import { AiTwotoneDelete } from "react-icons/ai";
import apiTask from "../../api/task";
import { useModal } from "../../context/ModalContext";
import ConfirmationModal from "../ConfirmationModal";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const optionsDate = { year: "numeric", month: "short", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

  const { showModal } = useModal();

  const formattedDate = date.toLocaleDateString("en-US", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${formattedDate}, ${formattedTime}`;
};

const TaskCard = ({ task, fetchTasks }) => {
  const status = task.submissionTime ? "Complete" : "Ongoing";
  const statusColor = task.submissionTime
    ? "bg-teal-100 text-teal-700"
    : "bg-purple-100 text-purple-700";

  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const { showModal } = useModal();

  const handleCardClick = () => {
    setSelectedTask(task);
    setOpenTaskForm(true);
  };

  const deleteTask = async () => {
    try {
      const { data, error } = await apiTask.removeTask(taskToDelete);
      if (error) {
        showModal("error", error);
      } else {
        showModal("success", data?.message);
        fetchTasks();
      }
    } catch (error) {
      showModal("error", error);
    } finally {
      setShowConfirmModal(false);
    }
  };

  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowConfirmModal(true);
  };

  return (
    <>
      <TaskForm
        openTaskForm={openTaskForm}
        setOpenTaskForm={setOpenTaskForm}
        taskData={selectedTask}
        fetchTasks={fetchTasks}
      />
      <ConfirmationModal
        show={showConfirmModal}
        message="Are you sure you want to delete this task?"
        onConfirm={deleteTask}
        onCancel={() => setShowConfirmModal(false)}
      />
      <div className="flex bg-white shadow rounded-lg mb-4 overflow-hidden cursor-pointer">
        <div className="flex flex-col w-full p-4" onClick={handleCardClick}>
          <div className="flex justify-between w-full flex-wrap mb-2">
            <h5 className={`rounded-full px-4 py-1 font-bold ${statusColor}`}>
              {status}
            </h5>
            <p className="font-medium">
              {formatDateTime(task.createTime)} -{" "}
              {task.submissionTime
                ? formatDateTime(task.submissionTime)
                : "Ongoing"}
            </p>
          </div>
          <h5 className="text-xl font-bold">{task.title}</h5>
          <p className="text-lg">{task.description}</p>
        </div>
        <div
          className="bg-rose-100 p-2 flex justify-center items-center"
          onClick={() => confirmDelete(task.id)} // Trigger confirmation modal on click
        >
          <AiTwotoneDelete className="text-[24px] text-rose-500" />
        </div>
      </div>
    </>
  );
};

export default TaskCard;
