import fetch from '@/utils/fetch';

const FILES = '/files';

function get() {
  return fetch({
    url: FILES,
    method: 'get'
  })
}

function filenames(date, channel, video_type) {
  return fetch({
    url: `${FILES}/${date}/${channel}/${video_type}`,
    method: 'get'
  })
}

function post(date, channel, video_type, files, sample_type) {
  return fetch({
    url: `${FILES}/${date}/${channel}/${video_type}`,
    method: 'post',
    data: {
      sample_type: sample_type,
      filenames: files
    }
  })
}

export {
  get, filenames, post
}
