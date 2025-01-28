import React, { useState, useEffect, useRef } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import apiTask from "../../api/task";
import { useModal } from "../../context/ModalContext";

const TaskForm = ({ taskData = null, openTaskForm, setOpenTaskForm, fetchTasks }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formContainerRef = useRef(null);
  const formRef = useRef(null);

  const { showModal } = useModal();

  const initialValues = {
    title: taskData ? taskData.title : "",
    description: taskData ? taskData.description : "",
    createTime: taskData ? taskData.createTime : new Date().toISOString(),
    submissionTime: taskData ? taskData.submissionTime : "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    createTime: Yup.date().required("Create time is required"),
    submissionTime: Yup.date().nullable(),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError(null);

    const formattedValues = {
      ...values,
      createTime: values.createTime ? new Date(values.createTime).toISOString() : new Date().toISOString(),
      submissionTime: values.submissionTime ? new Date(values.submissionTime).toISOString() : null,
    };

    try {
      let response;
      if (taskData) {
        response = await apiTask.update(taskData.id, formattedValues);
      } else {
        response = await apiTask.create(formattedValues);
      }

      if (response.data) {
        console.log(response);
        
        showModal("success", response?.data?.data?.message);
        setOpenTaskForm(false);
        fetchTasks();
      } else {
        setError(response.error || "An error occurred while saving the task.");
        showModal("error", error);
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      showModal("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (e) => {
    if (formContainerRef.current && !formContainerRef.current.contains(e.target)) {
      setOpenTaskForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (taskData) {
      formRef.current && formRef.current.setFieldValue('title', taskData.title);
      formRef.current && formRef.current.setFieldValue('description', taskData.description);
      formRef.current && formRef.current.setFieldValue('createTime', taskData.createTime ? new Date(taskData.createTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
      formRef.current && formRef.current.setFieldValue('submissionTime', taskData.submissionTime ? new Date(taskData.submissionTime).toISOString().slice(0, 16) : '');
    }
  }, [taskData]);

  return (
    <div
      className={`fixed h-screen w-full bg-teal-900/50 top-0 left-0 flex justify-center items-center transition-all duration-300 ${openTaskForm ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div ref={formContainerRef} className="p-4 max-w-xl">
        <div className="flex bg-teal-50 h-fit w-full p-4 rounded-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            innerRef={formRef}
          >
            {({ setFieldValue, errors, touched }) => (
              <Form className="space-y-4 w-full">
                <h2 className="text-xl text-center font-bold">
                  {taskData ? "Edit Task" : "Add Task"}
                </h2>
                <div>
                  <label htmlFor="title">Title</label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                  {errors.title && touched.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <Field
                    as="textarea"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                  {errors.description && touched.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <div className="w-full mt-[-5px]">
                  <label htmlFor="createTime">Create Time</label>
                  <Field
                    type="datetime-local"
                    id="createTime"
                    name="createTime"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                  {errors.createTime && touched.createTime && <div className="text-red-500 text-sm">{errors.createTime}</div>}
                </div>

                <div className="w-full">
                  <label htmlFor="submissionTime">Submission Time</label>
                  <Field
                    type="datetime-local"
                    id="submissionTime"
                    name="submissionTime"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                  {errors.submissionTime && touched.submissionTime && <div className="text-red-500 text-sm">{errors.submissionTime}</div>}
                </div>

                <button type="submit" className="px-4 py-2 bg-teal-500 text-white w-full cursor-pointer" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>

                {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
