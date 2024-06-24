import { Link } from "react-router-dom";

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = "#",
}) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-14 w-20" src="./fevicon.png" />
      </div>
      <h2 className="mt-6 text-center text-3xl font-light text-white">
        {heading}
      </h2>
      <p className=" text-center text-sm text-gray-100 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-red-600 hover:text-black"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
}
