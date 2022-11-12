import { Component, OnInit } from '@angular/core';
import { map, noop, Observable } from 'rxjs';
import { createHttpObservable } from '../common/utils';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss'],
})
export class ObservableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const http$ = createHttpObservable('http://localhost:9000/api/courses');

    const courses$ = http$.pipe(
      map((res: any) => {
        return Object.values(res['payload']);
      })
    );

    courses$.subscribe(
      (courses) => console.log(courses),
      noop,
      () => console.log('completed')
    );
  }
}
