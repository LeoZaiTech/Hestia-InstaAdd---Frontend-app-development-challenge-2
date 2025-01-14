import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { 
    UnitOfMeasure, 
    LineBuyPrediction, 
    DiscountGroupPrediction,
    PredictionRequest 
} from 'src/app/models/apis/uom';

@Injectable({
    providedIn: 'root',
})
export class UomService extends ApiBaseService {
    constructor(
        protected override http: HttpClient,
        protected override storageService: StorageService,
    ) {
        super(http, storageService, '', environment.apiHost);
    }

    /**
     * Get all Units of Measure
     */
    getUnitOfMeasures(): Observable<UnitOfMeasure[]> {
        return this.http
            .get<UnitOfMeasure[]>(this.endpoint('/api/v1/Uoms'))
            .pipe(this.networkError<UnitOfMeasure[]>());
    }

    /**
     * Get LineBuy predictions based on vendor and product description
     */
    getLineBuyPredictions(request: PredictionRequest): Observable<LineBuyPrediction[]> {
        return this.http
            .post<LineBuyPrediction[]>(this.endpoint('/api/v1/Predictions/LineBuy'), request)
            .pipe(this.networkError<LineBuyPrediction[]>());
    }

    /**
     * Get Discount Group predictions based on vendor and product description
     */
    getDiscountGroupPredictions(request: PredictionRequest): Observable<DiscountGroupPrediction[]> {
        return this.http
            .post<DiscountGroupPrediction[]>(this.endpoint('/api/v1/Predictions/DiscountGroup'), request)
            .pipe(this.networkError<DiscountGroupPrediction[]>());
    }
}
