import { useDraggable } from "@dnd-kit/core";
import { TItem } from "../types";

interface ItemProps {
  item: TItem;
  payload?: { [key: string]: unknown };
}
export default function Item({ item, payload = {} }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: { ...item, payload },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <li
      key={item.id}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {item.name}
    </li>
  );
}
