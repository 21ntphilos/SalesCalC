import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
    campaignName: z.string({ invalid_type_error: "Campaign Name is Required"}),
    impressions: z.number({ invalid_type_error: "impressions is Required",})
        .min(0, { message: " Impression Must be more than or equl to 0 " }),
    clicks: z.number({
        // invalid_type_error: "expected a Number", 
        invalid_type_error: "clicks is Required" })
        .min(0, { message: " Clicks Must be more than or equl to 0 " }),
    conversions: z.number({  invalid_type_error: "conversions is Required" })
        .min(0, { message: "Conversion Impression Must be more than or equl to 0 " }),
    spend: z.number({invalid_type_error: "spend is Required" })
        .min(0, { message: "Spend Must be more than or equl to 0 " }),
})
const Form = () => {
    const { register, handleSubmit, formState: { errors, } } = useForm({ resolver: zodResolver(schema) })
    return (
        <>
        <h1>Sales Metrics  </h1>
        <form onSubmit={handleSubmit(data => console.log(data))}>
            <div>
                <label htmlFor="campaignName"> Campaign Name </label>
                <input {...register("campaignName", { required: "Campaign Name is required" })} id="campaignName" type="text" />
                {errors.campaignName && <p>{errors.campaignName.message?.toString()} </p>}
            </div>
            <div>
                <label htmlFor="impressions"> Impressions</label>
                <input {...register("impressions", { required: true, valueAsNumber: true })} id='impressions' type="number" />
                {errors.impressions && <p>{errors.impressions.message?.toString()}</p>}
            </div>
            <div><label htmlFor="clicks"> Clicks</label>
                <input {...register("clicks", { required: true, valueAsNumber: true })} id='clicks' type="number" />
                {errors.clicks && <p>{errors.clicks.message?.toString()}</p>}
            </div>
            <div><label htmlFor="conversions"> Conversions</label>
                <input {...register("conversions", { required: true, valueAsNumber: true })} id='conversions' type="number" />
                {errors.conversions && <p>{errors.conversions.message?.toString()}</p>}
            </div>
            <div><label htmlFor="spend"> Spend</label>
                <input {...register("spend", { required: true, valueAsNumber: true })} id='spend' type="number" />
                {errors.spend && <p>{errors.spend.message?.toString()}</p>}
            </div>

            <div>
                <input type="submit" />
            </div>
        </form>
        </>
    )
}

export default Form