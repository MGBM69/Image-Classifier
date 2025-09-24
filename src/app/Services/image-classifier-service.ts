import { Injectable, signal } from '@angular/core';
import * as mobileNet from '@tensorflow-models/mobilenet';

@Injectable({
  providedIn: 'root'
})
export class ImageClassifierService {

  private model: mobileNet.MobileNet |null=null;
  public modelLoaded=signal(false);
  public isLoading = signal(false);

  constructor(){
    this.loadModel();
  }

  async loadModel(){
    this.isLoading.set(true);
    try{
      this.model=await mobileNet.load()
      this.modelLoaded.set(true);
      console.log('Model loaded successfully');
      
    }catch(error){
      console.error('Error loaqding model:',error);
      
    }finally{
      this.isLoading.set(false);

    }
  }

  async clasifyImage(image:HTMLImageElement){
    if(!this.model){
      console.log('Model is not loaded yet');
      return[];
      
    }
    try{
      const predictions=await this.model.classify(image);
      return predictions;
    }catch(error){
      console.error('Error clasifying image',error);
      return[];
      
    }
  }
  
}
