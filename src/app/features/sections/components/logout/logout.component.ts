import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  @Output() logoutClicked = new EventEmitter<void>();

  onLogout() {
    this.logoutClicked.emit(); // Emit the logout event to the parent container
  }

}
