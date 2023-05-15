import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@admin/admin.module').then((mod) => mod.AdminModule),
    canActivate: [SecurityGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
