import { Pipe, PipeTransform } from '@angular/core';
import { Admin } from 'src/app/models/admin';

@Pipe({
  name: 'filtroAdmin',
})
export class FiltroPipeAdmin implements PipeTransform {
  transform(
    admins: Admin[],
    page: number = 0,
    search: string = ''
  ): Admin[] {
    const filteredAdmins = admins.filter((admin) => {
      return (
        admin.username.toLowerCase().includes(search.toLowerCase()) ||
        admin.password.toLowerCase().includes(search.toLowerCase()) ||
        admin.role.includes(search) ||
        admin.created_at.toString().toLowerCase().includes(search.toLowerCase())
      );
    });

    return filteredAdmins.slice(page, page + 5);
  }
}
