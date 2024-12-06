import React from "react";
import { cn } from "@/lib/utils";
import { Controller, Control, FieldError } from "react-hook-form";

interface ControlledInputProps {
    name: string;
    control: Control<any>;
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    type?: string;
    error?: FieldError | undefined;
    icon?: React.ReactNode; // Accept any React node as the icon (e.g., a component)
    required?: boolean
}

const ControlledInput: React.FC<ControlledInputProps> = ({
    name,
    control,
    defaultValue = "",
    label,
    placeholder,
    type = "text",
    error,
    icon, required
}) => (

    <div className="flex flex-col">
        {label && 
        <label className={cn("text-sm font-medium mb-1")}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>}
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className="flex h-9 w-full rounded-md border-none bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
            )}
        />
        {error && <p className="text-red-500 text-sm py-1 px-2">{error.message}</p>}
    </div>
);

export default ControlledInput;
