import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'enviroments/enviroment';
import { User } from '../interfaces/user';

interface ICredencial {
  email: string;
  password: string;
}
@Injectable()
export class LoginService {
  user!: User;
  constructor(private readonly http: HttpService) {}

  public login(credentials: ICredencial) {
    return this.http.doPost<ICredencial, any>(
      `${environment.API}login`,
      credentials
    );
  }
}
