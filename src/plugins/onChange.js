import { Plugin, NodeSelection, TextSelection } from 'prosemirror-state';
import { lift, setBlockType, toggleMark, wrapIn } from 'prosemirror-commands';
import { wrapInList } from 'prosemirror-schema-list';
import {
  isInTable,
  deleteTable,
  mergeCells,
  splitCell,
  addRowBefore,
  addRowAfter,
  deleteRow,
  addColumnBefore,
  addColumnAfter,
  deleteColumn,
  toggleHeaderRow,
  toggleHeaderColumn,
  toggleHeaderCell,
} from 'prosemirror-tables';

const getInsertFunctions = editorView => {
  /* Gather all node insert functions. These will be used to populate menus. */
  return Object.values(editorView.state.schema.nodes)
    .filter(node => {
      return node.spec.onInsert;
    })
    .reduce((prev, curr) => {
      return {
        ...prev,
        [curr.name]: attrs => {
          curr.spec.onInsert(editorView, attrs);
        },
      };
    }, {});
};

const getMenuItems = editorView => {
  const schema = editorView.state.schema;

  function canInsert(state, nodeType) {
    let $from = state.selection.$from;
    for (let d = $from.depth; d >= 0; d--) {
      let index = $from.index(d);
      if ($from.node(d).canReplaceWith(index, index, nodeType)) return true;
    }
    return false;
  }

  /* Marks */
  /* -------------- */
  function markIsActive(type) {
    // Check if the mark is currently active for the given selection
    // so that we can highlight the button as 'active'
    const state = editorView.state;
    const { from, $from, to, empty } = state.selection;
    if (empty) {
      return !!type.isInSet(state.storedMarks || $from.marks());
    }
    return state.doc.rangeHasMark(from, to, type);
  }

  function applyToggleMark(mark, attrs) {
    // Toggle the mark on and off. Marks are things like bold, italic, etc
    const toggleFunction = toggleMark(mark, attrs);
    toggleFunction(editorView.state, editorView.dispatch);
  }

  /* Blocks */
  /* -------------- */
  function blockTypeIsActive(type, attrs = {}) {
    const $from = editorView.state.selection.$from;

    let wrapperDepth;
    let currentDepth = $from.depth;
    while (currentDepth > 0) {
      const currentNodeAtDepth = $from.node(currentDepth);
      const comparisonAttrs = { ...attrs };
      if (currentNodeAtDepth.attrs.id) {
        comparisonAttrs.id = currentNodeAtDepth.attrs.id;
      }

      /* Previous versions used node.hasMarkup but that */
      /* mandates deep equality on attrs. We just want to */
      /* ensure that everyting in the passed in attrs */
      /* is present in the node at the depth */
      const isType = type.name === currentNodeAtDepth.type.name;
      const hasAttrs = Object.keys(attrs).reduce((prev, curr) => {
        if (attrs[curr] !== currentNodeAtDepth.attrs[curr]) {
          return false;
        }
        return prev;
      }, true);

      if (isType && hasAttrs) {
        wrapperDepth = currentDepth;
      }
      currentDepth -= 1;
    }

    return !!wrapperDepth;
  }

  function toggleBlockType(type, attrs) {
    const isActive = blockTypeIsActive(type, attrs);
    const newNodeType = isActive ? schema.nodes.paragraph : type;
    const setBlockFunction = setBlockType(newNodeType, attrs);
    return setBlockFunction(editorView.state, editorView.dispatch);
  }

  /* Wraps */
  /* -------------- */
  function toggleWrap(type) {
    if (blockTypeIsActive(type)) {
      return lift(editorView.state, editorView.dispatch);
    }
    const wrapFunction = wrapIn(type);
    return wrapFunction(editorView.state, editorView.dispatch);
  }

  /* List Wraps */
  /* -------------- */
  function toggleWrapList(type) {
    if (blockTypeIsActive(type)) {
      return lift(editorView.state, editorView.dispatch);
    }
    const wrapFunction = wrapInList(type);
    return wrapFunction(editorView.state, editorView.dispatch);
  }

  const formattingItems = [
    {
      title: 'header1',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 1 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 1 }),
    },
    {
      title: 'header2',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 2 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 2 }),
    },
    {
      title: 'header3',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 3 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 3 }),
    },
    {
      title: 'header4',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 4 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 4 }),
    },
    {
      title: 'header5',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 5 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 5 }),
    },
    {
      title: 'header6',
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 6 }),
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 6 }),
    },
  ];

  const headers = [
    {
      title: 'H2',
      level: 2,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 2 }),
      icon: 'header2.svg',
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 2 }),
    },
    {
      title: 'H3',
      level: 3,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 3 }),
      icon: 'header3.svg',
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 3 }),
    },
    {
      title: 'H4',
      level: 4,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 4 }),
      icon: 'header4.svg',
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 4 }),
    },
    {
      title: 'H5',
      level: 5,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 5 }),
      icon: 'header5.svg',
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 5 }),
    },
    {
      title: 'H6',
      level: 6,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 6 }),
      icon: 'header6.svg',
      isActive:
        schema.nodes.heading &&
        blockTypeIsActive(schema.nodes.heading, { level: 6 }),
    },
  ];

  const transforms = [
  {
      title: 'Code',
      section: 'transform',
      type: 'button',
      faIcon: 'code',
      run: applyToggleMark.bind(this, schema.marks.code, {}),
      isActive: schema.marks.code && markIsActive(schema.marks.code),
    },
    {
      title: 'Subscript',
      section: 'transform',
      type: 'button',
      faIcon: 'subscript',
      run: applyToggleMark.bind(this, schema.marks.sub, {}),
      // isAllowed: !markIsActive(schema.marks.sup),
      isActive: schema.marks.sub && markIsActive(schema.marks.sub),
    },
    {
      title: 'Superscript',
      section: 'transform',
      type: 'button',
      faIcon: 'superscript',
      run: applyToggleMark.bind(this, schema.marks.sup, {}),
      // isAllowed: !markIsActive(schema.marks.sub),
      isActive: schema.marks.sup && markIsActive(schema.marks.sup),
    },
    {
      title: 'Strikethrough',
      section: 'transform',
      type: 'button',
      faIcon: 'strikethrough',
      run: applyToggleMark.bind(this, schema.marks.strike, {}),
      isActive: schema.marks.strike && markIsActive(schema.marks.strike),
    },];

  const menuItems = [
    {section: 'transform',
    items: [{
      title: 'Strong',
      section: 'transform',
      type: 'button',
      faIcon: 'bold',
      run: applyToggleMark.bind(this, schema.marks.strong, {}),
      isActive: schema.marks.strong && markIsActive(schema.marks.strong),
    },
    {
      title: 'Emphasis',
      section: 'transform',
      type: 'button',
      faIcon: 'italic',
      run: applyToggleMark.bind(this, schema.marks.em, {}),
      isActive: schema.marks.em && markIsActive(schema.marks.em),
    },
    {
      title: 'Underline',
      section: 'transform',
      type: 'button',
      faIcon: 'underline',
      run: applyToggleMark.bind(this, schema.marks.u, {}),
      isActive: schema.marks.u && markIsActive(schema.marks.u),
    },
    {
      title: 'Heading',
      section: 'transform',
      type: 'dropdown',
      placeHolder: 'H',
      options: headers,
      run: toggleBlockType.bind(this, schema.nodes.heading, { level: 5 }),
      isActive:
        schema.nodes.heading && blockTypeIsActive(schema.nodes.heading)
    }]},
    {section: 'insert',
    items: [{
      title: 'Link',
      section: 'transform',
      type: 'prompt',
      faIcon: 'link',
      run: applyToggleMark.bind(this, schema.marks.link),
      isActive: schema.marks.link && markIsActive(schema.marks.link),
    },
    {
      title: 'Horizontal Rule',
      section: 'insert',
      type: 'button',
      faIcon: 'minus',
      run: schema.nodes.horizontal_rule.spec.onInsert.bind(this, editorView),
      isAllowed: canInsert(editorView.state, schema.nodes.horizontal_rule),
    },
    {
      title: 'Card',
      section: 'insert',
      type: 'prompt',
      faIcon: 'square',
      run: schema.nodes.card.spec.onInsert.bind(this, editorView),
      isAllowed: canInsert(editorView.state, schema.nodes.card),
    }]},
    {section: 'block',
    items: [{
      title: 'Unordered List',
      section: 'block',
      type: 'button',
      faIcon: 'list-ul',
      run: toggleWrapList.bind(this, schema.nodes.bullet_list),
      isActive:
        schema.nodes.bullet_list && blockTypeIsActive(schema.nodes.bullet_list),
    },
    {
      title: 'Ordered List',
      section: 'block',
      type: 'button',
      faIcon: 'list-ol',
      run: toggleWrapList.bind(this, schema.nodes.ordered_list),
      isActive:
        schema.nodes.ordered_list &&
        blockTypeIsActive(schema.nodes.ordered_list),
    },
    {
      title: 'Styled Blockquote',
      section: 'block',
      type: 'button',
      faIcon: 'quote-left',
      run: toggleWrap.bind(this, schema.nodes.styled_blockquote),
      isActive:
        schema.nodes.styled_blockquote &&
        blockTypeIsActive(schema.nodes.styled_blockquote),
    }]},
    {section: 'more',
    items: [{
      title: 'Transforms',
      section: 'transform',
      type: 'dropdown',
      faIcon: 'ellipsis-h',
      options: transforms
    },]}
  ];

  const tableItems =
    !schema.nodes.table || !isInTable(editorView.state)
      ? []
      : [
          {
            title: 'table-delete',
            run: deleteTable.bind(this, editorView.state, editorView.dispatch),
            isActive: deleteTable.bind(this, editorView.state),
          },
          {
            title: 'table-merge-cells',
            run: mergeCells.bind(this, editorView.state, editorView.dispatch),
            isActive: mergeCells.bind(this, editorView.state),
          },
          {
            title: 'table-split-cell',
            run: splitCell.bind(this, editorView.state, editorView.dispatch),
            isActive: splitCell.bind(this, editorView.state),
          },
          {
            title: 'table-add-row-before',
            run: addRowBefore.bind(this, editorView.state, editorView.dispatch),
            isActive: addRowBefore.bind(this, editorView.state),
          },
          {
            title: 'table-add-row-after',
            run: addRowAfter.bind(this, editorView.state, editorView.dispatch),
            isActive: addRowAfter.bind(this, editorView.state),
          },
          {
            title: 'table-delete-row',
            run: deleteRow.bind(this, editorView.state, editorView.dispatch),
            isActive: deleteRow.bind(this, editorView.state),
          },
          {
            title: 'table-add-column-before',
            run: addColumnBefore.bind(
              this,
              editorView.state,
              editorView.dispatch
            ),
            isActive: addColumnBefore.bind(this, editorView.state),
          },
          {
            title: 'table-add-column-after',
            run: addColumnAfter.bind(
              this,
              editorView.state,
              editorView.dispatch
            ),
            isActive: addColumnAfter.bind(this, editorView.state),
          },
          {
            title: 'table-delete-column',
            run: deleteColumn.bind(this, editorView.state, editorView.dispatch),
            isActive: deleteColumn.bind(this, editorView.state),
          },
          {
            title: 'table-toggle-header-row',
            run: toggleHeaderRow.bind(
              this,
              editorView.state,
              editorView.dispatch
            ),
            isActive: toggleHeaderRow.bind(this, editorView.state),
          },
          {
            title: 'table-toggle-header-column',
            run: toggleHeaderColumn.bind(
              this,
              editorView.state,
              editorView.dispatch
            ),
            isActive: toggleHeaderColumn.bind(this, editorView.state),
          },
          {
            title: 'table-toggle-header-cell',
            run: toggleHeaderCell.bind(
              this,
              editorView.state,
              editorView.dispatch
            ),
            isActive: toggleHeaderCell.bind(this, editorView.state),
          },
        ];

  // return [...formattingItems, ...tableItems];

  //   let filteredSchema = [
  //     ...schema.nodes.keys.map(key => schema.nodes[key]).filter(x => x.toMenu),
  //     ...schema.marks.keys.map(key => schema.marks[key]).filter(x => x.toMenu),
  //   ];

  //   let xmenuItems = new Map();
  //   filteredSchema.forEach(item => {
  //     let config = item();
  //     let key = config.section;
  //     let section = menuItems.get(key);
  //     if (!section) {
  //       menuItems.set(key, [config]);
  //     } else {
  //       section.push(config);
  //     }
  //   });

  return menuItems;
};

