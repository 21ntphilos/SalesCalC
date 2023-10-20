import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'


const schema = z.object({
    campaignName: z.string().refine((value) => value.trim() !== '', {
        message: "Campaign Name is Required",
    }),
    impressions: z.number({ invalid_type_error: "impressions is Required", })
        .min(0, { message: " Impression Must be more than or equal to 0 " }),
    clicks: z.number({
        invalid_type_error: "clicks is Required"
    })
        .min(0, { message: " Clicks Must be more than or equal to 0 " }),
    conversions: z.number({ invalid_type_error: "conversions is Required" })
        .min(0, { message: "Conversion Impression Must be more than or equal to 0 " }),
    spend: z.number({ invalid_type_error: "spend is Required" })
        .min(0, { message: "Spend Must be more than or equal to 0" }),
})
type Post = z.infer<typeof schema>
interface prop{
    setDisplay:(data:Post)=>void,
}

const Form = ({ setDisplay }: prop) => {
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } 
    = useForm<Post>({ resolver: zodResolver(schema) });

    const Submit = (data: Post) => {
        console.log(data)
        setDisplay(data)
            reset()
    }

    return (
        <>
            <h3 className='text-center text-success'>Sales Metrics  </h3>
            <div className="container d-flex justify-content-center align-items-center min-vh-90">
                <form 
                    onSubmit={handleSubmit((data) => Submit(data))}
                    className="col-md-6 row g-3">
                    <div  className='mb-3'>
                        <label htmlFor="campaignName" className="form-label"> Campaign Name </label>
                        <input {...register("campaignName", { required: "Campaign Name is required" })}
                            id="campaignName" type="text"
                            className='form-control'
                        />
                        {errors.campaignName && <p className='text-danger'>{errors.campaignName.message?.toString()} </p>}
                    </div>
                    <div className='mb-3 col-md-3'>
                        <label htmlFor="impressions" className="form-label"> Impressions</label>
                        <input {...register("impressions", { required: true, valueAsNumber: true })}
                            id='impressions' type="number"
                            className='form-control'
                        />
                        {errors.impressions && <p className='text-danger'>{errors.impressions.message?.toString()}</p>}
                    </div>
                    <div  className='mb-3 col-md-3'>
                        <label htmlFor="clicks" className="form-label"> Clicks</label>
                        <input {...register("clicks", { required: true, valueAsNumber: true })}
                            id='clicks' type="number"
                            className='form-control'
                        />
                        {errors.clicks && <p className='text-danger'>{errors.clicks.message?.toString()}</p>}
                    </div>
                    <div className='mb-3 col-md-3'>
                        <label htmlFor="conversions" className="form-label"> Conversions</label>
                        <input {...register("conversions", { required: true, valueAsNumber: true })}
                            id='conversions' type="number"
                            className='form-control'
                        />
                        {errors.conversions && <p className='text-danger'>{errors.conversions.message?.toString()}</p>}
                    </div>
                    <div className='mb-3 col-md-3'>
                        <label htmlFor="spend" className="form-label"> Spend</label>
                        <input {...register("spend", { required: true, valueAsNumber: true })}
                            id='spend' type="number"
                            className='form-control'
                        />
                        {errors.spend && <p className='text-danger'>{errors.spend.message?.toString()}</p>}
                    </div>

                    <div className='mb-3'>
                        <button disabled={!isValid} type="submit" className="btn btn-primary">{isSubmitting ? "Submiting" : "Submit"}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Form