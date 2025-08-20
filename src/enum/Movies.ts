import type { Movie } from '@src/types/Movie';

const movies: Movie[] = [
  {
    title: '現実をカットアップしてみた',
    image: 'movie_001_cutup.jpg',
    description: '2014/9/7',
    href: 'https://www.youtube.com/watch?v=zsQD9_drLbY',
    published_at: '2014-09-07',
    isComingSoon: false,
  },
  {
    title: 'いちご みんと ちょこれーと',
    image: 'movie_002_smc_00.jpg',
    description: '2017/2/14\n初出 : FRENZ 2014',
    href: 'https://www.youtube.com/watch?v=SV_BxJzKcnY',
    published_at: '2017-02-14',
    isComingSoon: false,
  },
  {
    title: 'Busy Factory',
    image: 'movie_003_busyfactory.jpg',
    description: '2015/10/3\n3DCG : こんにチワワ\n初出 : FRENZ 2015',
    href: 'https://www.youtube.com/watch?v=p2dy2LkOAzs',
    published_at: '2015-10-03',
    isComingSoon: false,
  },
  {
    title: 'Sunny',
    image: 'movie_004_sunny.jpg',
    description: '2016/9/24\n初出 : FRENZ 2016',
    href: 'https://www.youtube.com/watch?v=tp-UAMO69qQ',
    published_at: '2016-09-24',
    isComingSoon: false,
  },
  {
    title: 'わたしのて',
    image: 'movie_005_flyup_00.jpg',
    description:
      '2022/2/22\nIllustrations : にせねこ\n3DCG協力 : こんにチワワ\n初出 : FRENZ 2017',
    href: 'https://www.youtube.com/watch?v=RAl73LFNGi4',
    published_at: '2022-02-22',
    isComingSoon: false,
  },
  {
    title: '城主の時代だ！',
    image: 'movie_006_castleage_01.jpg',
    description: '2018/12/22\nIllustrations : furea2\n初出 : FRENZ 2018',
    href: 'https://www.youtube.com/watch?v=vU8lj_drm9A',
    published_at: '2018-12-22',
    isComingSoon: false,
  },
  {
    title: 'あまいこと',
    image: 'movie_007_sweets.jpg',
    description: 'Coming soon...',
    href: null,
    published_at: '2019-09-14',
    isComingSoon: true,
  },
  {
    title: 'wa:k around the wor:d',
    image: 'movie_009_nekomimi_00.jpg',
    description: '2017/2/14',
    href: 'https://youtu.be/QtbDKZWrUgY',
    published_at: '2017-02-14',
    isComingSoon: false,
  },
  {
    title: 'Mana',
    image: 'movie_008_mana_00.jpg',
    description:
      '2022/1/30',
    href: 'https://www.youtube.com/watch?v=olFZDX0PeBQ',
    published_at: '2022-01-30',
    isComingSoon: false,
  },
  {
    title: '???',
    image: 'movie_011_candy_wip_01.jpg',
    description: 'Coming soon...',
    href: null,
    published_at: '2023-09-17',
    isComingSoon: true,
  },
  {
    title: '???',
    image: 'movie_010_bird_wip_01.jpg',
    description: 'Coming soon...',
    href: null,
    published_at: '2025-10-12',
    isComingSoon: true,
  },
];

export default movies;