const getRangeBoundingBox = (editorView, fromPos, toPos) => {
  const fromBoundingBox = editorView.coordsAtPos(fromPos);
  const toBoundingBox = editorView.coordsAtPos(toPos);
  return {
    left: fromBoundingBox.left,
    top: fromBoundingBox.top,
    right: toBoundingBox.right,
    bottom: toBoundingBox.bottom,
  };
};

const getDecorations = editorView => {
  const decorationSets = editorView.docView.innerDeco.members
    ? editorView.docView.innerDeco.members
    : [editorView.docView.innerDeco];

  return decorationSets.reduce((prev, curr) => {
    const decorations = curr.find().map(decoration => {
      return {
        from: decoration.from,
        to: decoration.to,
        boundingBox: getRangeBoundingBox(
          editorView,
          decoration.from,
          decoration.to
        ),
        attrs: decoration.type.attrs,
      };
    });
    return [...prev, ...decorations];
  }, []);
};

const getSelectedText = editorView => {
  if (editorView.state.selection.empty) {
    return undefined;
  }

  const fromPos = editorView.state.selection.from;
  const toPos = editorView.state.selection.to;
  const exact = editorView.state.doc.textBetween(fromPos, toPos);
  const prefix = editorView.state.doc.textBetween(
    Math.max(0, fromPos - 10),
    Math.max(0, fromPos)
  );
  const suffix = editorView.state.doc.textBetween(
    Math.min(editorView.state.doc.nodeSize - 2, toPos),
    Math.min(editorView.state.doc.nodeSize - 2, toPos + 10)
  );
  return {
    exact: exact,
    prefix: prefix,
    suffix: suffix,
  };
};

