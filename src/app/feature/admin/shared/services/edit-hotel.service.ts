import { BehaviorSubject } from 'rxjs';

export class EditHotelService {
  private dataFormSource = new BehaviorSubject<any>(null);
  formData$ = this.dataFormSource.asObservable();

  sentDataForm(data: any) {
    this.dataFormSource.next(data);
  }
}
