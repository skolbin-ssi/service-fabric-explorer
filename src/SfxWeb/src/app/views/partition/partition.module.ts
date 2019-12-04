import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartitionRoutingModule } from './partition-routing.module';
import { BaseComponent } from './base/base.component';
import { EssentialsComponent } from './essentials/essentials.component';
import { DetailsComponent } from './details/details.component';
import { EventsComponent } from './events/events.component';
import { BackupsComponent } from './backups/backups.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BaseComponent, EssentialsComponent, DetailsComponent, EventsComponent, BackupsComponent],
  imports: [
    CommonModule,
    PartitionRoutingModule,
    SharedModule
  ]
})
export class PartitionModule { }
