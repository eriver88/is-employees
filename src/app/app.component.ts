import {Component, OnInit} from '@angular/core';
import { initFlowbite } from 'flowbite';

import { NavigationEnd, Router} from '@angular/router';
import { AuthService } from './services/auth/auth.service';

import { dataEmployees } from './_constant/employees';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'is-employees';
  bcStatus: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (!["/", "/login"].indexOf(e.url)) {
          this.bcStatus = false;
        } else {
          this.bcStatus = true;
        }
      }
    });

    // Initial Employees Data
    if (!localStorage.getItem("employees")) {
      localStorage.setItem("employees", JSON.stringify(dataEmployees));
    }
  }

  ngOnInit(): void {
    initFlowbite();
  }

  logout(): void {

    Swal.fire({
      title: "Do you want to Log Out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate(["/"]);
      }
    });

  }
}
