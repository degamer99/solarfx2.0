// import React from 'react';

// const CollapsibleDataSection = ({ data }) => {
//   return (
//     <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md">
//       {/* Create a collapsible section for each item in the data object */}
//       {Object.entries(data).map(([section, sectionData]) => (
//         <details key={section} className="mb-4 bg-gray-100 rounded-md overflow-hidden">
//           <summary className="cursor-pointer font-semibold text-lg bg-blue-500 text-white py-2 px-4">
//             {section}
//           </summary>
//           <div className="mt-2 p-4">
//             {/* Create inputs for each key-value pair in the sectionData */}
//             {Object.entries(sectionData).map(([key, value]) => (
//               <div key={key} className="mb-4">
//                 <label htmlFor={key} className="block text-sm font-semibold text-gray-600 mb-1">
//                   {key}
//                 </label>
//                 <input
//                   type="text"
//                   id={key}
//                   name={key}
//                   value={value}
//                   readOnly
//                   className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//                 />
//               </div>
//             ))}
//           </div>
//         </details>
//       ))}

//       {/* Other content outside the collapsible sections */}
//       <p className="text-gray-600">Other content...</p>
//     </div>
//   );
// };

// export default CollapsibleDataSection;

import React, { useRef, useState } from "react";
import { firestore } from "./Firebase";
import { doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import emailjs from "@emailjs/browser";

const CollapsibleDataSection = ({ data, id, name, }) => {
  // State to track edited values
  const form = useRef()
  const [message, setMessage] = useState("Type your message")
  const [editedData, setEditedData] = useState({});

  // Function to handle input changes
  const handleInputChange = (section, key, value, prevValue) => {
    if (value == "") {
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [section]: {
          ...prevEditedData[section],
          [key]: prevValue,
        },
      }));
    } else {
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [section]: {
          ...prevEditedData[section],
          [key]: value,
        },
      }));
    }
  };

  // Function to handle update button click
  const handleEmailClick = async (message) => {
    console.log("Email Clicked");
    emailjs
      .sendForm(
        "service_kxduvqr",
        "template_7tcemc5",
        { to_name: name, from_name: "Solarfx", message, reply_to: "no_one", to_email: data.Logins.email },
        "9LjA75Y1B0wz5_FUf"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kxduvqr', 'template_7tcemc5', form.current, '9LjA75Y1B0wz5_FUf')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const handleUpdateClick = async () => {
    //   console.log('Edited Data:', editedData);
    // You can use the edited data in the 'editedData' state
    const flattenedData = Object.values(editedData).reduce(
      (acc, item) => ({ ...acc, ...item }),
      {}
    );

    // Get all values
    const allValues = Object.values(flattenedData);
    console.log(allValues, flattenedData);

    const updatedInfo = flattenedData;
    try {
      const userRef = doc(firestore, "users", id);
      await updateDoc(userRef, updatedInfo).then(() => {
        console.log("Updated Information:", updatedInfo, id);
      });
    } catch (error) {
      console.log(error);
    }
    // Perform your update logic here
  };

  return (
    <div>
      {/* Create a collapsible section for each item in the data object */}
      {Object.entries(data).map(([section, sectionData]) => (
        <details
          key={section}
          className="mb-4 bg-gray-100 rounded-md overflow-hidden text-black"
        >
          <summary
            className={`cursor-pointer font-semibold text-lg ${
              false == true
                ? "bg-gray-900 text-gray-100"
                : "bg-gray-200 text-gray-800"
            }  py-2 px-4`}
          >
            {section}
          </summary>
          <div className="mt-2 p-4">
            {/* Create editable inputs for each key-value pair in the sectionData */}
            {Object.entries(sectionData).map(([key, value]) => {
              if (key == "pendingImage") {
                console.log(key, value);
                if (value == undefined) {
                  return <div key={key}> </div>;
                } else {
                  return (
                    <Link
                      href={`${value}`}
                      key={key}
                      className="w-full rounded-md bg-green-500 my-4 py-3 px-5 font-semibold"
                    >
                      {" "}
                      Download Confirmation
                    </Link>
                  );
                }
              } else if (key == "CustomizeDefault") {
                return (
                //   <div key={key} className="mb-4">
                    
                //     <label
                //       htmlFor={key}
                //       className="block text-sm font-semibold text-gray-600 mb-1"
                //     >
                //       {key}
                //     </label>
                //     <input
                //       type="text"
                //       id={key}
                //       name={key}
                //       //   placeholder={editedData[section]?.[key] }
                //       placeholder={`${value}`}
                //       value={message}
                //       // Use edited value if available
                //       onChange={(e) =>
                //         setMessage(e.target.value)
                //       }
                //       className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                //     />
                //     <button
                //       onClick={handleEmailClick(message)}
                //       className="mt-4 px-4 py-2 bg-gray-600 rounded-lg font-semibold text-white"
                //     >
                //       Send Email
                //     </button>
                //   </div>
                //     <form key={key} ref={form} onSubmit={sendEmail}>
                //     <label>To:</label>
                //     <input type="text" name="to_name" value={name} />
                //     <label>From:</label>
                //     <input type="text" name="from_name" value={"Solarfx"} />
                //     <label>Email</label>
                //     <input type="email" name="to_email" value={data.Logins.email}/>
                //     <label>Message</label>
                //     <textarea name="message" />
                //     <input type="submit" value="Send" />
                //   </form>
                <form
  key={key}
  ref={form}
  onSubmit={sendEmail}
  className="max-w-md mx-auto p-8 bg-gray-200 rounded shadow-md"
>
  <label className="block mb-2 text-gray-700">To:</label>
  <input
    type="text"
    name="to_name"
    value={name}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
  />

  <label className="block mb-2 text-gray-700">From:</label>
  <input
    type="text"
    name="from_name"
    value={"Solarfx"}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
  />

  <label className="block mb-2 text-gray-700">Email:</label>
  <input
    type="email"
    name="to_email"
    value={data.Logins.email}
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
  />

  <label className="block mb-2 text-gray-700">Message:</label>
  <textarea
    name="message"
    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-500"
  ></textarea>

  <input
    type="submit"
    value="Send"
    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-500"
  />
</form>

                );
              } else {
                return (
                  <div key={key} className="mb-4">
                    <label
                      htmlFor={key}
                      className="block text-sm font-semibold text-gray-600 mb-1"
                    >
                      {key}
                    </label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      //   placeholder={editedData[section]?.[key] }
                      placeholder={`${value}`}
                      // Use edited value if available
                      onChange={(e) =>
                        handleInputChange(section, key, e.target.value, value)
                      }
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                );
              }
            })}
          </div>
        </details>
      ))}

      {/* Update button */}
      <button
        onClick={handleUpdateClick}
        className="px-4 py-2 bg-gray-600 rounded-lg font-semibold text-white"
      >
        Update
      </button>

      {/* Other content outside the collapsible sections */}
      {/* <p className="text-gray-600">Other content...</p> */}
    </div>
  );
};

export default CollapsibleDataSection;
