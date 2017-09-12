import fetch from '@/utils/fetch';

export function update(newProfile) {
  return fetch({
    url: '/user/' + newProfile.id,
    method: 'put',
    data: newProfile
  });
}
