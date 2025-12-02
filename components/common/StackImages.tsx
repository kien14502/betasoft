import Image from 'next/image';

type Props = {
  images: string[];
};

const StackImages = ({ images }: Props) => {
  return (
    <div className="relative ml-10">
      {images.map((img, index) => {
        const rotation = (index - images.length + 1) * 8;
        const translateX = (index - images.length + 1) * 15;
        const zIndex = index + 1;

        return (
          <Image
            className="object-center absolute top-0 left-0 h-40 w-40 rounded-2xl shrink-0 border border-blue-4"
            width={160}
            height={160}
            key={index}
            src={img}
            style={
              index > 0
                ? {
                    transform: `rotate(${rotation}deg) translateX(${translateX}px)`,
                    zIndex,
                  }
                : { zIndex: 50 }
            }
            alt=""
          />
        );
      })}
    </div>
  );
};
export default StackImages;
