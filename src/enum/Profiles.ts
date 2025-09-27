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
      '映像作家。アダルトゲームのデモムービー制作に憧れて 2011 年に上京するも、しばらくは無職の期間が続いた。その時期に Yu^ta と同じクリエイターチームに所属し、現在もなお、ポップでキュートな MV を制作し続けている。趣味は睡眠。嫌いなものは豆腐。',
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
      '幼少期より DTM を始め、2009 年からコンポーザーとしての活動を開始。哀愁を帯びたテクノサウンドを得意とし、数多くのヒット曲を世に送り出している。無名時代に制作した同人 CD が駿河屋で 3,000 円超えの高値を付けたことはあまりにも有名。',
  },
];

export default profiles;
