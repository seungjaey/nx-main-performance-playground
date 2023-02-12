import Image, { ImageProps, ImageLoader } from 'next/image';

const imageLoader: ImageLoader = ({ src }) => src;

export const NextImage = (props: ImageProps) => <Image {...props} loader={imageLoader} />;
