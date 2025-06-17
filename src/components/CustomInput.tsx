import React, { useState } from 'react';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  errorMessage?: string;
  isError?: boolean;
  isPassword?: boolean;
  keyboardType?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  isOutline?: boolean;
  isHalf?: boolean;
  multiline?: boolean;
  width?: string;  // Accepts 'full', '1/2', '1/4', or a custom value like '250px'
  height?: string;
}

export const CustomInput: React.FC<InputProps> = ({
  placeholder,
  errorMessage,
  isError = false,
  isPassword = false,
  onChange,
  value = '',
  keyboardType = 'text',
  disabled = false,
  leftIcon = null,
  isOutline = false,
  isHalf = false,
  multiline = false,
  width = 'full', // Default to 'full'
  height,
}) => {
  const [hide, setHide] = useState<boolean>(true);

  // Determine the width class or style
  const widthClass = width === 'full'
    ? 'w-full'
    : width === '1/2'
    ? 'w-1/2'
    : width === '1/4'
    ? 'w-1/4'
    : ''; // For custom values, we'll handle this with inline styles

  return (
    <div
      className={`relative mt-2 ${isHalf ? 'w-1/2' : widthClass}`}
      style={{ width: !widthClass ? width : undefined }}  // Use inline style for custom widths
    >
      {leftIcon && <span className="absolute left-2 top-3">{leftIcon}</span>}
      <input
        type={isPassword && hide ? 'password' : keyboardType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full text-black p-2 ${leftIcon ? 'pl-10' : ''} 
          ${height ? `h-${height}` : multiline ? 'h-24' : 'h-10'} 
          ${isOutline ? 'border-2' : 'border'} 
          ${isError ? 'border-red-500' : 'border-gray-300'} 
          rounded-lg ${disabled ? 'bg-gray-100' : 'bg-white'}
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
        disabled={disabled}
        multiple={multiline}
      />
      {isPassword && (
        <span
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => setHide(!hide)}
        >
          {hide ? '🙈' : '🙉'}
        </span>
      )}
      {isError && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};


interface CustomDropdownProps {
  setIsFocus?: () => void;
  setValue: (val: string) => void;
  value: string;
  data: { label: string; value: string }[];
  isBorder?: boolean;
  placeholder?: string;
  search?: boolean;
  searchPlaceHolder?: string;
  isError?: boolean;
  errorMessage?: string;
  labelText?: 'label' | 'value';
  valueText?: 'label' | 'value';
  customStyle?: string;
  icon?: React.ReactNode;
  containerHeight?: string;
  width?: string; // Accepts 'full', '1/2', '1/4', or a custom value like '250px'
  isHalf?: boolean; // Allows easy 50% width application
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  setIsFocus = () => {},
  setValue,
  value = '',
  data = [],
  isBorder = false,
  placeholder = 'Select item',
  search = false,
  searchPlaceHolder = 'Search...',
  isError = false,
  errorMessage = '',
  labelText = 'label',
  valueText = 'value',
  customStyle = '',
  icon = null,
  containerHeight = '200px',
  width = 'full', // Default to 'full'
  isHalf = false, // Default is false
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredData = data.filter((item) =>
    item[labelText].toLowerCase().includes(searchText.toLowerCase())
  );

  // Determine the width class or style
  const widthClass = width === 'full'
    ? 'w-full'
    : width === '1/2'
    ? 'w-1/2'
    : width === '1/4'
    ? 'w-1/4'
    : ''; // For custom values, we'll handle this with inline styles

  return (
    <div
      className={`relative ${isHalf ? 'w-1/2' : widthClass} ${customStyle}`}
      style={{ width: !widthClass ? width : undefined }} // Use inline style for custom widths
    >
      {icon && <span className="absolute left-2 top-2.5">{icon}</span>}
      <div
        className={`border ${isBorder ? 'border-none' : 'border'} 
          ${isError ? 'border-red-500' : 'border-gray-300'} 
          p-2 rounded-lg cursor-pointer bg-white ${icon ? 'pl-10' : ''}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p className="flex text-sm text-black">{value || placeholder}</p>
      </div>
      {showDropdown && (
        <div
          className={`absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg max-h-${containerHeight} overflow-y-auto`}
          style={{ maxHeight: containerHeight }} // Inline style to control height
        >
          {search && (
            <input
              type="text"
              placeholder={searchPlaceHolder}
              className="w-full text-black p-2 border-b border-gray-300"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          )}
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="p-2 text-black hover:bg-gray-100 cursor-pointer text-left"
              onClick={() => {
                setValue(item[valueText]);
                setShowDropdown(false);
                setSearchText('');
                setIsFocus();
              }}
            >
              {item[labelText]}
            </div>
          ))}
        </div>
      )}
      {isError && errorMessage && (
        <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

