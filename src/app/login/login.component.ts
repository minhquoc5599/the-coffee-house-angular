import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  public error: string = '';
  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute,
    private accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  public onSubmit(): void {
    if (this.formLogin.invalid) {
      return;
    }
    this.accountService.login(this.formLogin.value.username, this.formLogin.value.password).subscribe(data =>{
      if(data.isSuccess){
        this.router.navigate(['/admin/home'])
      }else{
        this.error = 'Username and password are wrong !!!'
      }
    });
  }

}
