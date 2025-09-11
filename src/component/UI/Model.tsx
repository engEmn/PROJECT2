import { Dialog, Transition } from "@headlessui/react";
import { Fragment, memo, type ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

const Model = ({
  isOpen,
  closeModal,
  title,
  description,
  children,
}: IProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  max-w-lg  transform overflow-hidden rounded-lg bg-white px-10 py-8 text-left align-middle shadow-xl transition-all min-h-[200px]">
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className=" font-medium leading-6 text-2xl font-semibold. text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {description && (
                    <p className="text-base text-gray-500 mt-3">
                      {description}
                    </p>
                  )}

                  <div className="mt-6 px-6">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default memo(Model);
