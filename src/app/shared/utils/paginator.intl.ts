import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { ɵ$localize } from '@angular/localize';
import { Subject } from 'rxjs';

@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = ɵ$localize`Primera página`;
  itemsPerPageLabel = ɵ$localize`Elementos por página:`;
  lastPageLabel = ɵ$localize`Última página`;
  nextPageLabel = 'Página siguiente';
  previousPageLabel = 'Página anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return ɵ$localize`Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return ɵ$localize`Página ${page + 1} de ${amountPages}`;
  }
}
