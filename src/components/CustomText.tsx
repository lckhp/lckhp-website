import { FC, ReactNode } from 'react';

interface TextProps {
  className?: string;
  children: ReactNode;
  numberOfLines?: number;
}

export const H1: FC<TextProps> = ({ className, children, numberOfLines }) => {
  return (
    <h1
      className={`text-black font-bold text-2xl md:text-4xl tracking-wide ${className}`}
      style={{
        overflow: numberOfLines ? 'hidden' : 'visible',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </h1>
  );
};

export const H2: FC<TextProps> = ({ className, children, numberOfLines }) => {
  return (
    <h2
      className={`text-black font-bold text-xl md:text-2xl tracking-wide ${className}`}
      style={{
        overflow: numberOfLines ? 'hidden' : 'visible',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </h2>
  );
};

export const H3: FC<TextProps> = ({ className, children, numberOfLines }) => {
  return (
    <h3
      className={`text-black font-semibold text-lg md:text-xl tracking-wide ${className}`}
      style={{
        overflow: numberOfLines ? 'hidden' : 'visible',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </h3>
  );
};

export const H4: FC<TextProps> = ({ className, children, numberOfLines }) => {
  return (
    <h4
      className={`text-black font-normal text-base md:text-lg tracking-wide ${className}`}
      style={{
        overflow: numberOfLines ? 'hidden' : 'visible',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </h4>
  );
};

export const CustomText: FC<TextProps> = ({ className, children, numberOfLines }) => {
  return (
    <p
      className={`text-black font-normal text-base md:text-lg tracking-wide ${className}`}
      style={{
        overflow: numberOfLines ? 'hidden' : 'visible',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
      }}
    >
      {children}
    </p>
  );
};
