#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Window;
use std::thread;
use std::time::Duration;

// --------------------- PGM ---------------------
#[tauri::command]
async fn test_1() -> Result<u32, String> {
    thread::sleep(Duration::from_secs(2));
    println!("Test {} completed", 1);
    Ok(1)
}

#[tauri::command]
async fn test_2() -> Result<u32, String> {
    thread::sleep(Duration::from_secs(3));
    println!("Test {} completed", 2);
    Ok(2)
}

#[tauri::command]
async fn test_3() -> Result<u32, String> {
    thread::sleep(Duration::from_secs(2));
    println!("Test {} completed", 3);
    Ok(3)
}

#[tauri::command]
async fn test_4() -> Result<u32, String> {
    thread::sleep(Duration::from_secs(3));
    println!("Test {} completed", 4);
    Ok(4)
}

#[tauri::command]
async fn test_5() -> Result<u32, String> {
    thread::sleep(Duration::from_secs(3));
    println!("Test {} completed", 5);
    Ok(5)
}

// --------------------- Ribbon menu ----------------------

#[tauri::command]
fn minimize_window(window: Window) {
    window.minimize().unwrap();
}

#[tauri::command]
fn maximize_window(window: Window) {
    if window.is_maximized().unwrap() {
        window.unmaximize().unwrap();
    } else {
        window.maximize().unwrap();
    }
}

#[tauri::command]
fn close_window(window: Window) {
    window.close().unwrap();
}

#[tauri::command]
fn drag_window(window: Window) {
    window.start_dragging().expect("Failed to start dragging.")
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![minimize_window, maximize_window, close_window, drag_window,
            test_1, test_2, test_3, test_4, test_5
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}