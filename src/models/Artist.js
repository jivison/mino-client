import query from "../api/query"

const Artist = {

    all() {
        return query("artists")
    }

}

export default Artist