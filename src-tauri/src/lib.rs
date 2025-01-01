use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
struct Panel {
    id: i32,
    title: &'static str,
}

#[derive(Serialize)]
struct Item {
    id: i32,
    name: &'static str,
}

#[tauri::command]
fn panels() -> Vec<Panel> {
    vec![
        Panel { id: 1, title: "idle" },
        Panel { id: 2, title: "in progress" },
        Panel { id: 3, title: "done" },
    ]
}

#[tauri::command]
fn data() -> HashMap<i32, Vec<Item>> {
    let mut result = HashMap::new();

    result.insert(1, vec![Item { id: 1, name: "item 1" }, Item { id: 2, name: "item 2" }]);
    result.insert(2, vec![Item { id: 3, name: "item 3" }, Item { id: 4, name: "item 4" }]);
    result.insert(3, vec![Item { id: 5, name: "item 5" }, Item { id: 6, name: "item 6" }]);

    result
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![panels, data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
