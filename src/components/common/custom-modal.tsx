"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

import { ReactNode } from "react";

interface ShareLinkDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  headerText?: string;
  children?: ReactNode;
  headerComponent?: ReactNode;
  footerComponent?: ReactNode;
  className?: string;
  handleClose?: any;
}

const CustomModal: React.FC<ShareLinkDialogProps> = ({
  open,
  setOpen,
  headerText,
  children,
  headerComponent,
  footerComponent,
  className,
  handleClose,
}) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent
        className={`!p-0 ${
          className ? className : "sm:max-w-[50%] md:max-w-[90%]"
        }`}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="w-full flex-row justify-between items-center p-3">
          <DialogTitle className="hidden"></DialogTitle>
          {headerComponent ? (
            headerComponent
          ) : (
            <>
              <DialogTitle>{headerText}</DialogTitle>
              <X className="cursor-pointer" onClick={() => handleClose()} />
            </>
          )}
        </DialogHeader>

        <div className="max-h-[80vh] overflow-auto no-scrollbar">
          {children}
        </div>
        <DialogFooter className="w-full p-3 border-t">
          {footerComponent}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
