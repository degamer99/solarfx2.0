import Image from "next/image";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Button } from "./button";

interface KycProps {
    kyc: {
        address: string;
        backImageUrl: string;
        city: string;
        date: string;
        documentType: string;
        email: string;
        first: string;
        frontImageUrl: string;
        last: string;
        nationality: string;
        phone: string;
        social: string;
        state: string;
    };
    open: boolean
    // onClose: () => void;
    onClose: any;
}

const KycDialog: React.FC<KycProps> = ({ kyc,open, onClose }) => {
    return (
    <Dialog open={open} onOpenChange={onClose}  >
    <DialogContent>
      <DialogHeader>
        <DialogTitle>        
            <h2 className="text-lg font-bold mb-4">KYC Information</h2>
        </DialogTitle>
      </DialogHeader>

      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 max-h-[60vh] overflow-auto">
        <ul className="space-y-2">
          <li>
            <strong>First Name:</strong> {kyc.first}
          </li>
          <li>
            <strong>Last Name:</strong> {kyc.last}
          </li>
          <li>
            <strong>Email:</strong> {kyc.email}
          </li>
          <li>
            <strong>Phone:</strong> {kyc.phone}
          </li>
          <li>
            <strong>Address:</strong> {kyc.address}, {kyc.city}, {kyc.state}
          </li>
          <li>
            <strong>Nationality:</strong> {kyc.nationality}
          </li>
          <li>
            <strong>Document Type:</strong> {kyc.documentType}
          </li>
          <li>
            <strong>Date:</strong> {kyc.date}
          </li>
          <li>
            <strong>Social:</strong> {kyc.social}
          </li>
        </ul>
        <div className="my-4">
          <h3 className="text-sm font-bold mb-1">Front Image:</h3>
          <Image
            src={kyc.frontImageUrl}
            alt="Front Document"
            className="w-full rounded-md"
            width={200}
            height={200}
          />
        </div>
        <div className="my-4">
          <h3 className="text-sm font-bold mb-1">Back Image:</h3>
          <Image
            src={kyc.backImageUrl}
            alt="Back Document"
            className="w-full rounded-md"
            width={200}
            height={200}
          />
        </div>
      
      </div>
   
          <Button onClick={() => onClose(false)} className="ml-4">
            Close
          </Button>

    </DialogContent>
  </Dialog>

    );
};

export default KycDialog;
