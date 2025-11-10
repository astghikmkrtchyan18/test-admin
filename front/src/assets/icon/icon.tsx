const icons = import.meta.glob("./icons/*.svg", {
  eager: true,
  query: '?url',
  import: 'default',
});

const iconMap: Record<string, string> = Object.entries(icons).reduce(
  (acc: Record<string, string>, [path, url]) => {
    const name = path.split("/").pop()?.replace(".svg", "") || "";
    acc[name] = url as string;
    return acc;
  },
  {}
);

export const Icon = ({
  name,
  className,
  width,
  height,
  rotate = 0,
  ...props
}: {
  name: string;
  className?: string;
  width?: number;
  height?: number;
  rotate?: number;
}) => {
  const src = iconMap[name];
  if (!src) return null;
  return (
    <img
      src={src}
      alt={name}
      width={width}
      height={height}
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      {...props}
    />
  );
};
