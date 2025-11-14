export const MenuSubItem = ({
  parent,
  subitem,
  onPageChange,
}: {
  parent: any;
  subitem: any;
  onPageChange: (id: string, url: string) => void;
}) => {
  return (
    <button
      className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 
        hover:text-slate-800 dark:hover:text-slate-200 
        hover:bg-slate-100 dark:hover:bg-slate-800/50 
        rounded-lg transition-all"
      onClick={() => onPageChange(parent.id, parent.url)}
    >
      {subitem.label}
    </button>
  );
};
