import { useDroppable } from "@dnd-kit/core";
import { TPanel } from "../types";

interface PanelProps {
  panel: TPanel;
  children?: React.ReactNode;
}

export default function Panel({ panel, children }: PanelProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: panel.id,
    data: panel,
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div style={style} ref={setNodeRef}>
      <h1>{panel.id}</h1>
      <ul>{children}</ul>
    </div>
  );
}
