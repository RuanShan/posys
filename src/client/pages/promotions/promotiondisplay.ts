
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Promotion } from '../../models/promotion';

@Component({
  selector: 'promotion-display',
  template: `
    <ion-grid no-padding>
      <ion-row>
        <ion-col width-20 no-padding>
          <ion-row>
            <ion-col no-padding>{{ item.name | truncate:50 }}</ion-col>
          </ion-row>
          <ion-row background-text>
            <ion-col no-padding>{{ item.description | truncate:50 }}</ion-col>
          </ion-row>
        </ion-col>
        <ion-col width-20 no-padding vertical-center>
          {{ item.startDate | date:'short' }}
        </ion-col>
        <ion-col width-20 no-padding vertical-center>
          {{ item.endDate | date:'short' }}
        </ion-col>
        <ion-col width-10 no-padding vertical-center>
          {{ reductionType() }} {{ discountDisplay() }}
        </ion-col>
        <ion-col no-padding vertical-center>
          {{ affected() | truncate:15 }}
        </ion-col>
        <ion-col no-padding vertical-center text-right>
          <edit-button (click)="edit.next()"></edit-button>
          <remove-button (click)="remove.next()"></remove-button>
        </ion-col>
      </ion-row>
    </ion-grid>
`,
})
export class PromotionDisplayComponent {
  @Input() item: Promotion;
  @Output() edit = new EventEmitter();
  @Output() remove = new EventEmitter();

  affected() {
    return this.item.promoItems && this.item.promoItems.length > 0
      ? `${this.item.promoItems.length} item${this.item.promoItems.length > 1 ? 's' : ''}`
      : this.item.organizationalunit.name;
  }

  discountDisplay() {
    if(this.item.discountType === 'Dollar') {
      return `$${this.item.discountValue}`;
    }

    return `${this.item.discountValue}%`;
  }

  reductionType() {
    if(this.item.itemReductionType === 'All' && this.item.numItemsRequired === 1) {
      return 'All';
    }

    if(this.item.itemReductionType === 'All') {
      return `After ${this.item.numItemsRequired}, `;

    } else if(this.item.itemReductionType === 'BuyXGetNext') {
      return `B${this.item.numItemsRequired}GN`;

    } else if(this.item.itemReductionType === 'SetTo') {
      return `${this.item.numItemsRequired} for `;
    }

    return 'Unknown';
  }
}
