import { z } from 'zod';

// Zod schema with custom validations
export const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
  plan: z.unknown().optional() ,// Ensure a radio button is selected
  method: z.string().min(1, { message: 'Name must be at least 2 characters.' }),
  file: z
  .custom<FileList>(
    (value) => value instanceof FileList && value.length > 0,
    "File is required"
  )
  .refine(
    (files) => {
      const file = files?.[0]; // Validate only the first file
      return file && file.size <= 5 * 1024 * 1024; // Max file size: 5MB
    },
    { message: "File must be less than 5MB" }
  )
  .refine(
    (files) => {
      const file = files?.[0];
      return file && ["image/jpeg", "image/png"].includes(file.type); // Allowed types
    },
    { message: "Only .jpg and .png files are allowed" }
  ),
  // plan: z.string().min(1, {message: 'You must select an option'}), // Ensure a radio button is selected
//   phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: 'Invalid phone number format.' }),
  // picture: z
  //   .instanceof(File)
  //   .refine((file) => file.size <= 5 * 1024 * 1024, { message: 'File size must be under 5MB.' }),
});