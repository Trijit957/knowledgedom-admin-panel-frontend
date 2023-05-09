import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsPage } from './students.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddStudentModalComponent } from 'src/app/components/add-student-modal/add-student-modal.component';
import { StudentFilterModalComponent } from 'src/app/components/student-filter-modal/student-filter-modal.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    StudentsPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [StudentsPage, AddStudentModalComponent, StudentFilterModalComponent]
})
export class StudentsPageModule {}
