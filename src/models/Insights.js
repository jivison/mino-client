import query from "../api/query"

const Insights = {
    index() {
        return query("/insights")
    }
}

export default Insights