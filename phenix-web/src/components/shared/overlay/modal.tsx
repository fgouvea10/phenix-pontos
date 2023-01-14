import { ReactNode } from "react";
import { Dialog as HeadlessDialog } from "@headlessui/react";
import clsx from "clsx";

interface DialogProps {
  children: ReactNode;
}

interface ModalProps extends DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DialogTitle(props: DialogProps) {
  return (
    <HeadlessDialog.Title className="font-regular text-stone-800 text-xl">
      {props.children}
    </HeadlessDialog.Title>
  );
}

export function DialogDescription(props: DialogProps) {
  return (
    <HeadlessDialog.Description className="leading-relaxed mt-4 font-light text-stone-600">
      {props.children}
    </HeadlessDialog.Description>
  );
}

export function DialogActions(props: DialogProps) {
  return (
    <div className="w-full flex items-center gap-4 mt-4">{props.children}</div>
  )
}

export function DialogPanel(props: DialogProps) {
  return <HeadlessDialog.Panel>{props.children}</HeadlessDialog.Panel>;
}

export function Dialog(props: ModalProps) {
  return (
    <HeadlessDialog
      open={props.isOpen}
      onClose={props.onClose}
      as="div"
      className={clsx(
        "fixed inset-0 z-10 overflow-y-auto flex justify-center items-center",
        {
          "bg-stone-800": props.isOpen === true,
          "bg-opacity-90": props.isOpen === true,
        }
      )}
    >
      <div className="flex flex-col bg-white border border-gray-100 rounded-lg text-stone-700 w-[472px] py-8 px-4">
        <HeadlessDialog.Overlay />
        {props.children}
      </div>
    </HeadlessDialog>
  );
}
