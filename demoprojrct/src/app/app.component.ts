import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this.get();
  }
	//url; //Angular 8
	url: any; //Angular 11, for stricter type
	msg = "";
	selectedFile: File | undefined ;
  source:any[] =[];
  fd = new FormData();
	//selectFile(event) { //Angular 8
  
	selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile);
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}
  
  createContact(){
    this.http.post("http://localhost:8003/student", this.fd)
    .subscribe( result => {
      console.log(result)
    });
	window.location.reload();
  }
  get(){
    this.http.get("http://localhost:8003/get")
    .subscribe( (result:any) => {
      this.source=result.data;
      console.log(this.source)
    });
  }
  getImageUrl(imageUrl: any): string {
	return `data:${imageUrl.contexttype};base64,${imageUrl.buffer}`;
  }
  
	
}