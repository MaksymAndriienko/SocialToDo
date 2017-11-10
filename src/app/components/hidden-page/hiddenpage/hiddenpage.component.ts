import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-hiddenpage',
  templateUrl: './hiddenpage.component.html',
  styleUrls: ['./hiddenpage.component.css']
})
export class HiddenpageComponent implements OnInit {

  constructor(private toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
  }

}
