import { SubscribersService } from './../services/subscribers.service';
import { Sub } from './../models/sub';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css'],
})
export class SubscriptionFormComponent implements OnInit {
  isEmailError: boolean = false;
  isSubscribed: boolean = false;
  constructor(private subService: SubscribersService) {}

  ngOnInit(): void {}
  onSubmit(formValue) {
    console.log(formValue);
    const subData: Sub = {
      name: formValue.name,
      email: formValue.email,
    };

    this.subService.checkSubs(subData.email).subscribe((data) => {
      console.log(data);

      if (data.empty) {
        this.subService.addSubs(subData);
        this.isSubscribed = true;
      } else {
        console.log('User already exists');
        this.isEmailError = true;
      }
    });
  }
}
