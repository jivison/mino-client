import query from "../api/query"

const Track = {
    endpoint: "tracks",

    all() {
        return query("tracks")
    },

    create(params) {
        return query("tracks", "post", params)
    },

    update(id, params) {
        return query(`tracks/${id}`, "patch", params)
    },

    moveable(id) {
        return query(`tracks/${id}/moveable`)
    },

    move(id, params) {
        return query(`tracks/${id}/move`, "post", params)
    }
}

export default Track