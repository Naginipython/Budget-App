import { Button } from "@mui/material";
import EditEnvHeader from "./EditEnvHeader";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import { debug } from "@tauri-apps/plugin-log";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Envelope } from "../../assets/interfaces";
import SortableItem from "./envelope";

export default function () {
    const navigate = useNavigate();
    const [data, setData] = useState<Envelope[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = await Database.load("sqlite:budget.db");
            const result: Envelope[] = await db.select("SELECT * FROM envelopes");
            setData(result);
            console.log(result);
            debug(JSON.stringify(result));
        };
        fetchData();
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // helps prevent accidental drag
            },
        })
    );

    const handleDragEnd = ({ active, over }: { active: any; over: any }) => {
        if (over && active.id !== over.id) {
            const oldIndex = data.findIndex(env => env.id === active.id);
            const newIndex = data.findIndex(env => env.id === over.id);
            setData(arrayMove(data, oldIndex, newIndex));
        }
    };

    return (
        <>
            <EditEnvHeader />
            <Button variant="contained" color="primary" onClick={() => navigate("/edit-envelopes/new")}>
                Add Envelope
            </Button>
            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={data} strategy={verticalListSortingStrategy}>
                    {data.map((envelope: Envelope) => (
                        <SortableItem key={envelope.id} data={envelope} />
                    ))}
                </SortableContext>
            </DndContext>
        </>
    );
}
