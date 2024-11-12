import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Employee} from '../../_interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees$: BehaviorSubject<Employee[]>
  public employees: Observable<Employee[]>

  data: Employee[] = [];
  constructor() {

    if (localStorage.getItem("employees")) {
      this.data = JSON.parse(localStorage.getItem("employees") || "{}");
    }

    this.employees$ = new BehaviorSubject<Employee[]>(this.data);
    this.employees = this.employees$.asObservable();
  }

  add(data: Employee) {
    data.id = this.employees$.getValue()[this.employees$.getValue().length - 1].id + 1;
    localStorage.setItem("employees", JSON.stringify(this.employees$.getValue().concat([data])));

    this.employees$.next(this.employees$.getValue().concat([data]));
  }

  update(data: Employee) {
    const index: number = this.employees$.getValue().findIndex((i: Employee) => (i.id === data.id));
    this.employees$.value[index] = data;
    const employees = this.employees$.getValue();

    localStorage.setItem("employees", JSON.stringify(employees));

    this.employees$.next(employees);
  }

  remove(id: number) {
    const index: number = this.employees$.getValue().findIndex((i: Employee) => (i.id === id));
    this.employees$.value.splice(index, 1);

    const employees: Employee[] = this.employees$.getValue();
    this.employees$.next(employees);

    localStorage.setItem("employees", JSON.stringify(employees));
  }
}
