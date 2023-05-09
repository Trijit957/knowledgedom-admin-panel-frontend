import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AddStudentTypeEnum } from 'src/app/pages/students/students.page';

type CSVRecordType = {
  name: string;
  gender: string;
  class: string;
  school: string;
  board: string;
  phone: string;
}

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
})
export class AddStudentModalComponent  implements OnInit {

  @ViewChild('csvUpload', { static: false }) csvUploadElement!: ElementRef;

  public addType!: string;
  public AddStudentTypeEnum = AddStudentTypeEnum;
  public csvFile!: File;
  public isFileSelected: boolean = false;
  public records: any[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
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

  public doSelectFile() {
    this.csvUploadElement.nativeElement.click();
  }

  public doUploadCSV() {
    let reader = new FileReader();  
    reader.readAsText(this.csvFile); 
    reader.onload = () => {
      let csvData = reader.result; 
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      console.log(csvData)

      let headersRow = this.getHeaderArray(csvRecordsArray);  
  
      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length); 

      console.log(this.records)
    }

    reader.onerror = function () {  
      console.log('error is occured while reading file!');  
    }; 
  }

  public onFileChange(event: any) {
    this.csvFile = event.target.files[0];
    let isValid = this.isValidCSVFile(this.csvFile);

    if(isValid) {
      this.isFileSelected = true;

    } else {
      this.isFileSelected = false;
      this.csvUploadElement.nativeElement.value = '';
      this.records = [];
      this.presentToast({
        message: 'Please upload a .csv file!',
        status: 'danger'
      })
    }
    console.log(this.csvFile)
  }

  private isValidCSVFile(csvFile: File) {
    return this.csvFile.type === 'text/csv';
  }

  private async presentToast({ message, status, position = 'top'}: { message: string; status: string; position?: 'top' | 'bottom' | 'middle'; }) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      cssClass: status,
      position: position
    });

    await toast.present();
  }

  private getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  } 

  private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
  
    for (let i = 1; i < csvRecordsArray.length; i++) {  
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');  
      if (curruntRecord.length === headerLength) {  
        let csvRecord: CSVRecordType = {
          name: curruntRecord[0].trim(),
          gender: curruntRecord[1].trim(),
          class: curruntRecord[2].trim(),
          school: curruntRecord[3].trim(),
          board: curruntRecord[4].trim(),
          phone: curruntRecord[5].trim()
        };   
        csvArr.push(csvRecord);  
      }  
    }  
    return csvArr;  
  }  

}