const getShortcutValues = editorView => {
  // TODO: Clean up this function!
  const editorState = editorView.state;
  const toPos = editorState.selection.to;
  const currentNode = editorState.doc.nodeAt(toPos - 1);
  const text =
    currentNode && currentNode.textContent ? currentNode.textContent : '';
  const currentLine = text.replace(/\s/g, ' ');
  let parentOffset = editorState.selection.$to.parentOffset;
  // sometimes the parent offset may not be describing the offset into the text node
  // if so, we need to correct for this.
  if (currentNode !== editorState.selection.$to.parent) {
    const child = editorState.selection.$to.parent.childAfter(
      editorState.selection.$to.parentOffset - 1
    );
    if (child.node === currentNode) {
      parentOffset -= child.offset;
    }
  }
  const nextChIndex = parentOffset;
  const nextCh =
    currentLine.length > nextChIndex ? currentLine.charAt(nextChIndex) : ' ';
  const prevChars = currentLine.substring(0, parentOffset);
  const startIndex = prevChars.lastIndexOf(' ') + 1;
  const startLetter = currentLine.charAt(startIndex);

  const shortcutChars = ['?', '/', '+', '@'];
  const output = shortcutChars.reduce((prev, curr) => {
    const charsAreCorrect = startLetter === curr && nextCh.charCodeAt(0) === 32;
    const substring = currentLine.substring(startIndex + 1, nextChIndex) || '';
    const start = toPos - parentOffset + startIndex;
    const end = toPos - parentOffset + startIndex + 1 + substring.length;
    return {
      ...prev,
      [curr]: charsAreCorrect ? substring : undefined,
      selectShortCut: charsAreCorrect
        ? () => {
            /* Useful for selecting the entire shortcut text */
            /* right before inserting/replacing with a node or */
            /* other content. */
            const selectionnew = new TextSelection(
              editorState.doc.resolve(start),
              editorState.doc.resolve(end)
            );
            const transaction = editorState.tr;
            transaction.setSelection(selectionnew);
            editorView.dispatch(transaction);
          }
        : undefined,
      boundingBox: charsAreCorrect
        ? getRangeBoundingBox(editorView, start, end)
        : undefined,
    };
  }, {});

  return output;
};

