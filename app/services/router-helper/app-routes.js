export default [

	{
		name: 'songs',
		url: '/songs',
   component: 'songList',

	},
  {
    name: 'song',
    url: '/song?:id',
    params: {
      id: null
    },
    component: 'songDetails',
  },
  {
    name: 'favorites',
    url: '/favorites',
    component: 'favorites',

  },
];
