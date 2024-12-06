// components/IDVerificationForm.tsx
"use client"
import { auth, firestore, storage } from '@/components/firebase';
import CopyInput from '@/components/ui/copyinput';
import FormWrapper from '@/components/ui/form-wrapper';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';

const IDVerificationForm: React.FC = () => {
 let frontImage: any
 let backImage: any
  let imageFile = {
    frontImage,
      backImage
  }
  const [isSending, setIsSending] = useState("Submit")
  // const [isSending, setIsSending] = useState("Submit")

  useEffect( () => {

  }, [isSending, ])

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const name = e.target.name;
    console.log(e.target.name, e.target.files[0])

    // Check if a file is selected and it is an image
    if (file && file.type.startsWith('image/')) {
      // Do something with the selected image file
      console.log(file)
      imageFile = {...imageFile, [name]: file}
      // setFile( oldData => {
      //   return {...oldData, [name]: file }
      // })
      // setFile({[name]: file})
      // onFileChange(file);
    } else {
      // Handle non-image file selection (you can show an error message or perform other actions)
      console.error('Please select a valid image file.');
      alert('Please select a valid image file.');
    }

  }
  const handleKyc = (data: object) => {
    setIsSending("Submitting ...")
    console.log({...data, ...imageFile})

 
    onAuthStateChanged(auth, async (user) => {
      if (user == null) return
      console.log(user)
      const userRef = doc(firestore, "users", user?.uid);
    let frontImageUrl: string = " "
    let backImageUrl: string = " "
      try {
        const frontImage = imageFile.frontImage
        const backImage = imageFile.backImage
        const frontImageRef = ref(storage, "kyc/" + `${user.uid}front`)
        const backImageRef = ref(storage, "kyc/" + `${user.uid}back`)
       await uploadBytes(frontImageRef, frontImage).then(async () => {
         frontImageUrl = await getDownloadURL(frontImageRef)
       })
       await uploadBytes(backImageRef, backImage).then(async () => {
         backImageUrl = await getDownloadURL(backImageRef)

       })
        //  cosnt frontImageUrl = await
          
      } catch (error) {
        console.error(error)
      } finally {
       console.log({...data}, frontImageUrl, backImageUrl)
       
       await setDoc(userRef, {kyc: {...data, frontImageUrl, backImageUrl}}, { merge: true }).then(() => {
        setIsSending("Submit")
      });

      }
    })


  // const expertRef = doc(firestore, "expert", `${data.first} ${data.last}`);

    //   console.log("hello", formData)
    //   try {
    //     uploadBytes(imageRef, file).then(async () => {
    //      await getDownloadURL(imageRef).then( async (link) => {
    //        console.log(link)
    //           // Directly include `link` in the data passed to Firestore
    // const updatedData = { ...formData, image: link };
    //       //  setFormData((prevState) => ({
    //       //   ...prevState,
    //       //   paymentQrcode: link, // Replace "newValue" with the actual value you want to set
    //       // }));
    //       console.log(updatedData)
    //       await setDoc(expertRef, updatedData, { merge: true }).then(() => {
    //         setIsSending("Submit")
    //       });

    //      });
        
    //     })

    //   } catch (error) {
    //   }
  }
  return (
    <div>
      <br />
      <div className="max-w-[90vw] mx-auto p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Begin your ID-Verification</h1>
        <p className="text-center text-gray-600 mb-8">
          To comply with regulation, each participant will have to go through identity verification (KYC/AML) to prevent fraud causes.
        </p>
        <FormWrapper onSubmit={handleKyc} buttonText={isSending}>
          {/* Personal Details */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Personal Details</legend>
            <p className="text-sm text-gray-500 mb-4">
              Your simple personal information required for identification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name='first' type='text' label='First Name' placeholder='First Name' required />
              <Input name='last' type='text' label='Last Name' placeholder='Last Name' required />
              <Input name='email' type='email' label='Email Address' placeholder='Email Address' required />
              <Input name='phone' type='tel' label='Phone Number' placeholder='Phone Number' required />
              <Input name='date' type='date' label='Date of Birth' placeholder='Phone Number' required />
              <Input name='social' type='text' label='Twitter or Facebook Username' placeholder='Twitter or Facebook Username' required />
            </div>
          </fieldset>

          {/* Address Details */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Your Address</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="address" type="text" placeholder="Address line" required className="p-2 border rounded-md" />
              <Input name="city" type="text" placeholder="City" required className="p-2 border rounded-md" />
              <Input name="state" type="text" placeholder="State" required className="p-2 border rounded-md" />
              <Input name="nationality" type="text" placeholder="Nationality" required className="p-2 border rounded-md" />
            </div>
          </fieldset>

          {/* Document Upload */}
          <fieldset className="mb-6">
            <legend className="font-semibold text-lg mb-2">Document Upload</legend>
            <p className="text-sm text-gray-500 mb-4">
              Your simple personal document required for identification.
            </p>
            <div className="flex space-x-4 mb-4">
              <Select name='documentType' required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='id/passport'>ID/Passport</SelectItem>
                  <SelectItem value='nationalId'>National ID</SelectItem>
                  <SelectItem value='DriversLicense'>Driver&apos;s License</SelectItem>
                </SelectContent>
              </Select>

            </div>

            <div>
              <p className="text-sm text-gray-600 mb-4">
                To avoid delays when verifying your account, please make sure your document meets the criteria below:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Document should not be expired.</li>
                <li>Chosen document should match the provided details.</li>
                <li>Document must be in good condition and clearly visible.</li>
                <li>Make sure there is no light glare on the document.</li>
              </ul>
            <br />
            </div>
            <Input label='Upload front side' name='frontImage'  type="file" onChange={handleImageChange} required />
            <Input label='Upload back side' name='backImage'  type="file" onChange={handleImageChange} required />

          </fieldset>

          {/* Checkbox and Submit */}
          <div className='flex items-center gap-2'>
            <Input type='checkbox' className='h-min' required />
            <span className="text-gray-700">All the information I have entered is correct.</span>
          </div>
        </FormWrapper>


      </div>
    </div>
  );
};

export default IDVerificationForm;
