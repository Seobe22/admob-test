export function listItemsGenerator(num) {
  let list = [];
  for (var i = 0; i < num; i++) {
    list = [
      ...list,
      ...[
        'Apple ' + i,
        'Banana ' + i,
        'Orange ' + i,
        'Pineapple ' + i,
        'Pancakes ' + i,
        'ad ' + i,
      ],
    ];
  }

  return list;
}

export function Logger(tag = 'AD', type, value) {
  console.log(`[${tag}][${type}]:`, value);
}
export const Events = {
  onViewableItemsChanged: 'onViewableItemsChanged',
};
