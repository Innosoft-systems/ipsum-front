import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { NewsForm } from '../_components/news-form';

export default function NewNewsPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Новости', href: '/admin/news' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Новая новость</h1>
          <p>Создайте новость для публичной страницы.</p>
        </div>
      </div>
      <NewsForm />
    </>
  );
}
