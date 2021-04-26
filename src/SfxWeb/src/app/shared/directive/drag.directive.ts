import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {

  down = false;

  @Output() dragFinish = new EventEmitter();

  @HostListener('document:mousemove', ['$event'])
  handleDrag($event: MouseEvent){
    if (this.down){
      this.dragFinish.emit($event.clientX);
    }
  }

  @HostListener('mousedown', ['$event'])
  startDrag($event: any){
    this.down = true;
    $event.preventDefault();
  }

  @HostListener('document:mouseup', ['$event'])
  endDrag($event: any){
    if (this.down){
      this.dragFinish.emit($event.clientX);
    }
    this.down = false;
  }

  constructor(){
  }
}
