import { authOptions } from 'lib/auth/config';
import { woocommerce } from 'lib/woocomerce/woocommerce';
import { getServerSession } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import VendorArea from './vendor-area';

export default async function PersonalArea() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations('ProfilePage');

  if (!session?.user?.customer_id) {
    return { status: 401, body: { error: 'User not logged' } };
  }

  const user = session.user;
  const { first_name, last_name, email } = await woocommerce.get('customers', {
    id: user.customer_id
  });

  return (
    <section className="mt-4 grid max-w-screen-2xl gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">{t('area')}</h1>
      <div className="flex flex-col">
        {user.roles.includes('wcfm_vendor') && <VendorArea token={user.token} />}
        <label className="mt-4 text-sm font-medium">First Name</label>
        <input value={first_name} disabled />
        <label className="mt-2 text-sm font-medium">Last Name</label>
        <input value={last_name} disabled />
        <label className="mt-2 text-sm font-medium">Email</label>
        <input value={email} disabled />
      </div>
    </section>
  );
}
