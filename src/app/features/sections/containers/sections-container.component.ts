import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopupComponent } from '../../../shared/components/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-sections-container',
  templateUrl: './sections-container.component.html',
  styleUrl: './sections-container.component.css'
})
export class SectionsContainerComponent {

  constructor(private firebaseService: FirebaseService, private router: Router, private matDialog: MatDialog) { }

  onLogout() {
    const dialogRef = this.matDialog.open(ConfirmPopupComponent, {
      data: { message: 'Are you sure you want to logout?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.logout().then(() => {
          this.router.navigate(['/auth/login']);
        });

      }
    });
    
  }
}
