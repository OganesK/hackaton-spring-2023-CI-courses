export const useTranslate = (value: string) => {
  value === 'business'
    ? (value = 'Бизнес')
    : value === 'development'
    ? (value = 'Разработка')
    : value === 'design'
    ? (value = 'Дизайн')
    : value === 'management'
    ? (value = 'Менеджмент')
    : value === 'analytic'
    ? (value = 'Аналитика')
    : value === 'education'
    ? (value = 'Образование')
    : value === 'content'
    ? (value = 'Контент')
    : value;

  return value;
};
