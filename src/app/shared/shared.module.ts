import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {ChartCommonModule} from "@swimlane/ngx-charts";

const imports = [
  CommonModule,
  FormsModule,
  HttpClientModule,
  NzIconModule,
  LeafletModule,
  ChartCommonModule
];

@NgModule({
  declarations: [],
  imports,
  exports: [imports]
})
export class SharedModule { }
