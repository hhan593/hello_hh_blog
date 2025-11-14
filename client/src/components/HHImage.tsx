import { Image } from "@imagekit/react";

interface HHImageProps {
  src: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
}

const HHImage = ({ src, className, width, height, alt }: HHImageProps) => {
  return (
    <Image
      urlEndpoint={import.meta.env.VITE_HH_URL_ENDPOINT}
      src={src}
      className={className}
      alt={alt}
      loading="lazy"
      lqip={{ active: true, quality: 40 }}
      width={width as any}
      height={height as any}
      transformation={[
        {
          width: width as any,
          height: height as any,
        },
      ]}
    />
  );
};

export default HHImage;
