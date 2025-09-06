import { useState } from "react";
import { useGetCategoriesQuery } from "../store/api/categoryApi";
import { authHelper } from "../helpers/authHelper";
import { Category } from "../types/Category";
import { CategoryCard } from "../components/CategoryCard";
import { CategoryCardSkeleton } from "../components/Skeleton";
import { CreateCategoryCard } from "../components/CreateCategoryCard";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Icons } from "../components/Icon/IconMap";
import { Button } from "../components/Button";
import { ButtonType, ButtonVariant } from "../components/Button/Button.enum";
import { Size } from "../utils/enums";
import { EmptyStateIcon } from "../components/EmptyStateIcon";

function Categories() {
  const [showCreateCard, setShowCreateCard] = useState(false);
  const isUserLoggedIn = authHelper.isUserLoggedIn();
  const { data, isLoading, error, refetch } = useGetCategoriesQuery();

  if (!isUserLoggedIn) return null;

  if (error && !isLoading) {
    return (
      <div className="h-[60vh] max-w-md mx-auto flex items-center">
        <div className="p-8 flex flex-col items-center text-center">
          {/* Error Icon using EmptyStateIcon */}
          <EmptyStateIcon
            icon={Icons.error}
            iconClassName="text-red-500 dark:text-red-400"
            borderColor="border-red-300 dark:border-red-600 mb-6"
            bgColor="bg-red-100 dark:bg-red-900/30"
            size="lg"
          />

          {/* Error Message */}
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Failed to Load Categories</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            We couldn't load your categories at this time. Please check your connection and try again.
          </p>

          {/* Action Button */}
          <Button
            type={ButtonType.solid}
            size={Size.sm}
            variant={ButtonVariant.primary}
            startIcon={Icons.refresh}
            onClick={() => refetch()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const categories = data?.payload?.categories || [];

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-xl font-medium text-zinc-600 dark:text-gray-300 self-start mx-2 mb-4">Categories</h1>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !categories.length && !showCreateCard && (
          <div className="max-w-screen-sm h-[80vh] mx-auto flex flex-col items-center justify-center px-2 gap-4">
            <img src="/assets/images/no-data.png" className="w-[50%]" alt="No categories available" />
            <span className="text-zinc-700 dark:text-gray-300 text-center px-4 text-sm md:text-base">
              No categories available. Categories help organize your tasks better.
            </span>
          </div>
        )}

        {!isLoading && (categories.length > 0 || showCreateCard) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category: Category) => (
              <CategoryCard key={category._id} category={category} />
            ))}

            {showCreateCard && (
              <CreateCategoryCard
                onCancel={() => setShowCreateCard(false)}
                onSuccess={() => setShowCreateCard(false)}
              />
            )}
          </div>
        )}
      </div>

      {!showCreateCard && <FloatingActionButton icon={Icons.add} onClick={() => setShowCreateCard(true)} />}

      <div className="h-16 w-full" />
    </>
  );
}

export default Categories;
