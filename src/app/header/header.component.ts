import { Component, OnInit } from '@angular/core';
import { DataStorajeService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed = false;

  constructor(private storeService: DataStorajeService) { }

  ngOnInit(): void {
  }

  onSaveData(){
    this.storeService.storeData();
  }

  onFetchData(){
    this.storeService.fetchData().subscribe();
  }
}
