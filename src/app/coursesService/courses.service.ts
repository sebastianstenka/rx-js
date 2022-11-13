import { Injectable } from '@angular/core';
import { map, noop, Observable, shareReplay, tap } from 'rxjs';
import { createHttpObservable } from '../common/utils';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor() {
    const http$ = createHttpObservable('http://localhost:9000/api/courses');

    const courses$: Observable<Course[]> = http$.pipe(
      shareReplay(),
      tap(() => console.log('HTTP invoked')),
      map((res: any) => Object.values(res['payload']))
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === 'BEGINNER')
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === 'ADVANCED')
      )
    );
  }
}
