import { useState } from "react";
import { Campaign } from "./../App"



interface prop {
    metrics: Campaign[],
}

const Metric = ({ metrics }: prop) => {
    const [Display, setDisplay] = useState<boolean>(false)

    if (metrics.length === 0 || Display === false) return <div className="d-flex justify-content-center">
        <button className="btn btn-success mb-3 text-center"
            onClick={() => setDisplay(true)}>Display Campaign Metrics</button>
    </div>



    return (
        <>
            <table className="table table-border container">
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
                        metrics.map(ex => <tr key={ex.id}>
                            <td>{ex.campaignName}</td>
                            <td>{((ex.clicks / ex.impressions) * 100).toFixed(2)}</td>
                            <td>{((ex.conversions / ex.clicks) * 100).toFixed(2)}</td>
                            <td>{ex.spend / ex.clicks}</td>
                            <td>{ex.spend / ex.conversions}</td>

                        </tr>
                        )

                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mb-3 text-center"
                    onClick={() => setDisplay(false)}>Hide Campaign Metrics</button>
            </div>
        </>
    )
}

export default Metric