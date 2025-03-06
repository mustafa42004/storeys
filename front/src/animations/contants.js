export const SLIDER_ITEMS = Array.from({ length: 14 }, (_, index) => ({
    id: index + 1,
    imgSrc: `/assets/img/dev-${index + 1}.png`,
}));

export const ANIMATION_CONFIG = {
    duration: 15,
    gap: '30px'
};