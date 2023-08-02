import { useParams } from "react-router"
import { data } from "../../utils/data"
import { useState } from "react"


export default function TaskDetail() {
    const [tasks, setTasks] = useState(data)

    const { id } = useParams()

    return (
        <div>viewing task {id} </div>
    )
}
