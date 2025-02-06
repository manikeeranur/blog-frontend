"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ShareLinkDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerText: string;
  children: ReactNode;
  handleClose?: () => void;
}

const CustomModal: React.FC<ShareLinkDialogProps> = ({
  open,
  setOpen,
  handleClose,
  headerText,
  children,
}) => {
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>{headerText}</DialogTitle>
          {/* <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">{children}</div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose ? handleClose : closeModal}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
