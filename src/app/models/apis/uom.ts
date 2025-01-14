export interface UnitOfMeasure {
    code: string;
    description: string;
}

export interface LineBuyPrediction {
    value: string;
    score: number;
}

export interface DiscountGroupPrediction {
    value: string;
    score: number;
}

export interface PredictionRequest {
    vendor?: string;
    productDescription?: string;
}
