import {Component} from '@angular/core';
import {DtOptions} from '../../../components/datatables/interfaces/datatables';
import {EmployeeService} from '../../../services/employee/employee.service';
import {Employee} from '../../../_interfaces/employee';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  form: any;

  options: DtOptions;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {

    this.options = {
      data: [],
      columns: [
        {
          label: "Id",
          field: "id",
          type: "number",
          sorting: true,
          searching: true
        },
        {
          label: "Username",
          field: "username",
          type: "string",
          sorting: true,
          searching: true
        },
        {
          label: "First Name",
          field: "firstName",
          type: "string",
          sorting: true,
          searching: true
        },
        {
          label: "Last Name",
          field: "lastName",
          type: "string",
          sorting: true,
          searching: true
        },
        {
          label: "Email",
          field: "email",
          type: "string",
          sorting: true,
          searching: true
        },
        {
          label: "Birth of Date",
          field: "birthDate",
          type: {
            name: "date",
            format: "dd/mm/yyyy"
          },
          sorting: true,
          searching: false
        },
        {
          label: "Basic Salary",
          field: "basicSalary",
          type: {
            name: "currency",
            format: "idr"
          },
          sorting: true,
          searching: false
        },
        {
          label: "Status",
          field: "status",
          type: "element",
          sorting: false,
          searching: false,
          ref: [
            {
              name: 'status',
              type: 'badge',
              className: {
                active: 'bg-green-100 text-green-800 text-xs font-medium px-1 py-1 rounded',
                inactive: 'bg-red-100 text-red-800 text-xs font-medium px-1 py-1 rounded'
              },
              act: (status: string) => {
                if (status === 'active') {
                  return 'Active';
                } else {
                  return 'Not Active'
                }
              }
            }
          ]
        },
        {
          label: "Group",
          field: "group",
          type: "string",
          sorting: true,
          searching: false
        },
        {
          label: "Action",
          field: "id",
          type: "element",
          sorting: false,
          searching: false,
          ref: [
            {
              name: 'edit',
              type: 'button',
              className: 'w-30 rounded-lg text-white  bg-yellow-300 focus:ring-1 focus:outline-none focus:ring-blue-500 text-xs px-2 py-1 text-center tracking-wider',
              act: (id: number) => {
                this.router.navigate(["/employee/edit", id]);
              }
            },
            {
              name: 'delete',
              type: 'button',
              className: 'w-30 rounded-lg text-white  bg-danger focus:ring-1 focus:outline-none focus:ring-blue-500 text-xs px-2 py-1 text-center tracking-wider',
              act: (id: number) => {
                Swal.fire({
                  title: "Do you want to delete?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Yes"
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.employeeService.remove(id);

                    this.employeeService.employees.subscribe((items: Employee[]) => {
                      this.options = {
                        ...this.options,
                        data: [...items]
                      }
                    });

                    Swal.fire("Deleted!", "", "success");
                  }
                });
              }
            }
          ]
        }
      ],
      pagination: true
    };

    employeeService.employees.subscribe((items: Employee[]) => {
      this.options.data = items;
    });

    this.form = this.fb.group({
      search: [''],
      salaryFrom: [0],
      salaryTo: [0]
    });
  }

  create(): void {
    this.router.navigate(['/employee', 'add']);
  }

  detail(event: Employee): void {
    this.router.navigate(["/employee/detail", event.id]);
  }

  filter(): void {

    const {search, salaryFrom, salaryTo} = this.form.value;

    this.employeeService.employees.subscribe((items: Employee[]) => {

      if (Boolean(search) || Boolean(salaryFrom) || Boolean(salaryTo)) {

        this.options = {
          ...this.options,
          data: items.filter((item: Employee) => {

            return (
              (!item.username.search(search) ||
                !item.firstName.search(search) ||
                !item.lastName.search(search) ||
                !item.email.search(search) ||
                !item.group.search(search)) && (
                (salaryTo || salaryFrom ? !(item.basicSalary > salaryTo) && !(item.basicSalary <= salaryFrom) : true)
              )
            )
          })
        }

      } else {

        this.options = {
          ...this.options,
          data: items
        };

      }
    });
  }

  clear(): void {

    this.form.reset();

    this.employeeService.employees.subscribe((items: Employee[]) => {
      this.options = {
        ...this.options,
        data: items
      };
    });
  }
}
