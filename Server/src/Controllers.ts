import { Request, Response, NextFunction } from "express";
import {  getMetricsById, postMetric, getMetrics } from "./config";
import { Impressions } from "./utils/types";


export const post = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const post = await postMetric(req.body);
		
		return res.status(201).json({
			message: "Successful",
			post,
		});
	} catch (error) {
		next(error);
	}
};

export const allMetrics =  async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await getMetrics();

        const metrics = result.reduce((prev: Impressions[], curr)=>{
            const {campaignName, impressions, clicks, conversions, spend } = curr;
            let clickThroughRate = (clicks / impressions) * 100;
						let conversionRate = (conversions / clicks) * 100;
						let costPerClick = spend / clicks;
						let costPerConversion = spend / conversions;
             prev.push({campaignName,
								clickThroughRate,
								conversionRate,
								costPerClick,
								costPerConversion,})
            return prev
        },[])


		return res.status(200).json({
			message: "Get successfull",
			metrics
		});
	} catch (error) {
		next(error);
	}
};
export const metricById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const metrics = await getMetricsById(parseInt(req.params.id));

			return res.status(201).json({
				message: "Get successfull",
				metrics,
			});
		} catch (error) {
			next(error);
		}
	}

