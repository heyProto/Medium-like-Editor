import React from "react";

export const basicNodes = {
  doc: {
    content: "block+",
    attrs: {
      meta: { default: {} },
    },
  },
  paragraph: {
    content: "inline*",
    group: "block",
    attrs: {
      class: { default: null },
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    parseDOM: [
      {
        tag: "p",
        getAttrs(dom) {
          return {
            class: dom.getAttribute("class"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
    ],
    toDOM(node) {
      return [
        "p",
        {
          class: node.attrs.class,
        },
        0,
      ];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      const attrs = {};
      if (node.attrs && node.attrs.class) {
        attrs.className = node.attrs.class;
      }
      if (node.attrs && node.attrs["data-card-id"]) {
        attrs["data-card-id"] = node.attrs["data-card-id"];
      }
      if (node.attrs && node.attrs["data-template-id"]) {
        attrs["data-template-id"] = node.attrs["data-template-id"];
      }
      const emptyChildren = <br />;
      return (
        <p {...attrs} key={node.currIndex}>
          {children || emptyChildren}
        </p>
      );
    },
  },
  blockquote: {
    content: "block+",
    group: "block",
    attrs: {
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    parseDOM: [
      {
        tag: "blockquote",
        getAttrs(dom) {
          return {
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
    ],
    toDOM(node) {
      return ["blockquote", 0];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      const attrs = {};
      if (node.attrs && node.attrs["data-card-id"]) {
        attrs["data-card-id"] = node.attrs["data-card-id"];
      }
      if (node.attrs && node.attrs["data-template-id"]) {
        attrs["data-template-id"] = node.attrs["data-template-id"];
      }
      return (
        <blockquote key={node.currIndex} {...attrs}>
          {children}
        </blockquote>
      );
    },
  },
  styled_blockquote: {
    content: "block+",
    group: "block",
    attrs: {
      class: { default: "styled" },
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    parseDOM: [
      {
        tag: "blockquote.styled",
        getAttrs(dom) {
          return {
            class: "styled",
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
    ],
    toDOM(node) {
      return [
        "blockquote",
        {
          class: "styled",
        },
        0,
      ];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      const attrs = {};
      if (node.attrs && node.attrs["data-card-id"]) {
        attrs["data-card-id"] = node.attrs["data-card-id"];
      }
      if (node.attrs && node.attrs["data-template-id"]) {
        attrs["data-template-id"] = node.attrs["data-template-id"];
      }
      return (
        <blockquote className="styled" key={node.currIndex} {...attrs}>
          {children}
        </blockquote>
      );
    },
  },
  horizontal_rule: {
    group: "block",
    parseDOM: [{ tag: "hr" }],
    toDOM() {
      return ["hr"];
    },
    onInsert: view => {
      view.dispatch(
        view.state.tr.replaceSelectionWith(
          view.state.schema.nodes.horizontal_rule.create()
        )
      );
    },
    toStatic(node) {
      return <hr key={node.currIndex} />;
    },
  },
  heading: {
    attrs: {
      level: { default: 2 },
      id: { default: "" },
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      // {
      //   tag: 'h1',
      //   getAttrs(dom) {
      //     return { level: 1, id: dom.getAttribute('id') };
      //   },
      // },
      {
        tag: "h2",
        getAttrs(dom) {
          return {
            level: 2,
            id: dom.getAttribute("id"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
      {
        tag: "h3",
        getAttrs(dom) {
          return {
            level: 3,
            id: dom.getAttribute("id"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
      {
        tag: "h4",
        getAttrs(dom) {
          return {
            level: 4,
            id: dom.getAttribute("id"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
      {
        tag: "h5",
        getAttrs(dom) {
          return {
            level: 5,
            id: dom.getAttribute("id"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
      {
        tag: "h6",
        getAttrs(dom) {
          return {
            level: 6,
            id: dom.getAttribute("id"),
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
    ],
    toDOM(node) {
      return [
        `h${node.attrs.level < 2 ? 2 : node.attrs.level}`,
        {
          id: node.attrs.id,
        },
        0,
      ];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      if (node.attrs.level === 1) {
        return (
          <h2
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h2>
        );
      }
      if (node.attrs.level === 2) {
        return (
          <h2
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h2>
        );
      }
      if (node.attrs.level === 3) {
        return (
          <h3
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h3>
        );
      }
      if (node.attrs.level === 4) {
        return (
          <h4
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h4>
        );
      }
      if (node.attrs.level === 5) {
        return (
          <h5
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h5>
        );
      }
      if (node.attrs.level === 6) {
        return (
          <h6
            key={node.currIndex}
            id={node.attrs.id}
            data-card-id={node.attrs["data-card-id"]}
            data-template-id={node.attrs["data-template-id"]}
          >
            {children}
          </h6>
        );
      }
      return null;
    },
  },
  ordered_list: {
    content: "list_item+",
    group: "block",
    attrs: {
      order: { default: 1 },
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    parseDOM: [
      {
        tag: "ol",
        getAttrs(dom) {
          return {
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
            order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1,
          };
        },
      },
    ],
    toDOM(node) {
      return [
        "ol",
        {
          start: node.attrs.order === 1 ? null : node.attrs.order,
        },
        0,
      ];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      const attrs = {
        start: node.attrs.order === 1 ? null : node.attrs.order,
        "data-card-id": node.attrs["data-card-id"],
        "data-template-id": node.attrs["data-template-id"],
      };
      return (
        <ol key={node.currIndex} {...attrs}>
          {children}
        </ol>
      );
    },
  },
  bullet_list: {
    content: "list_item+",
    group: "block",
    attrs: {
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    parseDOM: [
      {
        tag: "ul",
        getAttrs(dom) {
          return {
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
      },
    ],
    toDOM(node) {
      return ["ul", 0];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      return (
        <ul
          key={node.currIndex}
          data-card-id={node.attrs["data-card-id"]}
          data-template-id={node.attrs["data-template-id"]}
        >
          {children}
        </ul>
      );
    },
  },
  list_item: {
    content: "paragraph block*",
    defining: true,
    parseDOM: [{ tag: "li" }],
    toDOM() {
      return ["li", 0];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      return <li key={node.currIndex}>{children}</li>;
    },
  },
  code_block: {
    content: "text*",
    group: "block",
    attrs: {
      "data-card-id": { default: null },
      "data-template-id": { default: null },
    },
    code: true,
    parseDOM: [
      {
        tag: "pre",
        getAttrs(dom) {
          return {
            "data-card-id": dom.getAttribute("data-card-id"),
            "data-template-id": dom.getAttribute("data-template-id"),
          };
        },
        preserveWhitespace: true,
      },
    ],
    toDOM(node) {
      return ["pre", ["code", 0]];
    },
    onInsert: view => {
      view.dispatch(
        view.state.tr.replaceSelectionWith(
          view.state.schema.nodes.code_block.create()
        )
      );
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      return (
        <pre
          key={node.currIndex}
          data-card-id={node.attrs["data-card-id"]}
          data-template-id={node.attrs["data-template-id"]}
        >
          <code>{children}</code>
        </pre>
      );
    },
  },
  text: {
    inline: true,
    group: "inline",
    toDOM(node) {
      return node.text;
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      return editorProps.renderStaticMarkup ? (
        children
      ) : (
        <span key={node.currIndex}>{children}</span>
      );
    },
  },
  hard_break: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{ tag: "br" }],
    toDOM() {
      return ["br"];
    },
    toStatic(node) {
      return <br key={node.currIndex} />;
    },
  },
  none: {
    // empty schema block
    /* It's not clear to me that the none schema is used. */
    /* At the moment, it's not included in the defaultNodes prop */
    /* by default. */
    group: "block",
    toDOM() {
      return ["span"];
    },
    toStatic(node, options, isSelected, isEditable, editorProps, children) {
      return <span key={node.currIndex}>{children}</span>;
    },
  },
};

export const basicMarks = {
  em: {
    parseDOM: [
      { tag: "i" },
      { tag: "em" },
      {
        style: "font-style",
        getAttrs: value => value === "italic" && null,
      },
    ],
    toDOM() {
      return ["em"];
    },
    toStatic(mark, children) {
      return <em>{children}</em>;
    },
  },

  u: {
    parseDOM: [
      { tag: 'u' },
      {
        style: 'font-style',
        getAttrs: value => value === 'underline' && null
      }
    ],
    toDOM () {
      return ['u']
    },
    toStatic (mark, children) {
      return <u>{children}</u>
    }
  },

  strong: {
    parseDOM: [
      { tag: "strong" },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: "b",
        getAttrs: node => node.style.fontWeight !== "normal" && null,
      },
      {
        style: "font-weight",
        getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      },
    ],
    toDOM() {
      return ["strong"];
    },
    toStatic(mark, children) {
      return <strong>{children}</strong>;
    },
  },
  link: {
    inclusive: false,
    attrs: {
      href: { default: "" },
      title: { default: null },
      target: { default: null },
    },
    parseDOM: [
      {
        tag: "a[href]",
        getAttrs: dom => {
          return {
            href: dom.getAttribute("href"),
            title: dom.getAttribute("title"),
            target: dom.getAttribute("target"),
          };
        },
      },
    ],
    toDOM(node) {
      /* Links seem to be recieving a target attr that is a dom element */
      /* coming from the wrong source in some interfaces. This ensures */
      /* only strings can be a target attr. */
      const attrs = node.attrs;
      if (attrs.target && typeof attrs.target !== "string") {
        attrs.target = null;
      }
      return ["a", attrs];
    },
    toStatic(mark, children) {
      return (
        <a
          href={mark.attrs.href}
          title={mark.attrs.title}
          target={mark.attrs.target}
        >
          {children}
        </a>
      );
    },
    toEditable: () => {} /* This is a workaround to make the LinkMenu function within tables */,
  },
  sub: {
    parseDOM: [{ tag: "sub" }],
    toDOM() {
      return ["sub"];
    },
    toStatic(mark, children) {
      return <sub>{children}</sub>;
    },
  },
  sup: {
    parseDOM: [{ tag: "sup" }],
    toDOM() {
      return ["sup"];
    },
    toStatic(mark, children) {
      return <sup>{children}</sup>;
    },
  },
  strike: {
    parseDOM: [{ tag: "s" }, { tag: "strike" }, { tag: "del" }],
    toDOM() {
      return ["s"];
    },
    toStatic(mark, children) {
      return <s>{children}</s>;
    },
  },
  code: {
    parseDOM: [{ tag: "code" }],
    toDOM() {
      return ["code"];
    },
    toStatic(mark, children) {
      return <code>{children}</code>;
    },
  },
};
