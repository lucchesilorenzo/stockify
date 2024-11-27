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
  onDeleteItem?: () => void;
  onUpdateItemStatus?: () => void;
  status?: string;
  type: "product" | "order" | "task";
};

export default function MainAlertDialog({
  open,
  setOpen,
  onDeleteItem,
  onUpdateItemStatus,
  status,
  type,
}: MainAlertDialogProps) {
  const handleAction =
    type === "product" || type === "order" ? onUpdateItemStatus : onDeleteItem;
  const statusTitleInfo = status === "Archived" ? "restore" : "archive";
  const statusDescriptionInfo = status === "Archived" ? "restored" : "archived";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === "product" &&
              `Are you sure you want to ${statusTitleInfo} this product?`}
            {type === "order" && "Are you sure you want to ship this order?"}
            {type === "task" && "Are you sure you want to delete this task?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {type === "product" &&
              `This product will be ${statusDescriptionInfo}.`}
            {type === "order" && "This order will be shipped."}
            {type === "task" &&
              "This task will be deleted. This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
