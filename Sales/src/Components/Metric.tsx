import { useEffect, useState } from "react"

type Metric = {
    id: number
    campaignName:string,
    clickThroughRate:number,
    conversionRate:number,
    costPerClick:number,
    costPerConversion:number,
}



const Metric = () => {

    const [metrics, setMetrics] = useState<Metric[]>([])

    useEffect(() => {
        fetch("https://server-hlcj.onrender.com/metric")
            .then(response => response.json())
            .then(data => {
                setMetrics(data)
            })
    }, [])

    if (metrics.length === 0) return null

  return (
    <>
          <table className="table table-border">
              <thead>
                  <tr key={"head"}>
                      <td>Campaign Name</td>
                      <td>Click Through Rate</td>
                      <td>Conversion Rate</td>
                      <td>Cost Per Click</td>
                      <td>Cost Per Conversion</td>
                      <td></td>
                  </tr>
              </thead>
              <tbody>
                  {
                      metrics.map(ex => <tr key={ex.id}>
                          <td>{ex.campaignName}</td>
                          <td>{ex.clickThroughRate}</td>
                          <td>{ex.conversionRate}</td>
                          <td>{ex.costPerClick}</td>
                            <td>{ex.costPerConversion}</td>
                         
                      </tr>
                      )
                  }
              </tbody>
             
             
          </table>
    </>
  )
}

export default Metric