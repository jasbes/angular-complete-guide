import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedTab = 'recipe';

  onNavigationChanged(selectedTab: string) {
    this.selectedTab = selectedTab;
  }
}
