import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'enviroments/enviroment';
import { User } from '../interfaces/user';
import { Subject } from 'rxjs';

interface ICredencial {
  email: string;
  password: string;
}
@Injectable()
export class LoginService {
  user!: User;
  private user$: Subject<User> = new Subject<User>();
  constructor(private readonly http: HttpService) {}

  public login(credentials: ICredencial) {
    return this.http.doPost<ICredencial, any>(
      `${environment.API}login`,
      credentials
    );
  }

  public userLog(user: User) {
    this.user = user;
    this.user$.next(this.user);
  }
}
