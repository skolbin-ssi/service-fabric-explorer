import { Component, ViewChild, ElementRef, Output, EventEmitter, DoCheck, Input } from '@angular/core';
import { TreeService } from 'src/app/services/tree.service';
import { environment } from 'src/environments/environment';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { RestClientService } from 'src/app/services/rest-client.service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements DoCheck {

  @Input() smallWindowSize = false;
  @Output() treeResize = new EventEmitter<number>();

  public showBeta = environment.showBeta;
  public canExpand = false;
  @ViewChild('tree') tree: ElementRef;
  constructor(public treeService: TreeService,
              private liveAnnouncer: LiveAnnouncer,
              public restClientService: RestClientService) { }

  ngDoCheck(): void {
    if (this.tree) {
      this.canExpand = this.tree.nativeElement.scrollWidth > this.tree.nativeElement.clientWidth;
    }
  }

  leaveBeta() {
    const originalUrl =  location.href.replace('index.html', 'old.html');
    window.location.assign(originalUrl);
  }

  setWidth() {
    this.treeResize.emit(this.tree.nativeElement.scrollWidth + 20);
  }

  setSearchText(text: string) {
    this.treeService.tree.searchTerm = text;
    try {
      this.liveAnnouncer.announce(`${this.treeService.tree.childGroupViewModel.children[0].filtered} search results`);
    } catch {
      this.liveAnnouncer.announce(`0 search results`);

    }
  }
}
