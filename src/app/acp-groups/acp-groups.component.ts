import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ResourceGroup } from '../flow-diagram/data-model';

@Component({
  selector: 'app-acp-groups',
  templateUrl: './acp-groups.component.html',
  styleUrls: ['./acp-groups.component.scss'],
})
export class AcpPostureGroupsComponent implements OnInit {
  @Input() icon: string;
  @Input() title: string;
  @Input() collection;

  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemSet = new EventEmitter<any>();

  ngOnInit() {}

  public selectItem(src: ResourceGroup) {
    this.itemSelected.emit(src);
  }

  public setItem(src: ResourceGroup) {
    this.itemSet.emit(src);
  }

  public expandItem(src: ResourceGroup) {
    src.expanded = !src.expanded;
  }
}
