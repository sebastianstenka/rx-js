import { Injectable } from '@angular/core';
import { BehaviorSubject, map, noop, Observable, shareReplay, tap } from 'rxjs';
import { createHttpObservable } from '../common/utils';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject.asObservable();

  constructor() {
    const http$ = createHttpObservable('http://localhost:9000/api/courses');

    http$
      .pipe(map((res: any) => Object.values(res['payload'])))
      .subscribe((courses) => this.subject.next(courses as Course[]));
  }

  getBeginnerCourse() {
    return this.filterByCategory('BEGINNER');
  }

  getAdvancedCourse() {
    return this.filterByCategory('ADVANCED');
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }
}
