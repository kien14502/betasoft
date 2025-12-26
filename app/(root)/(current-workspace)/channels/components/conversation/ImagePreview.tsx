import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  url: string;
  onRemove: () => void;
};

const ImagePreview = ({ url, onRemove }: Props) => (
  <div className="relative">
    <button
      onClick={onRemove}
      className="absolute flex items-center justify-center -top-1 -right-1 w-4 h-4 rounded-full bg-white shadow-secondary"
    >
      <X size={8} />
    </button>
    <Image
      src={url}
      alt="Preview"
      className="w-12 h-12 rounded-xl object-cover shadow-secondary"
      width={48}
      height={48}
      loading="lazy"
    />
  </div>
);
export default ImagePreview;
