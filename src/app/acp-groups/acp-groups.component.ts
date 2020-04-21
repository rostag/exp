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

  public selectSource(src: ResourceGroup) {
    this.itemSelected.emit(src);
  }

  public setSource(src: ResourceGroup) {
    this.itemSet.emit(src);
  }

  public expandSource(src: ResourceGroup) {
    src.expanded = !src.expanded;
  }
}
