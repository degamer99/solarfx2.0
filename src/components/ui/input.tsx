// import * as React from "react"

// import { cn } from "@/lib/utils"
// import { Lock } from "lucide-react"


// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> {}

// const Input = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, type, ...props }, ref, ) => {
//     return (
//       <div className="border rounded-md flex justify-between items-center">
//         <span className="p-2"><Lock /></span>
//         {icon}
//         <input
//           type={type}
//           className={cn(
//             "flex h-9 w-full rounded-md border-none border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//             className
//           )}
//           ref={ref}
//           {...props}
//         />
//       </div>
//     )
//   }
// )
// Input.displayName = "Input"

// export { Input }

import * as React from "react";
import { cn } from "@/lib/utils";

// Extend the InputProps to include label, icon, labelColor, and iconColor
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode; // Accept any React node as the icon (e.g., a component)
  labelColor?: string; // Allow custom label color
  iconColor?: string;  // Allow custom icon color
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, required, labelColor = "text-blue-600", iconColor = "text-gray-500", ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {/* Label */}
        {label && (
          <label className={cn("text-sm font-medium mb-1", labelColor)}>
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="border rounded-md flex justify-between items-center">
          <span className={cn("p-2", iconColor)}>
            {icon}
          </span>
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border-none bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
