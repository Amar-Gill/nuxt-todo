<template>
  <div
    v-if="editor"
    class="tiptap-container"
  >
    <button
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      bold
    </button>
    <button
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      italic
    </button>
    <button
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      strike
    </button>
    <button
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
      @click="editor.chain().focus().toggleCode().run()"
    >
      code
    </button>
    <button @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      clear nodes
    </button>
    <button
      :class="{ 'is-active': editor.isActive('paragraph') }"
      @click="editor.chain().focus().setParagraph().run()"
    >
      paragraph
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      h1
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      h2
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      h3
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      h5
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      h6
    </button>
    <button
      :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      bullet list
    </button>
    <button
      :class="{ 'is-active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      ordered list
    </button>
    <button
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      code block
    </button>
    <button
      :class="{ 'is-active': editor.isActive('blockquote') }"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      blockquote
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      horizontal rule
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      hard break
    </button>
    <button
      :disabled="!editor.can().chain().focus().undo().run()"
      @click="editor.chain().focus().undo().run()"
    >
      undo
    </button>
    <button
      :disabled="!editor.can().chain().focus().redo().run()"
      @click="editor.chain().focus().redo().run()"
    >
      redo
    </button>
  </div>
  <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent } from '@tiptap/vue-3';

const editor = ref<Editor | null>(null);

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
    `,
  });
});

onBeforeUnmount(() => editor.value.destroy());
</script>

<style scoped>
/* Basic menu styles */
.tiptap-container {
  .is-active {
    background-color: black;
    color: white;
  }

  button {
    outline: black;
    color: black;
    background: transparent;
    border-radius: 0.25rem;
  }
}

/* Basic editor styles */
.tiptap {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
