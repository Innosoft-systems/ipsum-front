import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { InternationalReviewForm } from '../_components/international-reviews-form';

export default function NewInternationalReviewsPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Международные отзывы', href: '/admin/international-reviews' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Новый международный отзыв</h1>
          <p>Добавьте отзыв зарубежного эксперта.</p>
        </div>
      </div>
      <InternationalReviewForm />
    </>
  );
}
