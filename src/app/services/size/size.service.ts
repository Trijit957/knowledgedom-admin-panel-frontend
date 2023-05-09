import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum SizeEnum {
  LARGE_SCREEN = 4,
  MEDIUM_SCREEN = 3,
  SMALL_SCREEN = 2,
  EXTRA_SMALL_SCREEN = 1
}

const screenWidthObj = {
  w1: 1200,
  w2: 992,
  w3: 768
}

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private sizeObserver$ = new BehaviorSubject<number>(0);
  public sizeObservable  = this.sizeObserver$.asObservable();

  constructor() {
    
    this.handleResize();

    window.addEventListener('resize', () => {
      this.handleResize();
    })
  }

  private handleResize() {
    let currentSizeMode = this.getSizeMode(window.innerWidth);
    this.setSizeMode(currentSizeMode);
  }

  private getSizeMode(screenWidth: number) {
    if(screenWidth >= screenWidthObj.w1) {
      return SizeEnum.LARGE_SCREEN  
    } 

    if(screenWidth < screenWidthObj.w1 && screenWidth >= screenWidthObj.w2) {
        return SizeEnum.MEDIUM_SCREEN
    }

    if(screenWidth < screenWidthObj.w2 && screenWidth >= screenWidthObj.w3) {
        return SizeEnum.SMALL_SCREEN
    }

    if(screenWidth < screenWidthObj.w3) {
        return SizeEnum.EXTRA_SMALL_SCREEN
    }

    return SizeEnum.LARGE_SCREEN
  }

  public setSizeMode(currentSizeMode: number) {
    this.sizeObserver$.next(currentSizeMode);
  }
}
