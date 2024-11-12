import {Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {EmployeeService} from '../../../services/employee/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css'
})
export class EmployeeAddComponent {
  @ViewChild('modal') modal!: ElementRef;

  form: any;

  submitted: boolean = false;
  birthDateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {

    this.form = this.fb.group({
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

  submit() {
    this.submitted = true;

    const { birthDate } = this.form.value;
    this.birthDateError = new Date().getTime() <= new Date(birthDate).getTime();

    if (this.form.valid) {

      this.employeeService.add(this.form.value);

      Swal.fire({
        title: "Success Added!",
        text: "Your data has added!",
        icon: "success"
      }).then((): void => {
        this.back();
      });
    }
  }

  back(): void {
    this.router.navigate(["/", "employee"]);
  }
}
