interface Item {
  id: number | string;
  label: string;
}

interface SortedListProps {
  className?: string;
  title: string;
  items: Item[];
}

export function SortedList({ className, title, items }: SortedListProps) {
  return (
    <section className={className}>
      <h2>{title}</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ol>
    </section>
  );
}
