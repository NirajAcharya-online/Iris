import { toast } from "react-toastify";

const notify = {
  warning: (title, message) => {
    toast.warning(
      <div className="flex flex-col font-inter">
        <b className="text-[12px] tracking-[1.5px] uppercase text-black">
          {title}
        </b>
        <span className="text-[11px] mt-1 text-black/70">{message}</span>
      </div>,
      {
        autoClose: 2000,
        icon: false,
        className:
          "!bg-white !rounded-none !border-l-[5px] !border-red-600 !p-5 !shadow-2xl",
        progressClassName: "!bg-red-600",
      },
    );
  },

  success: (title, message) => {
    toast.success(
      <div className="flex flex-col font-inter">
        <b className="text-[12px] tracking-[1.5px] uppercase text-black">
          {title}
        </b>
        <span className="text-[11px] mt-1 text-black/70">{message}</span>
      </div>,
      {
        autoClose: 1000,
        icon: false,
        className:
          "!bg-white !rounded-none !border-l-[5px] !border-[#0047AB] !p-5 !shadow-2xl",
        progressClassName: "!bg-[#0047AB]",
      },
    );
  },

  error: (title, message) => {
    toast.error(
      <div className="flex flex-col font-inter">
        <b className="text-[12px] tracking-[1.5px] uppercase text-black">
          {title}
        </b>
        <span className="text-[11px] mt-1 text-black/70">{message}</span>
      </div>,
      {
        autoClose: 1000,
        icon: false,
        className:
          "!bg-white !rounded-none !border-l-[5px] !border-[#D00000] !p-5 !shadow-2xl",
        progressClassName: "!bg-[#D00000]",
      },
    );
  },
};

export default notify;
