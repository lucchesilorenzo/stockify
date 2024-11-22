"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type MainAlertDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDeleteItem: () => void;
  type: "product" | "task";
};

export default function MainAlertDialog({
  open,
  setOpen,
  onDeleteItem,
  type,
}: MainAlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "product" &&
              "Are you sure you want to archive this product?"}
            {type === "task" && "Are you sure you want to delete this task?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "product" &&
              "This product will be archived. To restore it, you will need to create a new order with the same product name."}
            {type === "task" && "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteItem}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
