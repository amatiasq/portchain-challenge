interface SortedListProps<T> {
  className?: string;
  title: string;
  items: T[];
  children: (item: T) => React.ReactNode;
}

export function SortedList<T>({
  className,
  title,
  items,
  children,
}: SortedListProps<T>) {
  return (
    <section className={className}>
      <h2>{title}</h2>
      <ol>{items.map(children)}</ol>
    </section>
  );
}
