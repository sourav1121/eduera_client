import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCourse, getAllCategories, updateCourse } from "../services/api";
import { AuthContext } from "../contexts/AuthProvider";
import toast from "react-hot-toast";
import { BsUpload } from "react-icons/bs";
import axios from "axios";

const CoursePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state.course;
  const [formData, setFormData] = useState(
    course || {
      title: "",
      description: "",
      price: "",
      lessons: "",
      students: "",
      course_outline: [""],
      course_materials: [{ title: "", description: "", video_url: "" }],
    }
  );
  const { user, token } = useContext(AuthContext);
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const isNewCourse = !course;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      let newFormData = { ...prevFormData };

      if (name.startsWith("course_materials")) {
        const [, index, key] = name.split(/[\[\].]+/);

        if (!Array.isArray(newFormData.course_materials)) {
          newFormData.course_materials = [];
        }

        let material = newFormData.course_materials[index] || {
          title: "",
          description: "",
          video_url: "",
        };

        // Update the material object
        material[key] = value;

        // Update the course_materials array
        newFormData.course_materials[index] = material;
      } else if (name.startsWith("course_outline")) {
        const index = Number(name.replace("course_outline", ""));
        const newCourseOutline = [...prevFormData.course_outline];
        newCourseOutline[index] = value;
        newFormData.course_outline = newCourseOutline;
      } else {
        newFormData[name] = value;
      }

      return newFormData;
    });
  };

  const handleAddOutline = () => {
    setFormData({
      ...formData,
      course_outline: [...formData.course_outline, ""],
    });
  };

  const handleAddMaterial = () => {
    setFormData((prevFormData) => {
      // If course_materials doesn't exist or isn't an array, initialize it as an empty array
      if (!Array.isArray(prevFormData.course_materials)) {
        prevFormData.course_materials = [];
      }

      return {
        ...prevFormData,
        course_materials: [
          ...prevFormData.course_materials,
          { title: "", description: "", video_url: "" },
        ],
      };
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData1 = new FormData();
    formData1.append("photo", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData1,
        {
          // replace '/courses' with your server's file upload endpoint

          headers: { Authorization: `Bearer ${token}` }, // include your token here
        }
      );

      if (response.status < 200 || response.status >= 300) {
        throw new Error("File upload failed");
      }

      console.log(response);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo_url: response?.data?.path, // replace 'data.path' with the actual path to the image returned by your server
      }));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // ...

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      let result;
      if (isNewCourse) {
        // If isNewCourse is true, send a POST request to create a new course
        result = await createCourse(
          { ...formData, instructor_id: user },
          token
        );
      } else {
        // Otherwise, send a PUT request to update the course
        result = await updateCourse(
          { ...formData, instructor_id: user },
          token,
          course?._id
        );
      }

      toast(result.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  if (isLoading || !categories) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="p-4 bg-gray-200 shadow-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-blue-500 text-white px-2 py-1 rounded"
      >
        Back
      </button>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Title:</span>
            <input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Description:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Price:</span>
            <input
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Lessons:</span>
            <input
              name="lessons"
              value={formData.lessons}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Students:</span>
            <input
              name="students"
              value={formData.students}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Upload Course Photo:</span>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <BsUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload} // You'll need to implement this
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </label>
          <label className="block">
            <span className="text-gray-700">Category:</span>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border p-2 rounded"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-700">Course Outline:</span>
            {formData.course_outline.map((outline, index) => (
              <input
                key={index}
                name={`course_outline${index}`}
                value={outline}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border p-2 rounded"
                placeholder={`Line ${index + 1}`}
              />
            ))}
            <button
              onClick={handleAddOutline}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add Outline
            </button>
          </label>
        </div>
        <div className="flex flex-col space-y-4">
          <label className="block">
            <span className="text-gray-700">Course Materials:</span>
            {Array.isArray(formData.course_materials) &&
              formData.course_materials.map((material, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-4">
                    <input
                      name={`course_materials[${index}].title`}
                      value={material.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border p-2 rounded"
                      placeholder="Title"
                    />
                    <input
                      name={`course_materials[${index}].description`}
                      value={material.description}
                      onChange={handleInputChange}
                      required
                      className="border p-2 rounded"
                      placeholder="Description"
                    />
                  </div>
                  <div className="flex items-center justify-center p-5 border-2 border-dashed rounded">
                    <div className="space-y-1 text-center">
                      <div className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor={`file-upload[${index}]`}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id={`file-upload[${index}]`}
                            name={`course_materials[${index}].video_url`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <div className="mt-4">
                        <input
                          name={`course_materials[${index}].video_url`}
                          onChange={handleInputChange}
                          className="border p-2 rounded"
                          placeholder="Or enter image URL"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <button
              onClick={handleAddMaterial}
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add Material
            </button>
          </label>
        </div>
        <button
          type="submit"
          className="col-start-2 bg-red-500 text-white px-2 py-1 rounded"
        >
          {isNewCourse ? "Create Course" : "Update Course"}
        </button>
      </form>
    </div>
  );
};

export default CoursePage;