const getActiveLink = editorView => {
  const editorState = editorView.state;
  const linkMarkType = editorState.schema.marks.link;
  const { from, $from, to, $to, empty } = editorState.selection;
  const shiftedFrom = editorState.doc.resolve(Math.max(from - 1, 0));
  const shiftedTo = editorState.doc.resolve(Math.max(to - 1, 0));

  /* Because we set link marks to not be inclusive, we need to do */
  /* some shifted so the dialog will appear at the start and end */
  /* of the link text */
  const getMarks = (open, close) => {
    return open.marksAcross(close) || [];
  };
  const foundMarks = empty
    ? getMarks($from, $to).length
      ? getMarks($from, $to)
      : getMarks(shiftedFrom, shiftedTo)
    : getMarks($from, shiftedTo);

  const activeLinkMark = foundMarks.reduce((prev, curr) => {
    if (curr.type.name === 'link') {
      return curr;
    }
    return prev;
  }, undefined);

  if (!activeLinkMark) {
    return undefined;
  }

  /* Note - this start and end will cause directly adjacent */
  /* links to be merged into a single link on edit. Adjacent */
  /* links with different URLs seems like a worse UI experience */
  /* than having two links merge on edit. So, perhaps we simply */
  /* leave this 'bug'. We can revisit later. */
  let startPos = from - 1;
  let foundStart = false;
  while (!foundStart) {
    if (startPos === 0) {
      foundStart = true;
    }
    if (editorState.doc.rangeHasMark(startPos, startPos + 1, linkMarkType)) {
      startPos -= 1;
    } else {
      foundStart = true;
    }
  }
  let endPos = from;
  let foundEnd = false;
  while (!foundEnd) {
    if (endPos === 0) {
      foundEnd = true;
    }
    if (editorState.doc.rangeHasMark(endPos, endPos + 1, linkMarkType)) {
      endPos += 1;
    } else {
      foundEnd = true;
    }
  }

  return {
    attrs: activeLinkMark.attrs,
    boundingBox: getRangeBoundingBox(editorView, startPos, endPos),
    updateAttrs: newAttrs => {
      const oldNodeAttrs = activeLinkMark.attrs;
      const transaction = editorView.state.tr;
      transaction.removeMark(
        startPos + 1,
        endPos,
        editorView.state.schema.marks.link
      );
      transaction.addMark(
        startPos + 1,
        endPos,
        editorView.state.schema.marks.link.create({
          ...oldNodeAttrs,
          ...newAttrs,
        })
      );
      editorView.dispatch(transaction);
    },
    removeLink: () => {
      const transaction = editorView.state.tr;
      transaction.removeMark(
        startPos + 1,
        endPos,
        editorView.state.schema.marks.link
      );
      editorView.dispatch(transaction);
    },
  };
};

