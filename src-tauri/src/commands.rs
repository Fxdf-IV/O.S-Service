// src-tauri/src/commands.rs
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;

#[derive(Debug, Serialize, Deserialize)]
pub struct TicketData {
    pub description: String,
    pub category: String,
    pub priority: String,
}

#[tauri::command]
pub async fn create_ticket(ticket: TicketData, pool: State<'_, SqlitePool>) -> Result<(), String> {
    // Inserir no banco de dados
    sqlx::query!(
        r#"
        INSERT INTO tickets (
            type_ticket,
            description_ticket,
            problem_category,
            created_date_ticket
        ) VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        "#,
        
        ticket.category,
        ticket.description,
    )
    .execute(&*pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub async fn get_tickets(pool: State<'_, SqlitePool>) -> Result<Vec<Ticket>, String> {
    // Buscar tickets do banco de dados
    let tickets = sqlx::query_as!(
        Ticket,
        r#"
        SELECT * FROM tickets
        ORDER BY created_date_ticket DESC
        "#
    )
    .fetch_all(&*pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(tickets)
}