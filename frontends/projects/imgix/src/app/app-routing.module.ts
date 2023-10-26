import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'imgix'},
  {
    path: 'imgix',
    loadChildren: () => import('./imgix/imgix.module').then((m) => m.ImgixModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
