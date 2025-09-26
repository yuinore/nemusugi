import type { Profile } from '@src/types/Profile';

const profiles: Profile[] = [
  {
    name: 'yuinore',
    image: '/images/profile/yuinore.png',
    image2x: '/images/profile/yuinore@2x.png',
    href: 'https://x.com/yuinore',
    links: [
      {
        title: 'Twitter',
        href: 'https://x.com/yuinore',
        variant: 'twitter',
      },
      {
        title: 'Weblog',
        href: 'https://yuinore.net/',
        variant: 'weblog',
      },
    ],
    description:
      '映像作家。アダルトゲームのデモムービー制作に憧れ、2011 年に上京するも、しばらく無職の期間が続く。その時期に Yu^ta と同じクリエイターチームに所属し、以後タッグを組みミュージックビデオの制作に勤しむようになる。趣味は睡眠。嫌いなものは豆腐。',
  },
  {
    name: 'Yu^ta',
    image: '/images/profile/yuta.png',
    image2x: '/images/profile/yuta@2x.png',
    href: 'https://x.com/yutaortslabo',
    links: [
      {
        title: 'Twitter',
        href: 'https://x.com/yutaortslabo',
        variant: 'twitter',
      },
      {
        title: 'YouTube',
        href: 'https://www.youtube.com/@yutaortslabo',
        variant: 'youtube',
      },
      {
        title: 'SoundCloud',
        href: 'https://soundcloud.com/strawberry-mint-chocolate',
        variant: 'soundcloud',
      },
    ],
    description:
      '幼少期より DTM を始め、2009 年からコンポーザーとして活動を開始。哀愁のあるテクノサウンドを得意とし、数多のヒット曲を世に送り出している。無名時代に制作した同人 CD が駿河屋で 3000 円超えの高値を付けたことはあまりにも有名。',
  },
];

export default profiles;
