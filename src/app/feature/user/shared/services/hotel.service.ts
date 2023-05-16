import { Hotel } from '@admin/shared/interfaces/hotel';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  constructor(private readonly http: HttpService) {}

  public getHotelList() {
    return this.http.doGet<Hotel[]>(`${environment.API}hoteles`);
  }

  public reserve(hotel: Hotel) {
    return this.http.doPut(`${environment.API}hoteles`, hotel);
  }
}
