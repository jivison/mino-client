import query from "../api/query";

const Tagging = {
    destroy(id, name) {
        return query(`tracks/${id}/taggings/destroy`, "post", { tag: name });
    },

    create(id, params) {
        return query(`tracks/${id}/taggings`, "post", params);
    }
};

export default Tagging;
