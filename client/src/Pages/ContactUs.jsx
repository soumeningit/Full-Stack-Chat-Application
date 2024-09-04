import React, { useState } from "react";
import { contactUs } from "../Service/Operation/UserAPI";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ContactUs() {
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [formData, setFromData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFromData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const submitHandle = async (event) => {
    event.preventDefault();
    console.log("formData : ", formData);
    try {
      const contactUsResponse = await contactUs(formData, token);
      if (contactUsResponse.success) {
        toast.success("Thank you for contacting us");
        setFromData({
          name: "",
          email: "",
          message: "",
        });
        navigate("/");
      }
    } catch (e) {
      console.log("Contact Us Failed : ", e);
      console.log(e);
    }
  };

  return (
    <>
      <div class="container px-4 mx-auto">
        <div class="mx-auto">
          <div class="max-w-md mx-auto px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <form onSubmit={submitHandle}>
              <div class="mb-4">
                <label class="block text-gray-800 mb-1" for="name">
                  Your Name
                </label>
                <input
                  required
                  class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-800 mb-1" for="email">
                  Your Email
                </label>
                <input
                  required
                  class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  placeholder="Enter your email"
                  name="email"
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div class="mb-4">
                <label class="block text-gray-800 mb-1" for="message">
                  Your Message
                </label>
                <textarea
                  required
                  class="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  rows="4"
                  placeholder="Enter your message"
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button
                class="w-full bg-yellow-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-300"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
