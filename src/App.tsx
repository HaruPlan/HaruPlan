import { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { TItem, TPanel } from "./types";
import Panel from "./components/Panel";
import Item from "./components/Item";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

function App() {
  const [panels = [], setPanels] = useState<TPanel[]>([]);
  const [data = {}, setData] = useState<{ [key: string]: TItem[] }>({});

  async function fetchData() {
    setPanels(await invoke("panels"));
    setData(await invoke("data"));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleDragEnd = async ({ active, over }: DragEndEvent) => {
    setData((prevData) => {
      const { payload, ...currentItem } = active.data.current ?? {};

      if (!currentItem || !over) {
        return prevData;
      }

      const { parentId } = payload;
      const { id: nextParentId } = over;

      if (!parentId || !nextParentId || parentId === nextParentId) {
        return prevData;
      }

      prevData[parentId] = prevData[parentId].filter(
        (item) => item.id !== currentItem.id
      );

      if (!prevData[nextParentId]) {
        prevData[nextParentId] = [];
      }

      prevData[nextParentId].push(currentItem as TItem);

      return { ...prevData };
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-2">
        {panels.map((panel) => (
          <Panel key={panel.id} panel={panel}>
            {(data[panel.id] ?? []).map((item) => (
              <Item
                key={item.id}
                item={item}
                payload={{ parentId: panel.id }}
              />
            ))}
          </Panel>
        ))}
      </div>
    </DndContext>
  );
}

export default App;
