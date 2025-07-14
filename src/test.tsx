import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';

function SortableItem({ id }: { id: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 8,
    marginBottom: 4,
    border: '1px solid #ccc',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#fff',
    borderRadius: 4,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <span>{id}</span>
      {/* Drag handle */}
      <span
        style={{
          cursor: 'grab',
          padding: '0 8px',
          background: '#eee',
          borderRadius: 4,
        }}
        {...listeners}
        {...attributes}
      >
        ☰
      </span>
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // helps prevent accidental drag
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (over && String(active.id) !== String(over.id)) {
          const oldIndex = items.indexOf(String(active.id));
          const newIndex = items.indexOf(String(over.id));
          setItems(arrayMove(items, oldIndex, newIndex));
        }
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
