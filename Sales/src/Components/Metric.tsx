import { useEffect, useState } from "react"

type Metric = {
    id: number
    campaignName: string,
    clickThroughRate: number,
    conversionRate: number,
    costPerClick: number,
    costPerConversion: number,
}



const Metric = () => {
// 
    // const [metrics, setMetrics] = useState<Metric[]>([])
    const [metrics, setMetrics] = useState<any[]>([])

    // useEffect(() => {
    //     fetch("https://server-hlcj.onrender.com/metric")
    //         .then(response => response.json())
    //         .then(data => {
    //             setMetrics(data)
    //         })
    // }, [])

    const HandleClick = () => {
        // "https://jsonplaceholder.typicode.com/users/1/todos"
        // "https://server-hlcj.onrender.com/metric"
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setMetrics(data)
                console.log(data)
            })

    }

    if (metrics.length === 0) return <button 
    className="btn btn-success" 
    onClick = {HandleClick}>Display Campaign Metrics</button>

    return (
        <>
            <table className="table table-border">
                <thead>
                    <tr key={"head"}>
                        <td className="fw-bold">Campaign Name</td>
                        <td className="fw-bold">Click Through Rate</td>
                        <td className="fw-bold">Conversion Rate</td>
                        <td className="fw-bold">Cost Per Click</td>
                        <td className="fw-bold">Cost Per Conversion</td>
                        <td className="fw-bold"></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        //   metrics.map(ex => <tr key={ex.id}>
                        //       <td>{ex.campaignName}</td>
                        //       <td>{ex.clickThroughRate}</td>
                        //       <td>{ex.conversionRate}</td>
                        //       <td>{ex.costPerClick}</td>
                        //         <td>{ex.costPerConversion}</td>

                        //   </tr> 
                        //   )
                        metrics.map(ex => <tr key={ex.id}>
                            <td >{ex.name}</td>
                            <td >{ex.username}</td>
                            <td >{ex.email}</td>
                            <td >{ex.address.city}</td>
                            <td >{ex.company.name}</td>

                        </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default Metric