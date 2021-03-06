import { Component, OnInit, Input } from '@angular/core';
import { ActionCollection } from 'src/app/Models/ActionCollection';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-action-collection-drop-down',
  templateUrl: './action-collection-drop-down.component.html',
  styleUrls: ['./action-collection-drop-down.component.scss']
})
export class ActionCollectionDropDownComponent {
  @Input() treeView: boolean = false;
  @Input() actionCollection: ActionCollection;
  @Input() displayText: string;
  constructor(public dataService: DataService) { }

}
