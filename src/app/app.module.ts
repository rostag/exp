import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlowDiagramComponent } from './flow-diagram/diagram.component';
import { AcpPostureGroupsComponent } from './acp-groups/acp-groups.component';
import { CompasComponent } from './compas/compas.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowDiagramComponent,
    AcpPostureGroupsComponent,
    CompasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
