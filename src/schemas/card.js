import React from 'react';
import Card from '../components/Card/Card';

export default {
  card: {
    atom: true,
    attrs: {
      url: { default: '' },
      size: { default: 75 }, // number as percentage
      height: { default: 419 },
      align: { default: 'center' },
      caption: { default: '' },
      'data-card-id': { default: null },
    },
    parseDOM: [
      {
        tag: 'card',
        getAttrs: node => {
          return {
            url: node.getAttribute('src') || '',
            size: Number(node.getAttribute('data-size')) || 75,
            height: Number(node.getAttribute('height')) || 419,
            align: node.getAttribute('data-align') || 'center',
            caption: node.getAttribute('alt') || '',
            'data-card-id': node.getAttribute('data-card-id') || 0,
          };
        },
      },
    ],
    toDOM: node => {
      return [
        'card',
        {
          src: node.attrs.url,
          'data-size': node.attrs.size,
          height: node.attrs.height,
          'data-align': node.attrs.align,
          alt: node.attrs.caption,
          'data-card-id': node.attrs['data-card-id'],
        },
      ];
    },
    inline: false,
    group: 'block',
    draggable: true,

    /* NodeView Options. These are not part of the standard Prosemirror Schema spec */
    isNodeView: true,
    onInsert: (view, attrs) => {
      const cardNode = view.state.schema.nodes.card.create(attrs);
      const transaction = view.state.tr.replaceSelectionWith(cardNode);
      view.dispatch(transaction);
    },
    defaultOptions: {},
    toStatic: node => {
      return <Card key={node.currIndex} attrs={node.attrs} />;
    },
  },
};
