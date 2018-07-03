export default [

	{
		name: 'songList',
		url: '/songs?:q&:year&:artist:&title_like:&_sort:&order',
    params: {
      q: null,
      year: null,
      artist: null,
      title_like: null,
      _sort: null,
      order: null
    },
    component: 'songList',

	},
  {
    name: 'song',
    url: '/song?:id',
    params: {
      id: null
    },
    component: 'songDetails',
  }
];
