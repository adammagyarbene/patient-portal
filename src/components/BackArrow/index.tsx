import Link from "next/link";

interface Props {
  href: string;
}

const BackArrow: React.FC<Props> = ({ href }) => {
  return (
    <Link href={href}>
      <span className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-150">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.707 3.293a1 1 0 010 1.414L6.414 10l5.293 5.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </span>
    </Link>
  );
};

export default BackArrow;
