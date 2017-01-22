export const centerGameObjects = (objects) => {
    objects.forEach(function (object) {
        object.anchor.setTo(0.5);
    });
};

export const getRandomInt = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
};

export const setResponsiveWidth = (sprite, percent, parent) => {
    let percentWidth = (sprite.texture.width - (parent.width / (100 / percent))) * 100 / sprite.texture.width;
    sprite.width = parent.width / (100 / percent);
    sprite.height = sprite.texture.height - (sprite.texture.height * percentWidth / 100);
};