/* This plugin is used to call onChange with */
/* all of the new editor values. */
export default (schema, props) => {
  return new Plugin({
    view: () => {
      return {
        update: editorView => {
          const updateAttrs = newAttrs => {
            const start = editorView.state.selection.from;
            if (start !== undefined) {
              const oldNodeAttrs = editorView.state.selection.node.attrs;
              const transaction = editorView.state.tr.setNodeMarkup(
                start,
                null,
                { ...oldNodeAttrs, ...newAttrs }
              );
              if (editorView.state.selection.node.type.isInline) {
                /* Inline nodeviews lose focus on content change */
                /* this fixes that issue. */
                const sel = NodeSelection.create(editorView.state.doc, start);
                transaction.setSelection(sel);
              } else {
                let sel = editorView.state.selection;
                sel.visible = true;

                transaction.setSelection(sel);
              }
              editorView.dispatch(transaction);
            }
          };

          const changeNode = (nodeType, attrs, content) => {
            const newNode = nodeType.create(
              {
                ...attrs,
              },
              content
            );
            const start = editorView.state.selection.from;
            const end = editorView.state.selection.to;
            const transaction = editorView.state.tr.replaceRangeWith(
              start,
              end,
              newNode
            );
            editorView.dispatch(transaction);
            // this.view.focus();
            /* Changing a node between inline and block will cause it to lose focus */
            /* Attempting to regain that focus seems difficult due to the fuzzy nature */
            /* of replaceRangeWith. For the moment, changing from inline to block will */
            /* simply result in losing focus. */
          };

          const isNodeView = !!editorView.state.selection.node;

          props.onChange({
            /* The current editor view. */
            view: editorView,
            /* The active selection. */
            selection: editorView.state.selection,
            /* The bounding box for the active selection. */
            selectionBoundingBox: getRangeBoundingBox(
              editorView,
              editorView.state.selection.from,
              editorView.state.selection.to
            ),
            /* The text, prefix, and suffix of the current selection */
            selectedText: getSelectedText(editorView),
            /* If the active selection is of a NodeView, provide the selected node. */
            selectedNode: isNodeView
              ? editorView.state.selection.node
              : undefined,
            /* If the active selection is of a NodeView, provide a function to update the selected node. */
            /* The updateNode function expects an object of attrs as its sole input */
            updateNode: isNodeView ? updateAttrs : undefined,
            /* If the active selection is of a NodeView, provide a function to change the selected node. */
            changeNode: isNodeView ? changeNode : undefined,
            /* The full list of available node insert functions. */
            /* Each insert function expect an object of attrs as */
            /* its sole input. */
            insertFunctions: getInsertFunctions(editorView),
            /* The full list of menu items, their status, and their click handler. */
            menuItems: getMenuItems(editorView),
            /* The full list of decorations and their bounding boxes */
            decorations: getDecorations(editorView),
            /* The list of shortcut keys and the text following them. */
            /* Useful for inline insert menus and autocompletes. */
            shortcutValues: getShortcutValues(editorView),
            /* activeLink is useful for displaying a link editing interface. */
            activeLink: getActiveLink(editorView),
            /* boolean alerting whether the collab plugin has finished loading */
            isCollabLoaded: editorView.state.collaborative$
              ? editorView.state.collaborative$.isLoaded
              : false,
          });
        },
      };
    },
  });
};
