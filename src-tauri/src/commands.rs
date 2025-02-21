// src-tauri/src/commands.rs
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;

#[derive(Debug, Serialize, Deserialize)]
pub struct TicketData {
    pub description: String,
    pub category: String,
    pub priority: String,
}

#[derive(Debug, Serialize)]
pub struct UserData {
    pub id: i32,
    pub user_name: String,
    pub email: String,
    pub user_status: String,
    pub cellphone_number: String,
    pub role: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Ticket {
}

#[tauri::command]
pub async fn get_user_data(user_id: i32, pool: State<'_, SqlitePool>) -> Result<UserData, String> {
    let user = sqlx::query_as!(
        UserData,
        r#"
        SELECT 
            id,
            user_name,
            email,
            user_status,
            cellphone_number,
            role
        FROM users
        WHERE id = ?
        "#,
        user_id
    )
    .fetch_optional(&*pool)
    .await
    .map_err(|e| e.to_string())?
    .ok_or_else(|| "Usuário não encontrado".to_string())?;

    Ok(user)
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