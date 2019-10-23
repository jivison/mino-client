import query from "../api/query";

const ArtistMap = {
    all() {
        return query("artist_maps");
    },

    show(id) {
        return query(`artists/${id}/maps`);
    },

    destroy(id) {
        return query(`artist_maps/${id}`, "delete");
    }
};

export default ArtistMap;
