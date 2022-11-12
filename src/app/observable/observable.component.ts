import { Component, OnInit } from '@angular/core';
import { noop, Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const http$ = new Observable((observer) => {
      fetch('http://localhost:9000/api/courses')
        .then((response) => {
          return response.json();
        })
        .then((body) => {
          observer.next(body);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    });

    http$.subscribe(
      (courses) => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }
}
