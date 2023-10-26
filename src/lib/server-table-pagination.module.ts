import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServerTablePaginationComponent } from './server-table-pagination.component';



@NgModule({
  declarations: [
    ServerTablePaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    ServerTablePaginationComponent
  ]
})
export class ServerTablePaginationModule { }
