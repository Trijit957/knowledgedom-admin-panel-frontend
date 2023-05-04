import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AddStudentModalComponent } from 'src/app/components/add-student-modal/add-student-modal.component';

export enum AddStudentTypeEnum {
   MANUAL_ENTRY = 'manual',
   CSV_UPLOAD = 'csv'
}
@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {

   public students = [  
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   },
   {  
      name: 'Trijit',
      gender: 'Male',
      class: 10,
      school: 'BAKP',
      board: 'WBBSE'
   }
   ];

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
     }
  ];

  constructor(
     private modalController: ModalController,
     private alertController: AlertController
  ) { }


  ngOnInit() {
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


}
