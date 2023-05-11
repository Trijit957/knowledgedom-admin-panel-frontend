import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

type ToastParamsType ={
  message: string;
  duration: number;
  status: 'success' | 'danger' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  public async show({ message, status, duration }: ToastParamsType) {
    console.log("Toast")
    const toast = await this.toastController.create({
      message,
      duration,
      animated: true,
      position: 'top',
      color: status
    });

    await toast.present();
  }
}
