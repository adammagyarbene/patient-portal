const Spinner = () => (
  <div className="flex justify-center items-center">
    <svg
      className="animate-spin h-8 w-8 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 4.418 3.582 8 8 8v-2.009a5.994 5.994 0 01-2-1.7z"
      ></path>
    </svg>
  </div>
);

export default Spinner;
