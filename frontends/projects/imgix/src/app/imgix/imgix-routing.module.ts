import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImgixComponent } from './imgix.component';

const routes: Routes = [{ path: '', component: ImgixComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgixRoutingModule {}
