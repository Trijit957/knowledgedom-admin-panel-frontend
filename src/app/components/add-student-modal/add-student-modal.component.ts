import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddStudentTypeEnum } from 'src/app/pages/students/students.page';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
})
export class AddStudentModalComponent  implements OnInit {

  addType!: string;
  AddStudentTypeEnum = AddStudentTypeEnum;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.addType)
  }

  public closeModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public onAddStudent() {
    return this.modalController.dismiss({ key: 'some value' }, 'confirm');
  }

}
