import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom CSS for the carousel
const carouselStyles = `
  .urgent-needs-carousel .slick-prev,
  .urgent-needs-carousel .slick-next {
    z-index: 10;
    width: 30px;
    height: 30px;
  }
  
  .urgent-needs-carousel .slick-prev {
    left: 10px;
  }
  
  .urgent-needs-carousel .slick-next {
    right: 10px;
  }
  
  .urgent-needs-carousel .slick-prev:before,
  .urgent-needs-carousel .slick-next:before {
    font-size: 24px;
    opacity: 0.8;
    color: #4a5568;
  }
  
  .urgent-needs-carousel .slick-dots {
    bottom: 0px;
  }
  
  .urgent-needs-carousel .slick-dots li button:before {
    color: #4a5568;
    opacity: 0.5;
  }
  
  .urgent-needs-carousel .slick-dots li.slick-active button:before {
    color: #4a5568;
    opacity: 1;
  }
`;

// Import JSON data for each category
import bloodBankData from "../assets/directory/blood_bank/blood_bank.json";
import oldAgeHomeData from "../assets/directory/old_age_home/old_age_home.json";
import orphanageData from "../assets/directory/orphanage/orphanage.json";
import urgentNeedsData from "../assets/directory/urgent_needs/urgent_needs.json";

// Import first images for urgent needs
import urgentNeed1FirstImage from "../assets/directory/urgent_needs/images/1/1.jpg";

// Map of first images for each urgent need
const urgentNeedFirstImages: Record<string, string> = {
  "1": urgentNeed1FirstImage,
  // Add more as needed
};

// Define the type for directory items
interface DirectoryItem {
  id: string;
  name: string;
  type: string;
  location: string;
  contact_number: string;
  alt_contact_number?: string;
  needs?: string;
  attention_level?: string;
  last_updated?: string;
}

// Additional fields for urgent needs
interface UrgentNeedItem extends DirectoryItem {
  description?: string;
  slogan?: string;
  financial_details?: string;
  contact_person?: string;
  status?: string;
  view_more_redirect_url?: string;
}

interface DonateListProps {
  category: string;
}

