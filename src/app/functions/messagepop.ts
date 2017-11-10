import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessagePop{

  constructor(private router: Router, private toastr: ToastrService) { }

  controleError(data){
    if(data.success){
      this.toastr.success(data.msg, 'Success!');
      this.router.navigate(['/']);
    }
    else{
      this.toastr.error(data.msg, 'Oops!');
    }
  }

}
