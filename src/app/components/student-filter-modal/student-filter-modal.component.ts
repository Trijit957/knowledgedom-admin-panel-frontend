import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-student-filter-modal',
  templateUrl: './student-filter-modal.component.html',
  styleUrls: ['./student-filter-modal.component.scss'],
})
export class StudentFilterModalComponent  implements OnInit {

  public filterOptions = [
    {
      id: 1,
      name: 'Gender',
      options: [
        {
          parentId: 1,
          name: 'Male',
          isChecked: false
        },
        {
          parentId: 1,
          name: 'Female',
          isChecked: false
        }
      ]
    },
    {
      id: 2,
      name: 'Class',
      options: [
        {
          parentId: 2,
          name: '10',
          isChecked: false
        },
        {
          parentId: 2,
          name:'11',
          isChecked: false
        },
        {
          parentId: 2,
          name: '12',
          isChecked: false
        }
      ]
    },
    {
      id: 3,
      name: 'Board',
      options: [
        {
          parentId: 3,
          name: 'West Bengal',
          isChecked: false
        },
        {
          parentId: 3,
          name: 'ICSE',
          isChecked: false
        },
        {
          parentId: 3,
          name: 'CBSE',
          isChecked: false
        }
      ]
    }
  ]

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  public closeModal() {
    return this.modalController.dismiss(null, 'cancel');
  }

  public doSelectOption(option: any) {
    option.isChecked = true;
    this.filterOptions
        .find(filterOption => filterOption.id === option.parentId)
        ?.options?.filter(_option => _option.name !== option.name)
        ?.forEach(_option => _option.isChecked = false)
  }

  public doApplyFilters() {
    
  }

}
