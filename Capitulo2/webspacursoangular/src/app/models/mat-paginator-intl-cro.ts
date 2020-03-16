import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from "@angular/core";

// https://material.angular.io/components/paginator/api
@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
    itemsPerPageLabel = 'Items por página';
    nextPageLabel = 'Próxima página';
    previousPageLabel = 'Página anterior';
    lastPageLabel = 'Última página';
    firstPageLabel = 'Primer página';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
            return `0 of ${length}`;
        }
        const length2 = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length2 ? Math.min(startIndex + pageSize, length2) : startIndex + pageSize;
        return `${startIndex + 1} – ${endIndex} de ${length2}`;
    }
}
