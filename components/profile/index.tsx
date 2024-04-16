import { getMenu } from 'lib/shopify';
import ProfilePopover from './popover';

const Profile = async () => {
  const menu = await getMenu('profile-menu');

  return <ProfilePopover menu={menu} />;
};

export default Profile;
