import { Component, OnInit, Injector } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DeployedReplicaBaseControllerDirective } from '../DeployedReplicaBase';
import { IResponseMessageHandler } from 'src/app/Common/ResponseMessageHandlers';
import { Observable, of } from 'rxjs';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-essentials',
  templateUrl: './essentials.component.html',
  styleUrls: ['./essentials.component.scss']
})
export class EssentialsComponent extends DeployedReplicaBaseControllerDirective {
  appView: string;

  constructor(protected data: DataService, injector: Injector) {
    super(data, injector);
  }

  refresh(messageHandler?: IResponseMessageHandler): Observable<any>{
    const deployedService = this.replica.parent;
    const deployedApplication = deployedService.parent;
    const serviceName = encodeURI(this.replica.raw.ServiceName.replace('fabric:/', ''));
    this.appView = RoutesService.getReplicaViewPath(deployedApplication.raw.TypeName, deployedApplication.raw.Id, serviceName,
                                                       this.replica.raw.PartitionId, this.replica.id);
    return of(null);
  }
}
