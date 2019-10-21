import query from "../api/query";

const BASE_URL = "http://localhost:7878"

const Creation = {
    async download() {
        let options = {
            credentials: "include",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        }
    
        const res = await fetch(`${BASE_URL}/creations/download`, options)
        return res.blob()
    },

    create_spotify_playlist(params) {
        return query("creations/create_spotify_playlist", "post", params)
    }
};

export default Creation;
