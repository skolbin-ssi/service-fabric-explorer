import { Injectable } from '@angular/core';
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { Router, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  appInsights: ApplicationInsights;
  telemetryEnabled: boolean = true;
  static readonly localStorageKey = "sfx-telemetry-enabled";

  constructor(public routing: Router, private storage: StorageService) {

    this.telemetryEnabled= this.storage.getValueBoolean(TelemetryService.localStorageKey, true);

    //enable telemetry
    this.appInsights = new ApplicationInsights({ config: {
      instrumentationKey: 'YOUR_INSTRUMENTATION_KEY_GOES_HERE',
      isCookieUseDisabled: true,
      disableAjaxTracking: true,
      disableFetchTracking : true,
      disableTelemetry: !this.telemetryEnabled
      /* ...Other Configuration Options... */
    } });
    this.appInsights.loadAppInsights();


    let lastActivationEnd = null;
    this.routing.events.subscribe( event => {
      if(event instanceof ActivationEnd) {
        lastActivationEnd = event;
      }
        if(event instanceof NavigationEnd){
            // console.log(this.activatedRoute.snapshot);
            const name = lastActivationEnd.snapshot.routeConfig.path;
            console.log(lastActivationEnd.snapshot.routeConfig.path);
            this.appInsights.trackPageView({
              name
            })
            lastActivationEnd = null;
        }
    })
   }

  trackActionEvent(name: string, source: string, data: any) {
    console.log("track event");
  }

  /*
  set the state for whether telemetry should be enabled.
  true = enabled
  */
  public SetTelemetry(state: boolean) {
    this.storage.setValue(TelemetryService.localStorageKey, state);
    this.telemetryEnabled = state;
    this.appInsights.config.disableTelemetry = !state;
  }

}
