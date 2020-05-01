import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/Product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: Product[], keyword: string): Product[] {
    keyword = keyword? keyword.toLocaleLowerCase(): keyword;

    return keyword? value.filter((p:Product) => p.name.toLocaleLowerCase().indexOf(keyword)!==-1):value
  }

}
