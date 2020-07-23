import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListItemComponent } from './list-item.component';
import { ListItemDescriptionComponent } from './list-item-description.component';
import { ListItemSubtitleComponent } from './list-item-subtitle.component';
import { ListItemTitleComponent } from './list-item-title.component';

const declarations = [
  ListItemComponent,
  ListItemDescriptionComponent,
  ListItemSubtitleComponent,
  ListItemTitleComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class ListItemModule { }
