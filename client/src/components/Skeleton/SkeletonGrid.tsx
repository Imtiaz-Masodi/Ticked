import SkeletonBox from "./SkeletonBox";

interface SkeletonGridProps {
  items: number;
  columns: number;
  gap?: string;
  itemHeight?: string;
  itemClassName?: string;
}

function SkeletonGrid({
  items,
  columns,
  gap = "gap-3",
  itemHeight = "h-12",
  itemClassName = "",
}: SkeletonGridProps) {
  const gridColsClass =
    {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    }[columns] || "grid-cols-2";

  return (
    <div className={`grid ${gridColsClass} ${gap}`}>
      {[...Array(items)].map((_, i) => (
        <SkeletonBox
          key={i}
          height={itemHeight}
          rounded="lg"
          className={itemClassName}
        />
      ))}
    </div>
  );
}

export default SkeletonGrid;
