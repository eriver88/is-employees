import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {EmployeeService} from '../../../services/employee/employee.service';
import {Employee} from '../../../_interfaces/employee';
import {FormBuilder, Validators} from '@angular/forms';
import {_currency} from '../../../_helpers/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {

  form: any;

  submitted: boolean = false;
  birthDateError: boolean = false;

  isUpdate: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      id: [''],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.min(1)]],
      status: ['', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

  }

  get username() {
    return this.form.get("username");
  }

  get firstName() {
    return this.form.get("firstName");
  }

  get lastName() {
    return this.form.get("lastName");
  }

  get email() {
    return this.form.get("email");
  }

  get birthDate() {
    return this.form.get("birthDate");
  }

  get basicSalary() {
    return this.form.get("basicSalary");
  }

  get group() {
    return this.form.get("group");
  }

  get description() {
    return this.form.get("description");
  }

  get status() {
    return this.form.get("status");
  }

  ngOnInit() {

    this.isUpdate = !this.route.snapshot.data['disable'];
    const id: number = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeService.employees.subscribe((data: Employee[]) => {

      if (id) {
        const employees: Employee[] = [...data];
        const index: number = employees.findIndex((i: Employee) => (Number(i.id) == id));
        const employee: Employee = {...data[index]};

        if (!this.isUpdate) {
          employee.basicSalary = _currency(employee.basicSalary);
        }

        employee.birthDate = new Intl.DateTimeFormat('fr-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date(employee.birthDate)).toString();

        this.form.setValue({...employee});
      }
    });

    if (!this.isUpdate) {
      this.form.disable();
    }
  }

  back() {
    this.router.navigate(["employee"])
  }

  submit() {

    this.submitted = true;

    const { birthDate } = this.form.value;
    this.birthDateError = new Date().getTime() <= new Date(birthDate).getTime();

    if (this.form.valid) {

      this.employeeService.update(this.form.value);

      Swal.fire({
        title: "Success Edited!",
        text: "Your data has changed!",
        icon: "success"
      }).then((): void => {
        this.back();
      });
    }

  }
}
