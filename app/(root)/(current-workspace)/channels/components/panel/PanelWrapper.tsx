type Props = {
  children: React.ReactNode;
  className?: string;
};

const PanelWrapper = ({ children, className = '' }: Props) => (
  <div
    className={`max-w-(--panel-chat-width) w-full rounded-4xl shadow-secondary min-h-0 bg-white border ${className}`}
  >
    {children}
  </div>
);
export default PanelWrapper;
