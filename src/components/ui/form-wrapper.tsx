import React, { ReactNode, useRef, FormEvent } from "react";

// Define the props for the FormWrapper component
interface FormWrapperProps {
  onSubmit: (formData: Record<string, string>) => void; // Function to handle form submission
  children: ReactNode; // Children components or elements
  className?: string; // Optional CSS class for styling
  buttonText?: string; // Optional custom text for the submit button
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  onSubmit,
  children,
  className = "",
  buttonText = "Submit",
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  // Function to collect all form data
  const getFormData = (): Record<string, string> => {
    if (!formRef.current) return {};
    const formData = new FormData(formRef.current);
    const dataObject: Record<string, string> = {};

    // Process each entry, ignoring files
    Array.from(formData.entries()).forEach(([key, value]) => {
      if (typeof value === "string") {
        dataObject[key] = value;
      }
    });

    return dataObject;
  };
  
  
  

//   Handle form submission
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = getFormData();
    onSubmit(data); // Pass the collected data to the parent component
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      {children} {/* Render any children passed into the form */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default FormWrapper;
