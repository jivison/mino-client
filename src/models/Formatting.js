import query from "../api/query";

const Formatting = {
    destroy(id, name) {
        return query(`/tracks/${id}/formattings/destroy`, "post", {
            format: name
        });
    },

    create(id, params) {
        return query(`tracks/${id}/formattings`, "post", params);
    }
};

export default Formatting;
