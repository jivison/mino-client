import query from "../api/query"

const AlbumMap = {
    all() {
        return query("album_maps")
    },

    show(id) {
        return query(`albums/${id}/maps`);
    },

    destroy(id) {
        return query(`albums_maps/${id}`, "delete");
    }
}

export default AlbumMap