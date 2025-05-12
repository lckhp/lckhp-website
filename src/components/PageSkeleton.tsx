import React from "react";
import Skeleton from "./Skeleton";

interface PageSkeletonProps {
  type?: "home" | "calendar" | "members" | "resources" | "default";
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ type = "default" }) => {
  const renderHeader = () => (
    <div className="mb-8">
      <Skeleton type="title" className="mb-4" />
      <Skeleton type="text" count={2} className="mb-2" />
    </div>
  );

  const renderHomePageSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      <Skeleton type="image" className="mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton type="image" height={180} className="mb-4" />
              <Skeleton type="title" className="mb-2" width="70%" />
              <Skeleton type="text" count={3} className="mb-2" />
              <Skeleton type="button" className="mt-2" />
            </div>
          ))}
      </div>
    </div>
  );

  const renderCalendarPageSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      <div className="mb-6">
        <Skeleton type="button" width={120} className="mb-4" />
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} type="text" height={30} />
            ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array(35)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} type="card" height={80} />
            ))}
        </div>
      </div>
    </div>
  );

  const renderMembersPageSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 border rounded-lg shadow-sm"
            >
              <Skeleton
                type="avatar"
                width={100}
                height={100}
                className="mb-4"
              />
              <Skeleton type="title" width={180} className="mb-2" />
              <Skeleton type="text" width={150} className="mb-1" />
              <Skeleton type="text" width={130} className="mb-4" />
              <Skeleton type="button" width={100} />
            </div>
          ))}
      </div>
    </div>
  );

  const renderResourcesPageSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <Skeleton type="title" className="mb-3" />
              <Skeleton type="text" count={3} className="mb-2" />
              <div className="flex mt-4">
                <Skeleton type="button" width={120} className="mr-3" />
                <Skeleton type="button" width={120} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderDefaultPageSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      <Skeleton type="image" className="mb-6" />
      <Skeleton type="text" count={6} className="mb-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div>
          <Skeleton type="title" className="mb-3" />
          <Skeleton type="text" count={4} className="mb-2" />
        </div>
        <div>
          <Skeleton type="title" className="mb-3" />
          <Skeleton type="text" count={4} className="mb-2" />
        </div>
      </div>
      <Skeleton type="text" count={4} className="mb-2" />
    </div>
  );

  switch (type) {
    case "home":
      return renderHomePageSkeleton();
    case "calendar":
      return renderCalendarPageSkeleton();
    case "members":
      return renderMembersPageSkeleton();
    case "resources":
      return renderResourcesPageSkeleton();
    default:
      return renderDefaultPageSkeleton();
  }
};

export default PageSkeleton;
