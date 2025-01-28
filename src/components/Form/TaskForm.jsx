import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TaskForm = () => {
  const initialValues = {
    title: "",
    description: "",
    createTime: new Date().toISOString(),
    submissionTime: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    createTime: Yup.date().required("Create time is required"),
    submissionTime: Yup.date().nullable(),
  });

  const onSubmit = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="p-4">
      <div className="flex bg-teal-50 h-fit w-full p-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4 w-full">
              <div>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full">
                <div className="w-full mt-[-5px]">
                  <label htmlFor="createTime">Create Time</label>
                  <Field
                    type="datetime-local"
                    id="createTime"
                    name="createTime"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="w-full mt-[-5px]">
                  <label htmlFor="submissionTime">Submission Time</label>
                  <Field
                    type="datetime-local"
                    id="submissionTime"
                    name="submissionTime"
                    className="p-2 border border-gray-300 w-full focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-teal-500 text-white w-full"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TaskForm;
