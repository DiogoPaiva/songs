export default [

	{
		name: 'songs',
		url: '/',
    params: {
      id: null
    },
    component: 'songList',

	},
  {
    name: 'song',
    url: '/song:id',
    params: {
      id: null
    },
    component: 'songDetails',
  }
];
