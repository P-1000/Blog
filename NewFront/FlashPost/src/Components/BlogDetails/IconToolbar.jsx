import React from "react";

const ICONS = [
  {
    icon: (
      <svg
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current text-slate-800"
      >
        <path
          d="M11 19C12 19 21 14.0002 21 7.00043C21 3.50057 18 1.04405 15 1.00065C13.5 0.978943 12 1.50065 11 3.00059C10 1.50065 8.47405 1.00065 7 1.00065C4 1.00065 1 3.50057 1 7.00043C1 14.0002 10 19 11 19Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
    key: "like",
  },
  {
    icon: (
      <svg
        className="h-4 w-4 stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 10.6667H9.83333M6.5 7.75H12.3333M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 9.99762 1.69478 10.9497 2.04839 11.8204C2.11606 11.9871 2.1499 12.0704 2.165 12.1377C2.17976 12.2036 2.18516 12.2524 2.18517 12.3199C2.18518 12.3889 2.17265 12.4641 2.14759 12.6145L1.65344 15.5794C1.60169 15.8898 1.57582 16.0451 1.62397 16.1573C1.66611 16.2556 1.7444 16.3339 1.84265 16.376C1.95491 16.4242 2.11015 16.3983 2.42063 16.3466L5.38554 15.8524C5.53591 15.8273 5.61109 15.8148 5.68011 15.8148C5.74763 15.8148 5.79638 15.8202 5.86227 15.835C5.92962 15.8501 6.01294 15.8839 6.17958 15.9516C7.05025 16.3052 8.00238 16.5 9 16.5Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
    key: "comment",
  },
  {
    icon: (
      <svg
        viewBox="0 0 16 20"
        className="h-4 w-4 scale-[0.97] stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.2 19V5.8C15.2 4.11984 15.2 3.27976 14.8731 2.63803C14.5854 2.07354 14.1265 1.6146 13.562 1.32698C12.9203 1 12.0802 1 10.4 1H5.60005C3.91989 1 3.07981 1 2.43808 1.32698C1.87359 1.6146 1.41465 2.07354 1.12703 2.63803C0.800049 3.27976 0.800049 4.11984 0.800049 5.8V19L5.85342 16.4733C6.64052 16.0798 7.03406 15.883 7.44686 15.8055C7.81246 15.737 8.18764 15.737 8.55324 15.8055C8.96603 15.883 9.35959 16.0798 10.1467 16.4733L15.2 19Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
    key: "bookmark",
  },
  {
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current text-slate-800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99992 11.6667C11.1045 11.6667 11.9999 10.7713 11.9999 9.66667C11.9999 8.5621 11.1045 7.66667 9.99992 7.66667C8.89535 7.66667 7.99992 8.5621 7.99992 9.66667C7.99992 10.7713 8.89535 11.6667 9.99992 11.6667Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M2.7841 13.5263C3.84078 12.3184 5.33577 11.6667 10 11.6667C14.6642 11.6667 16.1592 12.3184 17.2159 13.5263"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M15.8333 6.66667C16.7538 6.66667 17.5 5.92047 17.5 5C17.5 4.07953 16.7538 3.33333 15.8333 3.33333C14.9129 3.33333 14.1667 4.07953 14.1667 5C14.1667 5.92047 14.9129 6.66667 15.8333 6.66667Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M19 9.16667C18.3738 8.41715 17.4266 8.05556 15.8333 8.05556C14.24 8.05556 13.2928 8.41715 12.6667 9.16667"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M4.16667 6.66667C5.08714 6.66667 5.83333 5.92047 5.83333 5C5.83333 4.07953 5.08714 3.33333 4.16667 3.33333C3.24619 3.33333 2.5 4.07953 2.5 5C2.5 5.92047 3.24619 6.66667 4.16667 6.66667Z"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M7.33333 9.16667C6.70719 8.41715 5.75998 8.05556 4.16667 8.05556C2.57336 8.05556 1.62615 8.41715 1 9.16667"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
    key: "share",
  },
  {
    icon: (
      <svg
        viewBox="0 0 16 16"
        className="h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current text-slate-800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.00065 8C8.18414 8 8.33301 7.85114 8.33301 7.66667C8.33301 7.48219 8.18414 7.33333 8.00065 7.33333C7.81716 7.33333 7.66829 7.48219 7.66829 7.66667C7.66829 7.85114 7.81716 8 8.00065 8Z"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M8.00065 4C8.18414 4 8.33301 3.85114 8.33301 3.66667C8.33301 3.48219 8.18414 3.33333 8.00065 3.33333C7.81716 3.33333 7.66829 3.48219 7.66829 3.66667C7.66829 3.85114 7.81716 4 8.00065 4Z"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M8.00065 12C8.18414 12 8.33301 11.8511 8.33301 11.6667C8.33301 11.4822 8.18414 11.3333 8.00065 11.3333C7.81716 11.3333 7.66829 11.4822 7.66829 11.6667C7.66829 11.8511 7.81716 12 8.00065 12Z"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    ),
    key: "more",
  },
];

const ToolbarIcon = ({ onLike, onComment, onBookmark, onShare, onMore }) => {
  const handlers = {
    like: onLike,
    comment: onComment,
    bookmark: onBookmark,
    share: onShare,
    more: onMore,
  };

  return (
    <div className="flex items-center justify-between w-full">
      {ICONS.map(({ icon, key }) => (
        <button
          key={key}
          className="p-2 sm:p-3 hover:bg-slate-300/30 rounded-lg transition duration-200"
          onClick={handlers[key]}
        >
          {icon}
        </button>
      ))}
    </div>
  );
};

export default ToolbarIcon;
