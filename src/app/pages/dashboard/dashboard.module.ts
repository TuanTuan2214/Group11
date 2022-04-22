import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CovidComponent} from "./covid/covid.component";
import {CommonModule} from "@angular/common";
import {LineChartModule} from "@swimlane/ngx-charts";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [{
      path: '',
      component: CovidComponent
    }]
  }

];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), CommonModule, LineChartModule],
  declarations: [DashboardComponent, CovidComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {
}
