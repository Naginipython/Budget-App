import Database from "@tauri-apps/plugin-sql";
import { FormEvent, useState } from "react";
import { debug } from "@tauri-apps/plugin-log";
import { Typography } from "@mui/material";

export default function() {

    const [title, setTitle] = useState<string>("");
    const [total, setTotal] = useState<number>(0);

    const addTransaction = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const db = await Database.load("sqlite:budget.db");
        // reset db, changed datatypes
        await db.execute(
            "CREATE TABLE IF NOT EXISTS add_money (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR, total REAL, created_at TIMESTAMP)"
        )
        const result = await db.execute(
            "INSERT INTO add_money (title, total, created_at) VALUES (?, ?, ?)",
            [title, total, new Date().toISOString()]
        );
        debug(`Transaction added: ${JSON.stringify(result)}`);
        const id = result.lastInsertId;
        debug(id?.toString() || "No ID returned");

        // await db.execute(
        //     "INSERT INTO transactions (title, amount, envelope_id, add_money_id, created_at) VALUES (?, ?, ?)",
        //     [transaction.title, transaction.amount, transaction.envelope_id, transaction.add_money_id, transaction.created_at]
        // );
    };
    
    return (
        <div>
            <h2>Add Transaction2</h2>
            <form onSubmit={addTransaction}>
                <Typography variant="subtitle1" component="label" htmlFor="title-input">
                    Title
                </Typography>
                <input
                    id="title-input"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br />
                <Typography variant="subtitle1" component="label" htmlFor="total-input" sx={{ mt: 2 }}>
                    Total
                </Typography>
                <input
                    id="total-input"
                    type="number"
                    placeholder="Total"
                    value={total}
                    onChange={(e) => setTotal(Number(e.target.value))}
                /><br />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
}