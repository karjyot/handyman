import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';

import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  exports: [


    MatInputModule,
  
    MatPaginatorModule,

    MatTableModule,
    MatAutocompleteModule

  ]
})
export class MaterialModule {}

