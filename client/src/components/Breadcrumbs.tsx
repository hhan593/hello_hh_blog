import { Link, useLocation } from "react-router-dom";
import { generateBreadcrumbs, getCategoryName } from "../utils/util";
const Breadcrumbs = () => {
  const { search } = useLocation();

  const params = generateBreadcrumbs(search);

  return (
    params && (
      <div className="flex mt-4 items-center gap-2 text-gray-600">
        <Link to="/">主页</Link>
        <span>/</span>
        <span className="text-blue-800">{getCategoryName(params)}</span>
      </div>
    )
  );
};
export default Breadcrumbs;
