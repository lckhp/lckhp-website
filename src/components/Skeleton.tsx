import React from "react";

interface SkeletonProps {
  type?: "text" | "title" | "image" | "card" | "button" | "avatar" | "page";
  width?: string | number;
  height?: string | number;
  count?: number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = "text",
  width,
  height,
  count = 1,
  className = "",
}) => {
  const baseClass = "animate-pulse bg-gray-200 rounded";

  const getSkeletonStyle = () => {
    switch (type) {
      case "text":
        return `${baseClass} h-4 w-full ${className}`;
      case "title":
        return `${baseClass} h-8 w-3/4 ${className}`;
      case "image":
        return `${baseClass} h-48 w-full ${className}`;
      case "card":
        return `${baseClass} h-64 w-full ${className}`;
      case "button":
        return `${baseClass} h-10 w-32 ${className}`;
      case "avatar":
        return `${baseClass} h-12 w-12 rounded-full ${className}`;
      case "page":
        return `${baseClass} min-h-screen w-full ${className}`;
      default:
        return `${baseClass} ${className}`;
    }
  };

  const customStyle = {
    width: width
      ? typeof width === "number"
        ? `${width}px`
        : width
      : undefined,
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : undefined,
  };

  const renderSkeleton = () => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <div
          key={i}
          className={getSkeletonStyle()}
          style={customStyle}
          aria-hidden="true"
        />
      );
    }
    return skeletons;
  };

  return <>{renderSkeleton()}</>;
};

export default Skeleton;
