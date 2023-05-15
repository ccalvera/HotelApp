import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';
import { HttpService } from '@core/services/http.service';
import { environment } from 'enviroments/enviroment';

@Injectable()
export class HotelManagementService {
  constructor(private http: HttpService) {}

  public getHotelList() {
    return this.http.doGet<Hotel[]>(`${environment.API}hoteles`);
  }

  public registerHotel(hotel: Hotel) {
    return this.http.doPost<Hotel, Hotel>(`${environment.API}hoteles`, hotel);
  }

  public editHotel(hotel: Hotel) {
    return this.http.doPut<Hotel, Hotel>(
      `${environment.API}hoteles/${hotel.id}`,
      hotel
    );
  }

  public deleteHotel(hotel: Hotel) {
    return this.http.doDelete<Hotel>(`${environment.API}hoteles/${hotel.id}`);
  }
}
