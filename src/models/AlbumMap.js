import query from "../api/query"

const AlbumMap = {
    all() {
        return query("album_maps")
    },

    show(id) {
        return query(`albums/${id}/maps`);
    },

    destroy(id) {
        return query(`album_maps/${id}`, "delete");
    },

    create(params) {
        return query('album_maps', "post", params)
    }
}

export default AlbumMap