import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { ReviewForm } from '../_components/review-form';

export default function NewReviewPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Отзывы', href: '/admin/reviews' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Новый отзыв</h1>
          <p>Добавьте отзыв пациента для публичной страницы.</p>
        </div>
      </div>
      <ReviewForm />
    </>
  );
}
