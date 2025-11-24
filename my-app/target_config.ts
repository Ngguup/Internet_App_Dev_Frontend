const release_mode = false

export const api_proxy_addr = "http://192.168.43.57:8080"
// export const api_proxy_addr = "http://192.168.1.10:8080"
// export const img_proxy_addr = "http://192.168.0.104:9000"
// export const dest_api = (target_tauri) ? api_proxy_addr : "api"
// export const dest_img =  (target_tauri) ?  img_proxy_addr : "img-proxy"
export const dest_root = (release_mode) ? "" : "/Internet_App_Dev_Frontend/"