import { useSortable } from "@dnd-kit/sortable";
import { Envelope } from "../../assets/interfaces";
import { useNavigate } from "react-router-dom";
import { CSS } from '@dnd-kit/utilities';
import { Grid, Typography } from "@mui/material";
import { BorderTop } from "@mui/icons-material";

export default function SortableItem({ data }: { data: Envelope }) {
    const navigate = useNavigate();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: data.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 10px',
        borderBottom: '1px solid #ccc',
        borderTop: '1px solid #ccc',
        cursor: 'pointer',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} onClick={() => navigate(`/edit-envelopes/${data.id}`)}>
            <Grid container sx={{ flex: 1 }}>
                <Grid size={11}>
                    <Typography variant="body1" fontWeight="bold">
                        {data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                    </Typography>
                </Grid>
                <Grid size={1} sx={{ textAlign: 'right' }}>
                    <Typography variant="body1" fontWeight="bold" color="textPrimary" sx={{ margin: 0 }}>
                        {data.balance_limit.toFixed(2)}
                    </Typography>
                </Grid>
            </Grid>
            <span
                style={{
                    cursor: 'grab',
                    padding: '0 8px',
                    borderRadius: 4,
                }}
                {...listeners}
            >
                ☰
            </span>
        </div>
    );
}