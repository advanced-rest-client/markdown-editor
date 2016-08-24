Polymer({
  is: 'markdown-editor',

  behaviors: [Polymer.IronOverlayBehavior],

  ready: function() {
    var s = document.createElement('script');
    s.src = '../../prism/components/prism-markdown.js';
    Polymer.dom(this.root).appendChild(s);
  },

  properties: {
    // The documentation text
    value: {
      type: String,
      value: '',
      notify: true
    },
    // A code mirror theme name
    theme: {
      type: String,
      value: 'base16-light'
    }
  },

  observers: [
    '_opened(opened)'
  ],

  _opened: function(opened) {
    if (opened) {
      this.debounce('cm-refresh', function() {
        this.$.cm.editor.refresh();
      }, 100);
    }
  },

  // Cancels editing the text and closes the editor.
  cancel: function() {
    this.fire('markdown-cancel');
    this.opened = false;
  },

  // Saves changes and closes the editor.
  save: function() {
    this.fire('markdown-save', {
      value: this.value
    });
    this.opened = false;
  }
});
