import { Component, OnInit, Injector } from '@angular/core';
import { IdUtils } from 'src/app/Utils/IdUtils';
import { ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SettingsService } from 'src/app/services/settings.service';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { Partition } from 'src/app/Models/DataModels/Partition';
import { ListSettings } from 'src/app/Models/ListSettings';
import { BaseControllerDirective } from 'src/app/ViewModels/BaseController';
import { map } from 'rxjs/operators';
import { PartitionBaseControllerDirective } from '../PartitionBase';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent extends PartitionBaseControllerDirective {

  healthEventsListSettings: ListSettings;

  constructor(protected data: DataService, injector: Injector, private settings: SettingsService) {
    super(data, injector);
  }

  setup() {
    this.healthEventsListSettings = this.settings.getNewOrExistingHealthEventsListSettings();

  }

  refresh(messageHandler?: IResponseMessageHandler): Observable<any>{
    return forkJoin([
      this.partition.loadInformation.refresh(messageHandler),
      this.partition.health.refresh(messageHandler),
      this.partition.replicas.refresh(messageHandler),
    ]);
  }
}
