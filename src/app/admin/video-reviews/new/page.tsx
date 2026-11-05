import { AdminBreadcrumb } from '../../_components/admin-breadcrumb';
import { VideoReviewForm } from '../_components/video-reviews-form';

export default function NewVideoReviewsPage() {
  return (
    <>
      <AdminBreadcrumb
        items={[{ label: 'Видеоотзывы', href: '/admin/video-reviews' }, { label: 'Добавить' }]}
      />
      <div className="admin-page-head">
        <div>
          <span>Контент сайта</span>
          <h1>Новый видеоотзыв</h1>
          <p>Добавьте YouTube-видео для страницы отзывов.</p>
        </div>
      </div>
      <VideoReviewForm />
    </>
  );
}
