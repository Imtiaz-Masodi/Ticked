import { useGetCategoriesQuery } from "../store/api/categoryApi";
import { authHelper } from "../helpers/authHelper";
import { Category } from "../types/Category";
import CircularLoader from "../components/Loader/CircularLoader/CircularLoader";
import { CategoryCard } from "../components/CategoryCard";

function Categories() {
  const isUserLoggedIn = authHelper.isUserLoggedIn();
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (!isUserLoggedIn) return null;

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <CircularLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <p className="text-red-500 text-center">Error loading categories</p>
      </div>
    );
  }

  const categories = data?.payload?.categories || [];

  if (!categories.length) {
    return (
      <div className="max-w-screen-sm h-[80vh] mx-auto flex flex-col items-center justify-center px-2 gap-4">
        <img
          src="/assets/images/no-data.png"
          className="w-[50%]"
          alt="No categories available"
        />
        <span className="text-zinc-700 text-center px-4 text-sm md:text-base">
          No categories available. Categories help organize your tasks better.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-zinc-600 self-start mx-2 mb-4">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: Category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