const DonateList: React.FC<DonateListProps> = ({ category }): JSX.Element => {
  const [data, setData] = useState<DirectoryItem[]>([]);
  const [filteredData, setFilteredData] = useState<DirectoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [itemsWithNeeds, setItemsWithNeeds] = useState<DirectoryItem[]>([]);
  const [showImagesForItem, setShowImagesForItem] = useState<string | null>(
    null
  );
  // State to store dynamically loaded images
  const [itemImages, setItemImages] = useState<Record<string, string[]>>({});

  // Full-page image viewer states
  const [showFullImageViewer, setShowFullImageViewer] = useState(false);
  const [currentFullImage, setCurrentFullImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageSet, setCurrentImageSet] = useState<string[]>([]);

  // Helper function to create Google Maps search URL
  const createGoogleMapsUrl = (item: DirectoryItem) => {
    const query = encodeURIComponent(`${item.name}, ${item.location}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Helper function to dynamically load images when needed
  const loadImagesForItem = async (id: string) => {
    try {
      // Using dynamic import with a regular expression to get all images for the given ID
      const imageContext = import.meta.glob(
        "/src/assets/directory/urgent_needs/images/*/*.jpg"
      );
      const folderPath = `/src/assets/directory/urgent_needs/images/${id}/`;

      // Track promises for all matching images
      const imagePromises: Promise<string>[] = [];

      // Create a promise for each matching image path
      for (const path in imageContext) {
        if (path.startsWith(folderPath)) {
          // Skip the first image as it's already imported directly
          if (!path.endsWith(`/${id}/1.jpg`)) {
            const loadImage = async () => {
              const module = await imageContext[path]();
              return (module as any).default || module;
            };
            imagePromises.push(loadImage());
          }
        }
      }

      // Wait for all images to load
      const loadedImages = await Promise.all(imagePromises);

      // Update state with loaded images
      setItemImages((prev) => ({
        ...prev,
        [id]: loadedImages,
      }));
    } catch (error) {
      console.error(`Error loading images for item ${id}:`, error);
      // Set empty array for this item to avoid repeated loading attempts
      setItemImages((prev) => ({
        ...prev,
        [id]: [],
      }));
    }
  };

  // Preload images for urgent needs when the component renders and category is urgent_needs
  useEffect(() => {
    if (category === "urgent_needs") {
      // For now, just preload images for ID 1
      loadImagesForItem("1");
    }
  }, [category]);

  // Helper function to format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";

    // Format: YYYY/MM/DD to DD MMM YYYY
    const [year, month, day] = dateString
      .split("/")
      .map((num) => parseInt(num));

    if (isNaN(year) || isNaN(month) || isNaN(day)) return dateString;

    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Load the appropriate data based on the category
  useEffect(() => {
    let categoryData: DirectoryItem[] = [];

    switch (category) {
      case "blood_bank":
        categoryData = bloodBankData as DirectoryItem[];
        break;
      case "old_age_home":
        categoryData = oldAgeHomeData as DirectoryItem[];
        break;
      case "orphanage":
        categoryData = orphanageData as DirectoryItem[];
        break;
      case "urgent_needs":
        // Filter only active urgent needs
        categoryData = (urgentNeedsData as UrgentNeedItem[]).filter(
          (item) => item.status === "active"
        ) as DirectoryItem[];

        // Preload images for all urgent needs
        categoryData.forEach((item) => {
          loadImagesForItem(item.id);
        });
        break;
      default:
        categoryData = [];
    }

    // Sort by attention_level (higher values first)
    const sortedData = [...categoryData].sort((a, b) => {
      const levelA = parseInt(a.attention_level || "0");
      const levelB = parseInt(b.attention_level || "0");
      return levelB - levelA;
    });

    setData(sortedData);
    setFilteredData(sortedData);

    // Extract items with needs
    const needsItems = sortedData.filter(
      (item) => item.needs && item.needs.trim() !== ""
    );
    setItemsWithNeeds(needsItems);

    // Extract unique districts from the data
    const uniqueDistricts = new Set<string>();
    categoryData.forEach((item) => {
      const locationParts = item.location.split(",");
      if (locationParts.length > 0) {
        const district = locationParts[locationParts.length - 1].trim();
        uniqueDistricts.add(district);
      }
    });

    setDistricts(Array.from(uniqueDistricts).sort());
  }, [category]);

  // Filter data based on search term and selected district
  useEffect(() => {
    let result = data;

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearchTerm) ||
          item.location.toLowerCase().includes(lowerSearchTerm) ||
          item.contact_number.includes(searchTerm)
      );
    }

    if (selectedDistrict) {
      result = result.filter((item) =>
        item.location.includes(selectedDistrict)
      );
    }

    setFilteredData(result);
  }, [searchTerm, selectedDistrict, data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district === selectedDistrict ? null : district);
  };

  // When show images is clicked, load images if they're not already loaded
  const handleImagesClick = (itemId: string) => {
    // Toggle image visibility
    if (showImagesForItem === itemId) {
      setShowImagesForItem(null);
    } else {
      setShowImagesForItem(itemId);
      // If we don't already have images for this item, load them
      if (!itemImages[itemId]) {
        loadImagesForItem(itemId);
      }
    }
  };

  const handleViewMore = (url?: string) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Handle opening the full-page image viewer
  const openFullImageViewer = (images: string[], index: number) => {
    setCurrentImageSet(images);
    setCurrentImageIndex(index);
    setCurrentFullImage(images[index]);
    setShowFullImageViewer(true);
    // Prevent scrolling when viewer is open
    document.body.style.overflow = "hidden";
  };

  // Handle closing the full-page image viewer
  const closeFullImageViewer = () => {
    setShowFullImageViewer(false);
    setCurrentFullImage(null);
    // Restore scrolling
    document.body.style.overflow = "auto";
  };

  // Navigate to the next image
  const goToNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % currentImageSet.length;
    setCurrentImageIndex(nextIndex);
    setCurrentFullImage(currentImageSet[nextIndex]);
  };

  // Navigate to the previous image
  const goToPrevImage = () => {
    const prevIndex =
      (currentImageIndex - 1 + currentImageSet.length) % currentImageSet.length;
    setCurrentImageIndex(prevIndex);
    setCurrentFullImage(currentImageSet[prevIndex]);
  };

  // Handle keyboard events for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showFullImageViewer) return;

      switch (e.key) {
        case "Escape":
          closeFullImageViewer();
          break;
        case "ArrowRight":
          goToNextImage();
          break;
        case "ArrowLeft":
          goToPrevImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showFullImageViewer, currentImageIndex, currentImageSet]);

  // Function to render urgent needs
  const renderUrgentNeedsItem = (item: UrgentNeedItem) => {
    // Get the first image from our direct imports map
    const firstImage = urgentNeedFirstImages[item.id];

    // Create an array of all images for the carousel
    const allImages = firstImage
      ? [firstImage, ...(itemImages[item.id] || [])]
      : itemImages[item.id] || [];

    // Carousel settings
    const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      pauseOnHover: true,
      arrows: true,
      adaptiveHeight: true,
    };

    return (
      <div
        key={item.id}
        className="rounded-lg border border-amber-300 bg-white p-5 shadow-md transition-all hover:shadow-lg"
      >
        <h3 className="mb-3 text-xl font-bold text-gray-800">{item.name}</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left column - Description and Contact info */}
          <div className="space-y-3">
            {/* Description */}
            {item.description && (
              <div className="mb-4 text-gray-700 whitespace-pre-line">
                {item.description}
              </div>
            )}

            {/* Slogan */}
            {item.slogan && (
              <div className="mb-4 italic text-amber-700 font-medium whitespace-pre-line">
                "{item.slogan}"
              </div>
            )}

            {/* Contact info section */}
            <div className="space-y-3 mt-4">
              {/* Location */}
              <div className="flex items-start text-gray-700">
                <svg
                  className="mr-2 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-700">{item.location}</span>
              </div>

              {/* Contact Person */}
              {item.contact_person && (
                <div className="flex items-start text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{item.contact_person}</span>
                </div>
              )}

              {/* Contact Number */}
              <div className="flex items-start text-gray-700">
                <svg
                  className="mr-2 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${item.contact_number}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.contact_number}
                </a>
              </div>

              {/* Alt Contact Number */}
              {item.alt_contact_number && (
                <div className="ml-7">
                  <a
                    href={`tel:${item.alt_contact_number}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.alt_contact_number}
                  </a>
                </div>
              )}

              {/* Needs */}
              {item.needs && (
                <div className="flex items-start text-amber-700">
                  <svg
                    className="mr-2 h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-medium">Needs:</span> {item.needs}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column - Image carousel and financial details */}
          <div className="space-y-4">
            {/* Image carousel */}
            <div className="h-48 w-full rounded-lg border border-gray-200 bg-gray-50 overflow-hidden">
              {allImages.length > 0 ? (
                <Slider
                  {...carouselSettings}
                  className="h-full urgent-needs-carousel"
                >
                  {allImages.map((imgSrc, index) => (
                    <div key={`carousel-${item.id}-${index}`} className="h-48">
                      <div className="h-full w-full flex items-center justify-center">
                        <img
                          src={imgSrc}
                          alt={`${item.name} - Image ${index + 1}`}
                          className="h-full max-h-48 object-contain mx-auto cursor-pointer transition-transform hover:scale-105"
                          onClick={() => openFullImageViewer(allImages, index)}
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
                  <span>No images available</span>
                </div>
              )}
            </div>

            {/* Financial details */}
            {item.financial_details && (
              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Donation Details
                </h4>
                <div className="text-gray-700 whitespace-pre-line">
                  {item.financial_details}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Last updated date */}
        {item.last_updated && (
          <div className="mt-3 text-right text-xs text-gray-500">
            Last updated: {formatDate(item.last_updated)}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-4 flex flex-wrap gap-3">
          {allImages.length > 1 && (
            <button
              onClick={() => handleImagesClick(item.id)}
              className="rounded-md bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {showImagesForItem === item.id ? "Hide Images" : "View Images"}
            </button>
          )}

          {item.view_more_redirect_url && (
            <button
              onClick={() => handleViewMore(item.view_more_redirect_url)}
              className="rounded-md bg-amber-500 px-4 py-2 text-white transition-all hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              View Details
            </button>
          )}
        </div>

        {/* Images section - only show if there are multiple images */}
        {showImagesForItem === item.id && allImages.length > 1 && (
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
            <h4 className="mb-3 font-medium text-gray-800">
              Full Image Gallery
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allImages.map((imgSrc, index) => (
                <div
                  key={`gallery-${item.id}-${index}`}
                  className="overflow-hidden rounded-lg shadow-md bg-gray-50"
                >
                  <div className="h-40 w-full flex items-center justify-center p-2">
                    <img
                      src={imgSrc}
                      alt={`${item.name} - Image ${index + 1}`}
                      className="max-h-full max-w-full object-contain transition-transform hover:scale-105 cursor-pointer"
                      loading="lazy"
                      onClick={() => openFullImageViewer(allImages, index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Add custom carousel styles */}
      <style dangerouslySetInnerHTML={{ __html: carouselStyles }} />

      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {category === "blood_bank"
          ? "Blood Banks"
          : category === "old_age_home"
          ? "Old Age Homes"
          : category === "urgent_needs"
          ? "Urgent Needs"
          : "Orphanages"}
      </h2>

      {/* Needs Section - Only for old_age_home and orphanage */}
      {(category === "old_age_home" || category === "orphanage") &&
        itemsWithNeeds.length > 0 && (
          <div className="mb-8 rounded-lg bg-amber-50 p-5 border-l-4 border-amber-500">
            <h3 className="mb-3 text-xl font-semibold text-amber-800">
              Urgent Needs
            </h3>
            <div className="space-y-3">
              {itemsWithNeeds.map((item) => (
                <div
                  key={`need-${item.id}`}
                  className="rounded bg-white p-3 shadow-sm"
                >
                  <a
                    href={createGoogleMapsUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-gray-800 hover:text-blue-600 transition-colors cursor-pointer inline-block"
                  >
                    {item.name}
                  </a>
                  <div className="grid grid-cols-1 gap-1 mt-1 md:grid-cols-2">
                    <div className="flex items-start text-gray-700">
                      <svg
                        className="mr-1 h-4 w-4 text-gray-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <a
                        href={createGoogleMapsUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {item.location}
                      </a>
                    </div>
                    <div className="flex items-start text-gray-700">
                      <svg
                        className="mr-1 h-4 w-4 text-gray-500 mt-1 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <a
                        href={`tel:${item.contact_number}`}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.contact_number}
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-amber-700 justify-between">
                    <div className="flex items-center">
                      <svg
                        className="mr-1 h-4 w-4 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Needs: {item.needs}</span>
                    </div>
                    {item.last_updated && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg
                          className="mr-1 h-3.5 w-3.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1.4 1v1H3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-1.6V3a1 1 0 00-2 0v1H8V3a1 1 0 00-2 0v1zm1 5a1 1 0 011 1v3a1 1 0 11-2 0V8a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Updated: {formatDate(item.last_updated)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Search and filter section - Don't show for urgent_needs if there's only a few items */}
      {category !== "urgent_needs" || filteredData.length > 3 ? (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Search by name, location or phone
            </label>
            <input
              type="text"
              id="search"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {districts.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Filter by district
              </label>
              <div className="flex flex-wrap gap-2">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => handleDistrictSelect(district)}
                    className={`rounded-full px-3 py-1 text-sm transition-colors ${
                      selectedDistrict === district
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Results count - Don't show for urgent_needs if there's only a few items */}
      {(category !== "urgent_needs" || filteredData.length > 3) && (
        <p className="mb-4 text-gray-600">
          Showing {filteredData.length} of {data.length} results
        </p>
      )}

      {/* Directory items list */}
      {category === "urgent_needs" ? (
        <div className="space-y-6">
          {filteredData.map((item) =>
            renderUrgentNeedsItem(item as UrgentNeedItem)
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-green-200 hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                {item.name}
              </h3>
              <div className="space-y-2">
                <div className="flex items-start text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <a
                    href={createGoogleMapsUrl(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.location}
                  </a>
                </div>
                <div className="flex items-start text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${item.contact_number}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {item.contact_number}
                  </a>
                </div>
                {item.alt_contact_number && (
                  <div className="mt-1">
                    <a
                      href={`tel:${item.alt_contact_number}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {item.alt_contact_number}
                    </a>
                  </div>
                )}
                {item.needs && (
                  <div className="mt-1 flex items-start text-amber-700">
                    <svg
                      className="mr-2 h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">Needs:</span> {item.needs}
                    </div>
                  </div>
                )}
                {item.last_updated && (
                  <div className="text-right text-xs text-gray-500">
                    Last verified: {formatDate(item.last_updated)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="my-8 rounded-lg bg-gray-100 p-4 text-center text-gray-700">
          No results match your search criteria. Please try a different search
          term or filter.
        </div>
      )}

      {/* Full-page image viewer */}
      {showFullImageViewer && currentFullImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          {/* Close button */}
          <button
            onClick={closeFullImageViewer}
            className="absolute top-4 right-4 z-50 rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-70"
            aria-label="Close image viewer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Previous button */}
          <button
            onClick={goToPrevImage}
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Next button */}
          <button
            onClick={goToNextImage}
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-70"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black bg-opacity-50 px-3 py-1 text-sm text-white">
            {currentImageIndex + 1} / {currentImageSet.length}
          </div>

          {/* Image */}
          <img
            src={currentFullImage}
            alt={`Full size image ${currentImageIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default DonateList;
