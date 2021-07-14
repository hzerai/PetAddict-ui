import { Component, Input, OnInit } from '@angular/core';
import { Image } from '../Image';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageName: string;
  @Input() model: string;
  @Input() default: string = 'https://www.w3schools.com/howto/img_avatar.png';
  @Input() imageMessage: string = 'Télécharger une nouvelle photo.';
  @Input() autoUpload: boolean = false;
  @Input() image: Image;
  url: any;
  @Input() galerie : boolean = false;
  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    if (!this.image) {
      this.imageService.getImage(this.imageName).subscribe(next => { this.image = next; this.url = next?.bytes; });
    } else {
      this.url = this.image.bytes;
    }
  }
  touchedImage: boolean = false;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.touchedImage = true;
        this.url = event.target.result;
        if (!this.image) {
          this.image = new Image();
          this.image.name = this.imageName;
          this.image.bytes = this.url;
          this.image.cover = true;
          if (this.autoUpload)
            this.imageService.uploadImage(this.image).subscribe(next => { this.image = next });
        } else {
          this.image.bytes = this.url;
          if (this.autoUpload)
            this.imageService.updateImage(this.image).subscribe();
        }
      }
    }
  }

  uploadImage() {
    if (!this.touchedImage) {
      return;
    }
    if (this.image.createdAt != null) {
      this.imageService.updateImage(this.image).subscribe();
    } else {
      this.imageService.uploadImage(this.image).subscribe(next => { this.image = next });
    }
  }
  deleteFile() {
    this.url = null;
  }
}
