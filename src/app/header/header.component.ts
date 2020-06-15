import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed = false;

  @Output() 
  private navigationChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onNavigationClick(selectedTab: string){
    this.navigationChanged.emit(selectedTab);
  }
}
