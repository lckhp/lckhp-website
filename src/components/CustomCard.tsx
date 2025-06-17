import React from 'react';

interface ImageCardProps {
  imageSrc: string; // URL or path to the image
  title: string;
  description?: string;
  width?: string;
  height?: string;
}

// to change after the final card design
export const ImageCard: React.FC<ImageCardProps> = ({
  imageSrc,
  title,
  description = '',
  width = 'w-64',
  height = 'h-40',
}) => {
  return (
    <div className={`relative ${width} ${height} bg-white shadow-lg rounded-lg overflow-hidden`}>
      <img src={imageSrc} alt={title} className="w-full h-2/3 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
    </div>
  );
};



interface TextCardProps {
  title: string;
  content: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  textColor?: string;
}

// to change after final card design
export const TextCard: React.FC<TextCardProps> = ({
  title,
  content,
  width = 'w-64',
  height = 'h-40',
  backgroundColor = 'bg-white',
  textColor = 'text-gray-900',
}) => {
  return (
    <div className={`relative ${width} ${height} ${backgroundColor} shadow-lg rounded-lg p-4`}>
      <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-sm ${textColor} mt-2`}>{content}</p>
    </div>
  );
};
