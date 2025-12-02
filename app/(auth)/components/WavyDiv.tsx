import wavy from '@/public/icons/wavy.svg';
import bg from '@/public/images/bg_auth.png';

type Props = {
  width?: number;
  height?: number;
  className?: string;
};

const WavyDiv = ({ className = '', width = 200, height = 100 }: Props) => {
  const maskUrl = `url('${wavy.src}') center/contain no-repeat`;
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        // background: 'linear-gradient(100deg, #f093fb 0%, #f5576c 100%)',
        backgroundImage: `url(${bg.src})`,
        WebkitMask: maskUrl,
        mask: maskUrl,
      }}
      className={className}
    />
  );
};
export default WavyDiv;
