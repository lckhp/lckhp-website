import React from 'react';

interface CustomButtonProps {
  onClick: () => void;
  title?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  size?: string;
  isLoading?: boolean;
  className?: string;
  border?: boolean;
  large?: boolean;
  textColor?: string;
  upperCase?: boolean;
  height?: string;
  disable?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  title = '',
  icon = null,
  bgColor = 'bg-blue-500',
  size = 'w-56',
  isLoading = false,
  className = '',
  border = false,
  large = false,
  textColor = 'text-white',
  upperCase = true,
  height = 'h-12',
  disable = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center ${size} ${height} ${bgColor} ${border ? 'border-2' : ''} ${disable ? 'opacity-50 cursor-not-allowed' : ''} ${className} ${large ? 'py-4' : 'py-2'} rounded-md`}
      disabled={isLoading || disable}
      style={{
        textTransform: upperCase ? 'uppercase' : 'capitalize',
      }}
    >
      {isLoading ? (
        <span className="loader"></span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          <span className={`font-bold tracking-wide ${textColor}`}>{title}</span>
        </>
      )}
    </button>
  );
};


interface ImageButtonProps {
  img?: React.ReactNode;
  onClick?: () => void;
  title?: string;
  size?: string;
  height?: string;
  bgColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  textColor?: string;
  className?: string;
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  img = null,
  title = '',
  onClick = () => void 0,
  bgColor = 'bg-blue-100',
  textColor = 'text-black',
  isLoading = false,
  isDisabled = false,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 ${bgColor} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} rounded-md p-2 ${className}`}
      disabled={isLoading || isDisabled}
    >
      {img && <span className="mr-2">{img}</span>}
      <span className={`font-medium ${textColor}`}>{title}</span>
      {isLoading && <span className="loader"></span>}
    </button>
  );
};



