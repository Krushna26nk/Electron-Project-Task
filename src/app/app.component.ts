import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { share, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  title = 'electron';

  private onSubject = new Subject<{value: any }>();
  public changes = this.onSubject.asObservable().pipe(share());

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.getImage();
    this.changes.subscribe((data)=>{
      console.log('changes subscribe');
    })
  }

  getImage(){
    let imageArr = localStorage.getItem('screenshot-array');
    this.onSubject.next({value: imageArr });
    console.log('image arr --> ',imageArr);

  }
}

