import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";

function TestIcons({ report }) {
  return (
    <div>
      <div className="flex justify-center mt-6 py-4">
        <Link
          to={`/TestsReports/${report?.body?.project_name}`}
          className="px-3"
        >
          <FaThumbsUp
            size={40}
            style={{ border: "1px solid" }}
            color={"green"}
            className="p-2 rounded-full"
          />
        </Link>
      </div>
      <div className="flex justify-center mt-6 py-4">
        <Link to="/FailedTest" state={{ report: report }} className="px-3">
          <FaThumbsDown
            size={40}
            color={"red"}
            style={{ border: "1px solid" }}
            className="p-2 rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}
export default TestIcons;
