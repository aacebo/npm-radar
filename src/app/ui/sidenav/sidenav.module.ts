import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavComponent } from './sidenav.component';
import { SidenavContainerComponent } from './sidenav-container/sidenav-container.component';
import { SidenavContentComponent } from './sidenav-content/sidenav-content.component';
import { SidenavBodyDirective } from './sidenav-body/sidenav-body.directive';

const declarations = [
  SidenavComponent,
  SidenavContainerComponent,
  SidenavContentComponent,
  SidenavBodyDirective,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class SidenavModule { }
