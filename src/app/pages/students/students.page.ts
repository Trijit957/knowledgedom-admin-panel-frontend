import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { AddStudentModalComponent } from 'src/app/components/add-student-modal/add-student-modal.component';
import { StudentFilterModalComponent } from 'src/app/components/student-filter-modal/student-filter-modal.component';
import { SizeEnum, SizeService } from 'src/app/services/size/size.service';
import { StudentInterface } from './students.interface';
import { StudentsService } from './students.service';

export enum AddStudentTypeEnum {
   MANUAL_ENTRY = 'manual',
   CSV_UPLOAD = 'csv'
}

type PageObjectType = {
   page: number;
   pageSize: number; 
   totalPages: number;
   totalElements: number;
}
@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

   public students: Array<StudentInterface> = new Array();
   public pageObject: PageObjectType = {
      page: 0, // current page number
      pageSize: 0, // number of elements in the page
      totalPages: 0, // total number of pages
      totalElements: 0 // total number of items
   }

   // public students = [  
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: '10',
   //    school: 'BAKP',
   //    board: 'WBBSE',
   //    phone: '1234567890',
   //    guardianName: 'Priya Gopal Goswami',
   //    guardianPhone: '0987654321'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // },
   // {  
   //    name: 'Trijit',
   //    gender: 'Male',
   //    class: 10,
   //    school: 'BAKP',
   //    board: 'WBBSE'
   // }
   // ];

   public columns = [
      {
         name: 'Name'
      },
      {
         name: 'Gender'
      },
      {
         name: 'Class'
      },
      {
         name: 'School'
      },
      {
         name: 'Board'
      },
      {
         name: 'Phone'
      },
      {
         name: 'Guardian Name'
      },
      {
         name: 'Guardian Phone'
      }
   ];

   public sizeMode!: number;
   public SizeEnum = SizeEnum;

  constructor(
     private modalController: ModalController,
     private alertController: AlertController,
     private readonly sizeService: SizeService,
     private readonly studentService: StudentsService
  ) {
      this.pageObject.page = 0;
      this.pageObject.pageSize = 10;
  }


  ngOnInit() {
     
     this.sizeService.sizeObservable.subscribe({
        next: (sizeMode) => this.sizeMode = sizeMode
      });

     this.setPage({ offset: 0 });
  }

  public setPage(pageInfo: any) {
  console.log(pageInfo)
   this.getStudents(pageInfo);
  }

  private getStudents(pageInfo: any) {
      let params = {
         page: pageInfo.offset + 1,
         pageSize: this.pageObject.pageSize
      }
      this.studentService.getStudents(params)
          .subscribe({
             next: (response) => {
                if(response?.students?.length) {
                   let { page, pageSize, totalPages, students } = response;
                   this.pageObject.page = page - 1;
                   this.pageObject.pageSize = pageSize;
                   this.pageObject.totalPages = totalPages;
                   this.pageObject.totalElements = totalPages * pageSize;
                   this.students = students;
                }
             }
          })
  }

  public async doAddStudent() {

   const alert = await this.alertController.create({
      header: 'Select Add Options',
      // subHeader: 'Important message',
      inputs: [
          {
            label: 'Manual Entry',
            type: 'radio',
            value: AddStudentTypeEnum.MANUAL_ENTRY,
          },
          {
            label: 'CSV upload',
            type: 'radio',
            value: AddStudentTypeEnum.CSV_UPLOAD,
          }
      ],
      buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: (e) => { console.log(e) }
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: (e) => { 
               this.openAddStudentModal(e);
            }
          }
      ],
    });

    await alert.present();
      
  }

  public async openAddStudentModal(e: string) {
     const addStudentModal = await this.modalController.create({
        component: AddStudentModalComponent,
        componentProps: {
           addType: e
        } 
     })  
   
     addStudentModal.present();
   
     const { data, role } = await addStudentModal.onDidDismiss();
   
     console.log({data, role})

  }

  public async doOpenFilter() {
      const filterModal = await this.modalController.create({
         component: StudentFilterModalComponent 
      })  
   
      filterModal.present();
   
      const { data, role } = await filterModal.onDidDismiss();
   
      console.log({data, role})
  }


}
