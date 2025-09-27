import { Component, ElementRef, inject, signal, ViewChild, viewChild } from '@angular/core';
import { ImageClassifierService } from '../Services/image-classifier-service';

@Component({
  selector: 'app-image-classifier',
  imports: [],
  templateUrl: './image-classifier.html',
  styleUrl: './image-classifier.css'
})
export class ImageClassifier {

  private imageClassifierService=inject(ImageClassifierService);
  @ViewChild('imageElement') imageElement!:ElementRef<HTMLImageElement>
  errorMsg=signal<string|null>(null);
  predictions=signal<Predictions[]>([]);
  isLoading=this.imageClassifierService.isLoading;
  modelLoaded=this.imageClassifierService.modelLoaded;
  modelError=this.imageClassifierService.modelError;
  imageSource=signal<string|ArrayBuffer|null>(null);
  isImageClassifying=signal(false);



  onFileSelected(event:Event){

    const fileInput=event.target as HTMLInputElement;
    if(!fileInput.files||fileInput.files.length==0){
      this.errorMsg.set('No File Selected');
      
      return;
      
    }

    const file=fileInput.files[0];
    if(!file.type.match('image.*')){
      this.errorMsg.set('Selected file is not an image');
      return;
      
    }

    this.errorMsg.set(null);
    this.predictions.set([]);

    const reader = new FileReader();
    reader.onload=()=>{
      this.imageSource.set(reader.result);
      setTimeout(()=>{
        this.classifyLoadedImage();

      },100)
    }

  }
  async classifyLoadedImage(){
    
    if(!this.imageElement ||!this.imageElement.nativeElement){
      this.errorMsg.set('Image not Loaded!')
      return;
    }
    this.isImageClassifying.set(true);
    try{
      const pred=await this.imageClassifierService.clasifyImage(this.imageElement.nativeElement)
      this.predictions.set(pred);
      console.log('Predictions :', pred);
      

    }catch(error){
      console.log('Classifying image eroor:',error);
      
      this.errorMsg.set('Error classifying image. Please Try Again');
    }finally{
      this.isImageClassifying.set(false);
    }
  }

  getProbability(probability:number):string{
    const prob=(probability*100).toFixed(2)+' %';
    return prob;

  }

}
 interface Predictions{
  className:string;
  probability:number;

}
