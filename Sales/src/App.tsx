
import { useState } from 'react'
import './App.css'
import Form from './Components/Form'
import Metric from './Components/Metric'


export interface Campaign{
  id:number,
  campaignName:string,
  impressions:number,
  clicks:number,
  conversions:number,
  spend:number,
}
function App() {
const [campaign, setCampaign] = useState<Campaign[]>([])

const handleSubmit=(data:Omit<Campaign, "id"> )=>{
  setCampaign([...campaign, { ...data, id: campaign.length > 0 ? campaign[campaign.length - 1].id : 1 }])
}

  return (
    <>
      <h1 className='text-center text-primary'>Loopify  </h1>
      <Form setDisplay={handleSubmit} />
      <Metric metrics ={campaign}/>
    </>
  )
}

export default App
