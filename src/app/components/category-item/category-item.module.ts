import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryItemComponent } from './category-item.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    CategoryItemComponent,
  ],
  declarations: [
    CategoryItemComponent,
  ],
})
export class CategoryItemModule {}
