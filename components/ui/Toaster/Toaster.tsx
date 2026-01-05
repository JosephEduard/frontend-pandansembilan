import { ReactNode } from "react";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";

const iconList: { [key: string]: ReactNode } = {
  success: <CiCircleCheck className="text-success-500 text-3xl" />,
  error: <CiCircleRemove className="text-danger-500 text-3xl" />,
};

interface PropTypes {
  type: string;
  message: string;
}

const Toaster = (props: PropTypes) => {
  const { message, type } = props;

  return (
    <div
      aria-labelledby="toaster-label"
      className="fixed top-33 right-50 z-50 max-w-xs rounded-xl border border-gray-200 bg-white shadow-sm"
      role="alert"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p className="text-sm text-gray-700" id="toaster-label">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;
