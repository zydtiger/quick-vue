<template>
  <div id="content" :class="[menuPresent ? 'shrink-right' : 'expand-left']">
    <div class="left-back"></div>
    <div class="header">
      <div class="function-group">
        <div class="function-btn" @click="toggleMenu">
          <fa-icon :icon="['fas', 'arrow-left']" v-if="menuPresent" />
          <fa-icon :icon="['fas', 'arrow-right']" v-if="!menuPresent" />
        </div>
        <div class="title-input-wrapper">
          <input
            type="text"
            name=""
            id="title-input"
            placeholder="New note"
            v-model="title"
          />
        </div>

        <div class="function-btn" onclick="document.execCommand('bold')">
          <fa-icon :icon="['fas', 'bold']" />
        </div>
        <div class="function-btn" onclick="document.execCommand('italic')">
          <fa-icon :icon="['fas', 'italic']" />
        </div>
        <div class="function-btn" onclick="document.execCommand('underline')">
          <fa-icon :icon="['fas', 'underline']" />
        </div>
        <div class="function-btn" onclick="document.execCommand('strikeThrough')">
          <fa-icon :icon="['fas', 'strikethrough']" />
        </div>

        <div class="function-btn" title="Deletes a note" @click="delNote">
          <fa-icon :icon="['fas', 'trash-can']" />
        </div>
      </div>
    </div>

    <div
      class="main"
      contenteditable="true"
      @input="updateContent"
      v-html="contentInit"
      ref="main"
    ></div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import { mapMutations, mapState } from "vuex";

export default {
  name: "right-content-area",
  data() {
    return {
      menuPresent: true,
      title: "",
      content: "",
      contentInit: '',
      curId: 0,
    };
  },
  mounted() {
    bus.on("chgNote", this.chgNote);
    bus.emit("getInit");

    console.log(new Date().toString());
  },
  watch: {
    title() {
      this.commitChange();
    },
  },
  methods: {
    updateContent() {
      this.content = this.$refs.main.innerHTML;
      this.commitChange();
    },
    commitChange() {
      let change = {
        id: this.curId,
        title: this.title,
        content: this.content,
      };
      // console.log(change);
      this.MODIFY_NOTE(change);
    },
    chgNote(id) {
      this.title = this.Note.notes[id].title;
      this.content = this.Note.notes[id].content;
      this.contentInit = this.content;
      this.curId = id;
    },
    toggleMenu() {
      this.menuPresent = !this.menuPresent;
      bus.emit("toggleMenu");
    },
    delNote() {
      bus.emit("delNote");
    },
    ...mapMutations(["MODIFY_NOTE"]),
  },
  computed: mapState(["Note"]),
};
</script>

<style lang="scss" scoped>
@import "@/theme.scss";

.expand-left {
  left: 0;
  width: calc(100vw);
  transition: $menuAniTime ease-out;
}

.shrink-right {
  left: $menuWidth;
  width: calc(100vw - #{$menuWidth});
  transition: $menuAniTime ease-out;
}

#content {
  position: fixed;
  top: 0;
  height: calc(100vh - #{$footerHeight});

  .left-back {
    position: absolute;
    top: 0;
    left: 0;
    width: $menuWidth;
    height: $headerHeight;
    border-bottom: 1px solid $borderColor;
    background: $darkBgc;
    transform: translateX(-100%);
  }

  .header {
    position: absolute;
    width: 100%;
    height: $headerHeight;
    border-bottom: 1px solid $borderColor;
    background-color: $darkBgc;

    .function-group {
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      width: 100%;

      .title-input-wrapper {
        // width: calc(100% - #{2 * $btnStandardSize} - 2 * 20px);
        // text-align: center;

        #title-input {
          border: none;
          background: transparent;
          font-size: 18px;
          font-weight: bold;
          // width: 100%;
        }
      }
    }
  }

  .main {
    position: absolute;
    overflow-y: scroll;
    top: $headerHeight;
    width: 100%;
    height: calc(100% - #{$headerHeight});
    padding: 20px;
    font-size: 16px;
    word-wrap: break-word;

    &:focus {
      outline: none;
    }
  }
}
</style>
